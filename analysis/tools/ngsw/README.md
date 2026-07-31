# F-12 — pola dataGroup service worker mencocokkan URL lintas-origin

## Cacatnya

Pola URL untuk `assetGroups` dan `dataGroups` dicocokkan sebagai **substring
terhadap URL absolut**. Akibatnya `/api/**` — yang jelas dimaksudkan sebagai
path pada origin sendiri — juga cocok untuk URL pada origin MANA PUN yang
kebetulan memuat `/api/`, termasuk bila hanya muncul di query string.

Dua fakta yang berkontribusi, keduanya berupa inkonsistensi-diri:

**1. Anchor hilang di dua dari lima tempat, dalam satu berkas.**
`packages/service-worker/config/src/generator.ts`:

| baris | keluaran | anchor |
|---|---|---|
| :126 `processNavigationUrls` | `` `^${urlToRegex(url, baseHref)}$` `` | **ya** |
| :153 `globListToMatcher` (negatif) | `'^' + globToRegex(...) + '$'` | **ya** |
| :158 `globListToMatcher` (positif) | `'^' + globToRegex(...) + '$'` | **ya** |
| :96 `assetGroups.patterns` | `urlToRegex(url, baseHref, true)` | tidak |
| :104 `dataGroups.patterns` | `urlToRegex(url, baseHref, true)` | tidak |

Dua yang tanpa anchor justru yang dikirim ke dalam manifest dan dipakai
**saat runtime**.

**2. Sisi runtime tidak memeriksa origin — dan tetangganya memeriksa.**

```ts
// worker/src/data.ts:305   — req.url MENTAH, absolut, lengkap dengan origin
if (!this.patterns.some((pattern) => pattern.test(req.url))) { ... }

// worker/src/assets.ts:126 — melewati normalizeUrl() lebih dulu
if (this.urls.indexOf(url) !== -1 || this.patterns.some((pattern) => pattern.test(url)))
```

`Adapter.normalizeUrl` (`adapter.ts:84-88`) **memang** membandingkan origin:

```ts
return (parsed.origin === this.origin ? parsed.path : url) as NormalizedUrl;
```

`data.ts` tidak memakainya sama sekali.

## Cara menjalankan

```bash
npm i @angular/service-worker@22.1.0
node analysis/tools/ngsw/pattern-anchor.mjs     <path-node_modules>
node analysis/tools/ngsw/crossorigin-cache.mjs  <path-node_modules>
```

`pattern-anchor.mjs` menjalankan `Generator` npm yang sebenarnya.
`crossorigin-cache.mjs` memuat **`ngsw-worker.js` yang benar-benar dikirim**
ke dalam `ServiceWorkerGlobalScope` tiruan (`mock-sw.mjs`) dan menyalakan event
`install` / `activate` / `message` / `fetch` yang nyata. Semua keputusan
pencocokan, caching, dan penyajian dilakukan oleh kode Angular; berkas tiruan
hanya menyediakan penyimpanan dan jaringan.

## Langkah 1 — keluaran Generator

```
dataGroups[0].patterns    ["\\/api\\/.*"]
assetGroups[0].patterns   ["\\/assets\\/.*"]
navigationUrls            [{"positive":true,"regex":"^\\/.*$"},
                           {"positive":false,"regex":"^\\/api\\/.*$"}]

dataGroups di-anchor?     false
navigationUrls di-anchor? true
```

## Langkah 2 — apa yang benar-benar dilakukan service worker

Konfigurasi: `dataGroups: [{urls: ['/api/**'], cacheConfig: {strategy: 'performance', …}}]`,
scope `https://app.example.com/`. Setiap panggilan jaringan mengembalikan body
yang berbeda, jadi body yang berulang membuktikan penyajian dari cache.

```
  https://app.example.com/api/orders                  origin sendiri — dimaksudkan
    ambil #1  ditangani SW=true  jaringan=true   body="respons-#1"
    ambil #2  ditangani SW=true  jaringan=false  body="respons-#1"   <- dari cache

  https://payments.other-company.test/v1/api/charge   LINTAS-ORIGIN
    ambil #1  ditangani SW=true  jaringan=true   body="respons-#2"
    ambil #2  ditangani SW=true  jaringan=false  body="respons-#2"   <- dari cache

  https://analytics.other.test/t?u=/api/x             /api/ hanya di QUERY
    ambil #1  ditangani SW=true  jaringan=true   body="respons-#3"
    ambil #2  ditangani SW=true  jaringan=false  body="respons-#3"   <- dari cache

  https://payments.other-company.test/v1/charge       KONTROL NEGATIF
    ambil #1  ditangani SW=true  jaringan=true   body="respons-#4"
    ambil #2  ditangani SW=true  jaringan=true   body="respons-#5"   <- selalu ke jaringan
```

Isi Cache Storage aplikasi sesudahnya:

```
  ngsw:/:1:data:api:cache
    LINTAS-ORIGIN  https://payments.other-company.test/v1/api/charge
    LINTAS-ORIGIN  https://analytics.other.test/t?u=/api/x
```

Kontrol negatifnya penting: URL lintas-origin yang **tidak** memuat `/api/`
lewat ke jaringan pada kedua pengambilan. Jadi pemicunya benar-benar
pencocokan substring itu, bukan "SW menangkap segalanya".

## Dampak, dengan disiplin yang sama seperti koreksi F-10

**Siapa yang rugi?** Setiap pengguna aplikasi yang punya dataGroup dengan
fragmen path yang juga muncul di URL pihak ketiga yang diambil aplikasi itu.

**Berapa lama?** Sampai `maxAge` habis (default konfigurasi umum: berjam-jam
hingga berhari-hari) atau versi SW berganti. **Tidak pulih sendiri** per
muat-halaman — entri tersimpan di disk dan bertahan melewati reload.

**Layanan down?** Tidak.

**Apakah ini menembus same-origin policy?** TIDAK, dan ini penting untuk tidak
dilebih-lebihkan. Halaman itu sendiri yang memulai permintaannya; service
worker tidak memperoleh akses baca yang tidak sudah dimiliki halaman. Yang
berubah adalah apa yang terjadi SESUDAHNYA.

Yang benar-benar didapat:

1. **Respons pihak ketiga menjadi basi.** Permintaan berikutnya ke endpoint
   pembayaran/otorisasi/analitik pihak ketiga dijawab dari cache dan **tidak
   pernah mencapai server itu**. Untuk pemeriksaan yang bergantung kesegaran
   (token dicabut, saldo, feature flag), jawaban basi selama `maxAge` adalah
   masalah kebenaran yang bisa berkonsekuensi keamanan.
2. **Body respons lintas-origin dipersistenkan ke disk** di Cache Storage
   aplikasi — retensi data yang tidak diminta developer.
3. **Tekanan eviksi LRU.** `maxSize` dibagi bersama; trafik lintas-origin yang
   ikut tercocok menggusur data API aplikasi yang sebenarnya.

Catatan ketelitian soal respons opaque: pada strategi `performance`,
`cacheOpaqueResponses` default **false** (`data.ts:353`), jadi GET lintas-origin
tanpa CORS tidak di-cache — dampaknya terbatas pada endpoint pihak ketiga yang
memang mengirim header CORS (persis kasus payments/analytics di atas). Pada
strategi `freshness` defaultnya **true** (`data.ts:399`), sehingga respons
opaque pun ikut tersimpan.

## Langkah 3 — respons basi membuat KEPUTUSAN KEAMANAN salah

```bash
node analysis/tools/ngsw/stale-authz.mjs <path-node_modules>
```

Langkah 2 hanya membuktikan respons pihak ketiga bisa di-cache. Itu belum
menaikkan severity. Langkah 3 menunjukkan konsekuensi yang tidak ambigu.

Premis yang sama di kedua skenario: `dataGroups: [{urls: ['/api/**'], strategy:
'performance', maxAge: '1d'}]` — developer bermaksud "cache API SAYA" — dan
endpoint IdP pihak ketiga kebetulan memuat `/api/` di path-nya.

### Skenario 1 — kunci yang sudah dirotasi keluar tetap diterima

Verifikasi memakai **WebCrypto asli (ECDSA P-256 / ES256)**, bukan tiruan.
Kode aplikasinya jujur: ia memeriksa `kid`, memverifikasi tanda tangan secara
kriptografis, dan menolak `kid` yang tidak ada di JWKS.

| | T0 | T1 | T2 |
|---|---|---|---|
| | k1 sah, aplikasi ambil JWKS | k1 **BOCOR**, IdP merotasinya keluar → JWKS hanya k2 | penyerang menyodorkan JWT `role=admin` bertanda tangan k1 |

Tiga jalan, hanya **satu** variabel berubah:

```
A  RENTAN     JWKS di /v1/api/keys, pola apa adanya  \/api\/.*
   IdP dihubungi setelah rotasi  false
   KEPUTUSAN  >>> AKSES ADMIN DIBERIKAN
   alasan     tanda tangan sah dengan kid "k1-bocor", role="admin"

B  KONTROL    JWKS di /v1/keys (tanpa "/api/"), pola sama
   IdP dihubungi setelah rotasi  true
   KEPUTUSAN  akses ditolak — kid "k1-bocor" tidak ada di JWKS

C  PERBAIKAN  JWKS di /v1/api/keys, pola ^https:\/\/app\.example\.com\/api\/.*$
   IdP dihubungi setelah rotasi  true
   KEPUTUSAN  akses ditolak — kid "k1-bocor" tidak ada di JWKS
```

Kode aplikasi, pasangan kunci, token, dan kode verifikasi **identik** di
ketiganya. Yang membedakan diterimanya token palsu hanyalah bentuk URL IdP —
sesuatu yang sama sekali di luar kendali developer aplikasi.

Perhatikan `IdP dihubungi setelah rotasi = false` pada A: rotasi kunci darurat
tidak sampai ke peramban itu sama sekali, sampai `maxAge` habis.

### Skenario 2 — pencabutan hak akses tidak berlaku

Skenario 1 mengandaikan verifikasi JWT di sisi klien — nyata, tetapi tidak
universal. Skenario 2 tidak mengandaikan itu sama sekali, dan polanya jauh
lebih umum: aplikasi menanyakan hak pengguna ke endpoint pihak ketiga lalu
memakai jawabannya untuk memutuskan akses.

```
T0  pengguna adalah admin, aplikasi mengambil hak aksesnya
T1  admin MENCABUT peran itu (karyawan keluar / akun disusupi / langganan turun)
T2  pengguna membuka panel admin lagi

A  RENTAN   hak di /v2/api/entitlements
   IdP dihubungi setelah cabut  false
   hak yang DILIHAT aplikasi    {"role":"admin","active":true}
   KEPUTUSAN                    >>> PANEL ADMIN TETAP TERBUKA

B  KONTROL  hak di /v2/entitlements (tanpa "/api/")
   IdP dihubungi setelah cabut  true
   hak yang DILIHAT aplikasi    {"role":"viewer","active":false}
   KEPUTUSAN                    akses dicabut dengan benar
```

### Batas yang harus dinyatakan jujur

- Penegakan yang otoritatif seharusnya di sisi server. Cacat ini membuat
  pemeriksaan **sisi klien** menjadi salah. Untuk aplikasi yang pemeriksaan
  sisi kliennya satu-satunya — gating UI admin, feature gating, dan setiap
  aplikasi yang memverifikasi token pihak ketiga di klien — kegagalannya
  langsung.
- Penyerang tidak perlu melakukan apa pun untuk meracuni cache: peracunan
  terjadi lewat pemakaian normal di T0. Yang "diserang" adalah waktu.
- `maxAge` dipilih developer. Nilai lazim berkisar jam hingga hari; selama
  itu pula rotasi kunci dan pencabutan hak tidak sampai.

## Kenapa ini cacat, bukan perilaku yang dirancang

Dokumentasinya (`adev/src/content/ecosystem/service-workers/config.md`, bagian
`dataGroups.urls`) hanya menyatakan "A list of URL patterns. URLs that match
these patterns are cached according to this data group's policy." Tidak ada
kalimat bahwa pola dicocokkan sebagai substring, tidak ada bahwa pola path
berlaku lintas-origin. Caching lintas-origin memang didukung — tetapi dengan
menulis URL absolut (dokumentasi menyebut CDN seperti Google Fonts), bukan
sebagai efek samping dari menulis `/api/**`.

Dan berkas yang sama sudah menunjukkan penulisnya tahu anchor itu perlu: tiga
dari lima tempat memakainya.

## Perbaikan

Menambahkan `^` saja TIDAK cukup, dan itu bagian penting dari laporannya:
`data.ts` menguji terhadap URL absolut, jadi pola path yang di-anchor
(`^\/api\/.*$`) justru tidak akan pernah cocok. Perbaikan yang benar adalah
menyelesaikan pola relatif terhadap origin aplikasi saat pembuatan manifest —
menghasilkan `^https:\/\/app\.example\.com\/api\/.*$` — atau, minimal,
memakai `adapter.normalizeUrl()` di `data.ts:305` seperti yang sudah dilakukan
`assets.ts:126`, lalu meng-anchor polanya.
