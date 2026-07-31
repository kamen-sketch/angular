# Angular Service Worker forces `ignoreVary: true`, replaying authenticated cached responses across authorization contexts

**Paket terdampak:** `@angular/service-worker`
**Diuji pada:** 22.1.0 (artefak npm, `ngsw-worker.js` apa adanya)
**Jenis:** Sensitive information disclosure / cache key confusion
**Severity yang diusulkan:** Medium

---

## Ringkasan

Angular membangkitkan `cacheQueryOptions.ignoreVary = true` tanpa syarat untuk
setiap asset group dan data group, dan **tidak mengekspos opsi konfigurasi
untuk mematikannya**. Akibatnya respons ber-cache yang membawa
`Vary: Authorization` dapat dikembalikan untuk permintaan berikutnya dengan
nilai header `Authorization` yang berbeda.

Setelah transisi konteks otentikasi, Angular Service Worker dapat mengungkapkan
respons ber-otentikasi milik prinsipal sebelumnya kepada prinsipal berikutnya
**tanpa menghubungi server**.

Server melakukan hal yang benar. Peramban mampu menegakkannya. Angular
menonaktifkannya secara diam-diam, dan developer tidak dapat menyalakannya lagi.

> Catatan istilah: `Vary` **tidak** berarti "jangan cache". Artinya representasi
> ini dipilih berdasarkan nilai header permintaan tersebut, sehingga cache harus
> mempertimbangkan header itu ketika mencari kecocokan. Default Cache API adalah
> `ignoreVary: false`.

---

## Akar masalah

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

Dipanggil untuk **setiap** grup — `assetGroups` (`:94`) dan `dataGroups`
(`:112`) — sehingga masuk ke dalam `ngsw.json` yang dikirim.

**Tipe konfigurasi publik tidak mengizinkan `ignoreVary`:**

`packages/service-worker/config/src/in.ts:44` dan `:64`, serta
`goldens/public-api/service-worker/config/index.api.md:10,54`

```ts
cacheQueryOptions?: Pick<CacheQueryOptions, 'ignoreSearch'>;
```

Karena `inOptions` di-spread **setelah** `ignoreVary: true`, secara teknis nilai
itu bisa ditimpa — tetapi tipe publiknya tidak pernah membolehkan developer
menyediakannya. Tidak ada jalur yang didukung menuju `ignoreVary: false`.

**Runtime meneruskannya apa adanya:**

`packages/service-worker/worker/src/data.ts:502`

```ts
let res = await cache.match(req, this.config.cacheQueryOptions);
```

**Dokumentasi tidak menyebutkannya.**
`adev/src/content/ecosystem/service-workers/config.md:154` hanya
mendokumentasikan `ignoreSearch`. Dokumentasi menyatakan `cacheQueryOptions`
diteruskan ke `Cache.match()`, tetapi tidak menjelaskan bahwa Angular selalu
menambahkan `ignoreVary: true`.

---

## Bukti

PoC di bawah ini **same-origin sepenuhnya**. Endpoint yang diuji berada di
origin aplikasi sendiri dan **sengaja** dicakup oleh `dataGroups` — tidak ada
pola lintas-origin yang terlibat.

Diverifikasi di Chromium dengan Service Worker yang benar-benar terdaftar
melalui `navigator.serviceWorker.register('/ngsw-worker.js')`. Cache Storage,
pencocokan `Vary`, dan interception seluruhnya milik peramban.

### Konfigurasi

```jsonc
// ngsw-config.json
{
  "index": "/index.html",
  "dataGroups": [{
    "name": "api",
    "urls": ["/api/**"],
    "cacheConfig": { "strategy": "performance", "maxSize": 100, "maxAge": "1d" }
  }]
}
```

### Permintaan

```
Alice Authorization header:  Bearer ALICE
Bob   Authorization header:  Bearer BOB
Request URL:                 identical — http://localhost:PORT/api/profile
Response header:             Vary: Authorization
```

### Hasil

```
Permintaan yang sampai ke server aplikasi: 1        (2 = normal, 1 = Bob dari cache)

Default peramban:
  cache.match(bobRequest)                     -> undefined

Opsi Angular:
  cache.match(bobRequest, {ignoreVary: true}) -> {"name":"Alice","email":"alice@example.com","role":"admin"}

Angular yang ditambal (ignoreVary: false):
  permintaan Bob mencapai jaringan            -> {"name":"Bob","email":"bob@example.com","role":"viewer"}
  permintaan yang sampai ke server            -> 2
```

Kedua pencocokan itu dilakukan terhadap **entri cache yang sama**, di dalam
halaman, tepat setelah ngsw menuliskannya. Peramban menolak kecocokan tersebut;
Angular memaksanya cocok.

### Isi manifest yang dibangkitkan

```json
{
  "dataGroups": [
    {
      "name": "api",
      "patterns": ["\\/api\\/.*"],
      "cacheQueryOptions": { "ignoreVary": true }
    }
  ]
}
```

### Tangkapan layar

`analysis/evidence/F-13-ignorevary.png`

---

## Dampak

Setelah transisi konteks otentikasi pada origin dan profil peramban yang sama,
respons ber-otentikasi milik prinsipal sebelumnya disajikan kepada prinsipal
berikutnya. Pada PoC ini: nama, alamat surel, dan role. Permintaan prinsipal
kedua **tidak pernah mencapai server**, sehingga server tidak punya kesempatan
menolaknya.

### Prasyarat, dinyatakan apa adanya

Eksploitasi memerlukan **dua konteks otorisasi yang dapat dibedakan meminta URL
yang sama dalam masa hidup cache Service Worker**. Itu tidak harus berarti dua
orang berbagi komputer. Kondisi yang sama muncul pada:

- logout Alice lalu login Bob;
- pergantian tenant atau organisasi;
- account switcher bawaan produk SaaS;
- admin melakukan impersonation lalu kembali ke akunnya;
- token berubah setelah role atau identitas diganti;
- satu pengguna dengan akun personal dan akun bisnis;
- kiosk atau workstation bersama.

### Kenapa beberapa bantahan umum tidak berlaku di sini

| bantahan | kenapa tidak berlaku |
|---|---|
| "hanya UI basi" | yang bocor adalah body respons ber-otentikasi, bukan tampilan |
| "otorisasi sisi klien tidak otoritatif" | ini pelanggaran kerahasiaan, bukan keputusan otorisasi |
| "endpoint tertangkap pola lintas-origin yang keliru" | PoC ini same-origin, endpoint sengaja dicakup |
| "server lupa membedakan respons" | server mengirim `Vary: Authorization` dengan benar |
| "cache poisoning oleh penyerang" | tidak ada penyerang; ini terjadi lewat pemakaian normal |
| "ini perilaku default peramban" | default Cache API adalah `ignoreVary: false` |
| "developer memilih cache-first" | benar, tetapi ia tidak diberi opsi mempertahankan semantik `Vary` |

### Severity

**Medium** adalah klaim yang paling defensif: dampak kerahasiaannya konkret,
tetapi dibatasi oleh perlunya transisi identitas pada profil peramban yang sama.

Severity dapat lebih tinggi bila salah satu berikut berlaku pada aplikasi
tertentu, dan laporan ini **tidak** mengklaimnya tanpa bukti tambahan:

- produk SaaS dengan account/tenant switching bawaan;
- respons memuat data finansial, medis, token, atau PII sensitif;
- endpoint yang sama dipakai banyak tenant;
- pergantian akun adalah alur normal, bukan perangkat fisik bersama;
- penyerang dapat memicu atau mengarahkan korban melakukan pergantian akun;
- cache bertahan sesudah logout yang dianggap membersihkan sesi.

---

## Reproduksi

```bash
mkdir /tmp/f13 && cd /tmp/f13 && npm init -y
npm i @angular/service-worker@22.1.0 playwright
npx playwright install chromium

node <path-repo>/analysis/tools/ngsw/browser/poc-f13.mjs \
     /tmp/f13/node_modules --shot bukti-f13.png
```

Skrip keluar dengan status 0 **hanya bila** keempatnya benar: arm A membocorkan
data Alice ke Bob, arm B tidak, arm A menyentuh server 1×, arm B 2×.

Berkas: `analysis/tools/ngsw/browser/poc-f13.mjs`,
`analysis/tools/ngsw/browser/index-f13.html`

---

## Perbaikan yang diusulkan

Minimal:

```ts
function buildCacheQueryOptions(
  inOptions?: Pick<CacheQueryOptions, 'ignoreSearch' | 'ignoreVary'>,
): CacheQueryOptions {
  return {
    ignoreVary: false,
    ...inOptions,
  };
}
```

Bila `ignoreVary: true` perlu dipertahankan demi kompatibilitas aset statis,
data cache dan asset cache dapat memiliki default berbeda:

```
assetGroups : perilaku lama boleh dipertahankan — isinya di-hash dan tidak
              bergantung header permintaan
dataGroups  : ignoreVary false secara default — respons per-pengguna adalah
              kasus yang lazim di sini
```

Perubahan ini punya konsekuensi kompatibilitas (beberapa aplikasi akan melihat
cache hit berkurang bila servernya mengirim `Vary` yang luas seperti
`Vary: Accept-Encoding`). Menurut kami keamanan respons data ber-otentikasi
lebih penting daripada memaksa semua respons diperlakukan sebagai varian yang
sama, terutama karena saat ini developer tidak diberi pilihan sama sekali.

---

## Catatan tentang temuan terkait

Selama pengujian, perilaku yang sama juga terjangkau untuk permintaan
lintas-origin yang tidak dimaksudkan, karena pola bergaya path dicocokkan
terhadap URL absolut. Isu itu dapat direproduksi secara independen dan
**tidak diperlukan** untuk laporan ini. Lihat
`analysis/reports/F-12-ngsw-crossorigin-cache.md`.
