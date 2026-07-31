# F-11 — bukti dinamis: `AngularJSUrlCodec.decodePath` / `decodeHash`

Cacat: `packages/common/upgrade/src/params.ts` mendefinisikan pembungkus aman
`tryDecodeURIComponent()` (baris 247-254) dan memakainya untuk query string
(baris 271-273), tetapi `decodePath()` (150) dan `decodeHash()` (167) tetap
memanggil `decodeURIComponent` mentah.

Ketiganya dipanggil pada **tiga baris berurutan** di
`location_shim.ts:369-371`, dari dalam konstruktor `$locationShim`.

## Persiapan

```bash
mkdir /tmp/f11 && cd /tmp/f11 && npm init -y
npm i @angular/common@22.1.0 @angular/core@22.1.0 @angular/compiler@22.1.0 \
      @angular/platform-browser@22.1.0 @angular/upgrade@22.1.0 rxjs tslib
# hanya untuk browser-proof.mjs:
npm i playwright
```

Semua harness memuat **bundel npm yang sebenarnya dikirim**
(`fesm2022/upgrade.mjs`) — tidak ada kode Angular yang ditranskripsi ulang.
Itu disengaja: bukti F-01 sebelumnya memakai port tangan dan karenanya lemah.

## 1. `probe.mjs` — perilaku codec

```bash
node probe.mjs /tmp/f11/node_modules
```

Empat langkah: keterjangkauan (parser URL WHATWG mempertahankan `%zz`),
kontrol positif (`decodeSearch` selamat), cacatnya (6/6 melempar), kontrol
negatif (`%20`, `%2F`, `<script>`, NUL semuanya OK).

## 2. `shim-e2e.mjs` — apakah ada yang runtuh?

```bash
node shim-e2e.mjs /tmp/f11/node_modules
```

Membangun `$locationShim` asli dengan dependensi tiruan minimal dan
memvariasikan **hanya URL awal**:

```
bootstrap OK      https://app.test/dashboard          path="/dashboard"
bootstrap OK      https://app.test/a%20b              path="/a b"
bootstrap OK      https://app.test/dashboard?q=%zz    path="/dashboard"
BOOTSTRAP GAGAL   https://app.test/dashboard#%zz      URIError: URI malformed
BOOTSTRAP GAGAL   https://app.test/a%zz               URIError: URI malformed
BOOTSTRAP GAGAL   https://app.test/a%                 URIError: URI malformed
```

Baris query yang selamat adalah pembandingnya: masukan sama-sama cacat, beda
satu-satunya adalah `decodeSearch` memakai pembungkus aman.

> Catatan jebakan: `PlatformLocation.protocol` mengikuti `location.protocol`
> peramban dan **menyertakan titik dua** (`'https:'`). Versi pertama harness ini
> menghapus titik duanya, membuat `getServerBase()` menghasilkan
> `https//app.test/`, `stripBaseUrl` gagal, dan seluruh uji jadi no-op yang
> tampak "lolos". Selalu periksa jalur cacat benar-benar dieksekusi.

## 3. `browser-proof.mjs` — Chromium sungguhan

```bash
node browser-proof.mjs /tmp/f11/node_modules --shot bukti.png
```

Menutup keberatan "masukannya sintetis": Chromium yang menavigasi ke
`http://127.0.0.1:PORT/a%zz?q=%zz#%zz`, dan `location.pathname` / `location.hash`
adalah nilai dari peramban.

```
location.pathname = "/a%zz"
location.search   = "?q=%zz"
location.hash     = "#%zz"

decodeSearch(location.search)   [tryDecodeURIComponent (ADA)] OK — {}
decodePath(location.pathname)   [decodeURIComponent mentah  ] LEMPAR — URIError
decodeHash(location.hash)       [decodeURIComponent mentah  ] LEMPAR — URIError
```

Tangkapan layar: `analysis/evidence/F-11-chromium.png`.

## Dampak

Sisi klien, satu pengguna, pulih sendiri saat bernavigasi ke URL bersih.
**Layanan tidak down.** Yang membedakannya dari F-10: yang gagal adalah
konstruktor `$locationShim`, jadi seluruh aplikasi hibrida ngUpgrade gagal
bootstrap — bukan hanya satu pemanggilan API.

## Perbaikan

```ts
segments[i] = tryDecodeURIComponent(segments[i]) ?? segments[i];
hash = tryDecodeURIComponent(hash) ?? hash;
```
