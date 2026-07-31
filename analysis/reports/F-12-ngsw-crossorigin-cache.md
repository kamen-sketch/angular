# Path-style Angular Service Worker `dataGroups` patterns unintentionally match and cache cross-origin requests

Laporan mandiri untuk dikirim ke jalur keamanan Angular. Semua bukti dapat
dijalankan ulang oleh pihak ketiga hanya dengan `npm i @angular/service-worker`.

---

## Ringkasan

`dataGroups.urls` yang ditulis dalam bentuk path (diawali `/`) dikompilasi
menjadi regular expression **tanpa origin binding**, lalu diuji terhadap
`Request.url` **absolut** saat runtime. Akibatnya pola yang tampak same-origin
seperti `/api/**` juga mencocokkan URL lintas-origin yang tidak berkaitan,
ketika substring itu muncul di path **atau di query string**-nya.

Konsekuensinya, kebijakan caching yang **sengaja** dipilih developer untuk API
miliknya sendiri diperluas secara diam-diam ke endpoint ber-otentikasi milik
pihak ketiga yang tidak pernah ia konfigurasikan.

---

## Root cause

**`packages/service-worker/config/src/generator.ts`**

```ts
// :96   assetGroups
patterns: (group.resources.urls || []).map((url) => urlToRegex(url, this.baseHref, true)),
// :104  dataGroups
patterns: group.urls.map((url) => urlToRegex(url, this.baseHref, true)),
```

Bandingkan dengan tiga tempat lain di berkas yang sama, yang semuanya
meng-anchor:

```ts
// :126  navigationUrls
return {positive, regex: `^${urlToRegex(url, baseHref)}$`};
// :153 / :158  pencocokan berkas saat build
regex: new RegExp('^' + globToRegex(pattern) + '$'),
```

**`packages/service-worker/worker/src/data.ts:305`**

```ts
if (!this.patterns.some((pattern) => pattern.test(req.url))) {
```

`req.url` di sini adalah URL absolut lengkap dengan skema dan host. Tidak ada
pemeriksaan origin di sepanjang jalur ini.

Berbeda dengan tetangganya, **`assets.ts:126`**, yang menormalkan lebih dulu:

```ts
if (this.urls.indexOf(url) !== -1 || this.patterns.some((pattern) => pattern.test(url)))
// url = adapter.normalizeUrl(req.url)
```

dan `adapter.ts:84-88` memang membandingkan origin:

```ts
normalizeUrl(url: string): NormalizedUrl {
  const parsed = this.parseUrl(url, this.scopeUrl);
  return (parsed.origin === this.origin ? parsed.path : url) as NormalizedUrl;
}
```

### Pernyataan masalah yang tepat

Dokumentasi Angular memang menyatakan pencocokan glob bersifat parsial dan
developer boleh meng-anchor sendiri. **Laporan ini tidak menyangkal itu.**
Masalahnya lebih spesifik:

> Pola `dataGroups` bergaya path dievaluasi sebagai substring tanpa anchor
> terhadap URL permintaan absolut. Akibatnya konfigurasi **tidak dapat
> mengungkapkan makna alaminya** — "path ini pada origin aplikasi sendiri" —
> tanpa menuliskan origin deployment secara harfiah ke dalam regex.

Menuliskan `^/api/.*$` tidak menolong: pola itu tidak akan pernah cocok, karena
yang diuji adalah URL absolut. Satu-satunya bentuk yang aman adalah
`^https://app\.example\.com/api/.*$` — yang berarti developer harus:

- mengetahui bahwa pola path diuji terhadap URL absolut (tidak didokumentasikan);
- menghindari bentuk lazim `/api/**` yang dipakai contoh dokumentasi sendiri;
- meng-hardcode origin deployment;
- memelihara konfigurasi berbeda untuk staging, produksi, custom domain, dan
  hosting multi-tenant.

Konfigurasi bergaya path yang portabel tidak mempertahankan semantik
same-origin saat runtime.

---

## Dampak utama — pengungkapan respons lintas-akun

Diverifikasi di **Chromium dengan Service Worker terdaftar sungguhan** melalui
`navigator.serviceWorker.register('/ngsw-worker.js')`. Cache Storage,
pencocokan `Vary`, dan interception seluruhnya milik peramban.

```
origin aplikasi : http://localhost:PORT_A     (SW terdaftar di sini)
origin IdP      : http://127.0.0.1:PORT_B     (ORIGIN BERBEDA)
ngsw-config     : dataGroups[{ urls:['/api/**'], strategy:'performance', maxAge:'1d' }]
```

```
T0  Alice login  -> GET {IdP}/v2/api/profile   Authorization: Bearer ALICE
T1  Alice logout
T2  Bob login pada peramban yang sama
                 -> GET URL yang sama          Authorization: Bearer BOB
```

| | endpoint | T0 Alice menerima | T2 Bob menerima | IdP dihubungi |
|---|---|---|---|---|
| **A RENTAN** | `/v2/api/profile` | Alice | **Alice** | **1×** |
| **B KONTROL** | `/v2/profile` | Alice | Bob | 2× |
| **C** | `/v2/api/profile` + `Vary: Authorization` | Alice | **Alice** | **1×** |

Cache Storage peramban sesudah A dan C:

```
ngsw:/:1:data:api:cache
  LINTAS-ORIGIN  http://127.0.0.1:PORT_B/v2/api/profile
```

Bob menerima nama, email, dan role Alice. **Permintaan Bob tidak pernah
mencapai server IdP**, sehingga server tidak punya kesempatan menolaknya.
Ini pelanggaran kerahasiaan yang konkret, bukan UI basi, dan tidak bergantung
pada asumsi bahwa otorisasi sisi klien bersifat otoritatif.

Kontrol B mengisolasi variabelnya: endpoint yang sama, kode yang sama, token
yang sama — hanya bentuk path-nya yang berbeda.

### Arm C — pertahanan sisi server yang benar pun tidak menolong

IdP mengirim `Vary: Authorization`, yaitu mekanisme HTTP standar yang tepat
untuk mencegah reuse lintas-prinsipal. Kebocoran **tetap terjadi**.

Sebabnya disematkan pada **entri cache yang sama**, dengan mencocokkan
permintaan Bob dua kali di dalam halaman:

```
Cache.match(permintaan Bob) pada ngsw:/:1:data:api:cache
   {ignoreVary:true}  (yang dipakai ngsw) -> {"name":"Alice", ... "role":"admin"}
   default peramban   (menghormati Vary)  -> TIDAK COCOK
```

Lihat **F-13** di bawah.

### Batas yang dinyatakan apa adanya

- Butuh peramban bersama atau pergantian akun pada peramban yang sama
  (kiosk, perangkat keluarga, workstation bersama, akun uji, `logout`/`login`
  berurutan tanpa menutup peramban).
- Aplikasi harus benar-benar mengambil endpoint pihak ketiga yang path atau
  query-nya memuat substring pola.
- Penyerang tidak perlu berbuat apa pun untuk meracuni cache; peracunan terjadi
  lewat pemakaian normal di T0.

---

## Dampak tambahan

Keduanya dijalankan lewat `ngsw-worker.js` yang sama.

### (a) Rotasi kunci darurat tidak sampai ke peramban

`analysis/tools/ngsw/stale-authz.mjs`, skenario 1. Verifikasi memakai
**WebCrypto asli (ECDSA P-256 / ES256)**.

```
T0  k1 sah, aplikasi ambil JWKS dari {IdP}/v1/api/keys
T1  k1 BOCOR; IdP merotasinya keluar -> JWKS hanya berisi k2
T2  JWT role=admin bertanda tangan k1 disodorkan
```

Tanda tangan token itu **sah secara kriptografis**; yang salah adalah kuncinya
sudah dicabut lewat rotasi darurat. Istilah "forged"/"palsu" tidak tepat dan
tidak dipakai.

```
A RENTAN    JWKS di /v1/api/keys, pola \/api\/.*
            IdP dihubungi setelah rotasi = false   -> AKSES ADMIN DIBERIKAN
B KONTROL   JWKS di /v1/keys                        -> ditolak (kid tidak ada)
C PERBAIKAN pola ^https:\/\/app\.example\.com\/api\/.*$ -> ditolak
```

### (b) Pencabutan hak akses tidak berlaku

Skenario 2, tanpa mengandaikan verifikasi JWT sisi klien:

```
A RENTAN   hak di /v2/api/entitlements, IdP dihubungi setelah cabut = false
           aplikasi melihat {"role":"admin","active":true}
B KONTROL  hak di /v2/entitlements,     IdP dihubungi = true
           aplikasi melihat {"role":"viewer","active":false}
```

**Batas keduanya:** penegakan otoritatif seharusnya di server. Kedua dampak
tambahan ini menyerang pemeriksaan **sisi klien**, jadi menentukan hanya pada
aplikasi yang pemeriksaan sisi kliennya satu-satunya. Karena itu keduanya
disajikan sebagai dampak **tambahan**, bukan dampak utama.

---

## Reproduksi

```bash
mkdir /tmp/f12 && cd /tmp/f12 && npm init -y
npm i @angular/service-worker@22.1.0 playwright

# 1. keluaran Generator: pola dataGroups tidak di-anchor
node analysis/tools/ngsw/pattern-anchor.mjs     /tmp/f12/node_modules

# 2. DAMPAK UTAMA — Chromium, SW terdaftar sungguhan, lintas-akun
node analysis/tools/ngsw/browser/poc.mjs        /tmp/f12/node_modules --shot bukti.png

# 3. dampak tambahan — JWKS basi & pencabutan hak
node analysis/tools/ngsw/stale-authz.mjs        /tmp/f12/node_modules

# 4. caching lintas-origin dasar (scope tiruan, cepat)
node analysis/tools/ngsw/crossorigin-cache.mjs  /tmp/f12/node_modules
```

Semua harness keluar dengan status 0 hanya bila hipotesisnya terkonfirmasi
DAN kontrol negatifnya berperilaku benar.

Bukti: `analysis/evidence/F-12-crossaccount.png`

---

## Perbaikan yang diusulkan

Angular **memang** mendukung caching data lintas-origin secara sengaja
(dokumentasinya membahas respons opaque dan `cacheOpaqueResponses`). Perbaikan
tidak boleh menghapus dukungan itu. Yang diusulkan hanya memberi semantik wajar
pada pola yang diawali `/`:

1. Pola yang **diawali `/`** diperlakukan sebagai path pada origin Service
   Worker.
2. Pola yang memuat skema/origin, misalnya `https://cdn.example/**`, tetap
   diperlakukan sebagai pola lintas-origin seperti sekarang.
3. Pencocokan bergaya path dilakukan terhadap `pathname + search` yang sudah
   dinormalkan, bukan terhadap seluruh URL absolut origin lain.

Secara konsep, di `data.ts`:

```ts
const parsed = new URL(req.url);

if (configuredPattern.startsWith('/')) {
  if (parsed.origin !== adapter.origin) {
    return false;
  }
  return pattern.test(parsed.pathname + parsed.search);
}

return pattern.test(req.url);
```

Ini mempertahankan dukungan lintas-origin eksplisit sekaligus membuat
`/api/**` berarti apa yang dibaca orang.

---

## Severity yang realistis

| kondisi | severity |
|---|---|
| ada bukti pengungkapan data lintas-akun atau operasi berprivilege konkret | **Medium** |
| hanya entitlement/UI sisi klien yang basi | Low |
| bila triage menilai partial matching + staleness sudah terdokumentasi | Informational / Won't fix |

Laporan ini menyajikan bukti untuk baris pertama, dan menyatakan batasnya
untuk dua baris lainnya.

---

# Catatan: F-13 dilaporkan TERPISAH

`ignoreVary: true` yang di-hardcode kini menjadi laporan keamanan mandiri
dengan PoC same-origin yang tidak bergantung sama sekali pada F-12:

    analysis/reports/F-13-ngsw-ignorevary.md
    analysis/reports/PENGIRIMAN-F13.md

Alasan dipisah: dokumentasi Angular mengakui pencocokan glob bersifat parsial,
sehingga F-12 lebih mungkin diperlakukan sebagai bug correctness. Menggabungkan
keduanya berisiko membuat diskusi tersedot ke perdebatan glob matching dan
menyeret turun F-13 yang jauh lebih kuat.

Ringkasan F-13 untuk konteks:

**`packages/service-worker/config/src/generator.ts:203-210`**

```ts
function buildCacheQueryOptions(
  inOptions?: Pick<CacheQueryOptions, 'ignoreSearch'>,
): CacheQueryOptions {
  return {
    ignoreVary: true,
    ...inOptions,
  };
}
```

Tipe publiknya (`config/src/in.ts:44,64`, dan golden public API) adalah
`Pick<CacheQueryOptions, 'ignoreSearch'>` — jadi developer **tidak punya cara
yang didukung** untuk mematikan `ignoreVary`.

Dokumentasi `cacheQueryOptions` hanya menyebut `ignoreSearch`
(`adev/src/content/ecosystem/service-workers/config.md:154`). `ignoreVary`
tidak disebut sama sekali.

### Kenapa ini penting

`Vary` adalah mekanisme HTTP standar yang tepat bagi server untuk menyatakan
"respons ini tidak boleh dipakai ulang untuk permintaan dengan header berbeda".
`Vary: Authorization` dan `Vary: Cookie` adalah pertahanan baku terhadap reuse
cache lintas-prinsipal.

Angular menonaktifkannya tanpa syarat. Server yang **sudah melakukan hal yang
benar** tetap tidak terlindungi, dan aplikasi tidak dapat memilih sebaliknya.

Dibuktikan pada entri cache yang sama, di dalam halaman (arm C di atas):

```
{ignoreVary:true}  -> respons Alice
default peramban   -> TIDAK COCOK
```

### Usulan

Ekspos `ignoreVary` pada `cacheQueryOptions` publik, dan pertimbangkan
default `false` untuk `dataGroups` — di mana respons per-pengguna adalah kasus
yang lazim — sambil mempertahankan `true` untuk `assetGroups` yang isinya
di-hash dan tidak bergantung header.
