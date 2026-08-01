# Langkah demi langkah mengirim F-13 ke Angular

Laporan: `analysis/reports/F-13-ngsw-ignorevary.md`
Bukti gambar: `analysis/evidence/F-13-ignorevary.png`
PoC: `analysis/tools/ngsw/browser/poc-f13.mjs` + `index-f13.html`

---

## 0. Jangan buka isu publik

F-13 adalah pengungkapan informasi ber-otentikasi. Ikuti kebijakan keamanan
Angular, bukan issue tracker publik.

- Baca kebijakannya lebih dulu: <https://angular.dev/best-practices/security>
  bagian *Reporting vulnerabilities*, dan `SECURITY.md` di repo `angular/angular`.
- Angular mengarahkan laporan keamanan ke proses Google:
  <https://g.co/vulnz> (Google Bug Hunters). Alamat surel
  `security@angular.io` juga tercantum pada dokumentasi Angular.
- Jangan menyinggung detail teknisnya di isu publik, PR, Discord, atau media
  sosial sampai ada perbaikan atau tim menyatakan boleh.

---

## 1. Reproduksi ulang dari nol di mesin bersih

Tujuannya memastikan laporan bisa dijalankan orang lain tanpa repositori Anda.

```bash
mkdir ~/f13 && cd ~/f13
npm init -y
npm i @angular/service-worker@22.1.0 playwright
npx playwright install chromium
```

Salin dua berkas PoC ke `~/f13/`:

```bash
cp <repo>/analysis/tools/ngsw/browser/poc-f13.mjs   ~/f13/
cp <repo>/analysis/tools/ngsw/browser/index-f13.html ~/f13/
```

Jalankan:

```bash
cd ~/f13
node poc-f13.mjs ./node_modules --shot bukti-f13.png
echo "exit=$?"
```

Yang harus Anda lihat:

```
A  SEPERTI DIKIRIM  (ignoreVary: true, dari Generator)
  manifest cacheQueryOptions        {"ignoreVary":true}
  header respons server             Vary: Authorization
  T0 Alice (Bearer ALICE) menerima  {"name":"Alice", ... "role":"admin"}
  T2 Bob   (Bearer BOB)   menerima  {"name":"Alice", ... "role":"admin"}
  permintaan sampai ke server       1
     cache.match(bobRequest)                     -> undefined
     cache.match(bobRequest, {ignoreVary:true})  -> {"name":"Alice", ...}

B  DITAMBAL         (ignoreVary: false)
  T2 Bob   (Bearer BOB)   menerima  {"name":"Bob", ... "role":"viewer"}
  permintaan sampai ke server       2

exit=0
```

`exit=0` hanya terjadi bila keempat kondisi terpenuhi. Bila bukan 0, **jangan
kirim** — cari tahu dulu apa yang berubah.

---

## 2. Ambil tangkapan layar peramban

`--shot bukti-f13.png` sudah menghasilkannya dari arm A. Pastikan gambar itu
memuat keempat hal berikut, karena inilah yang dibaca triager lebih dulu:

- baris `T0 Alice` dan `T2 Bob` dengan header `Authorization` berbeda dan
  **URL yang identik**;
- `Header respons server : Vary: Authorization`;
- `Permintaan yang sampai ke server : 1`;
- blok `cache.match(bobRequest) -> undefined` vs
  `cache.match(bobRequest, {ignoreVary: true}) -> respons Alice`.

Bila ingin menambah bukti dari DevTools (opsional, memperkuat):

1. Jalankan servernya saja, lalu buka URL yang dicetak di Chrome biasa.
2. DevTools → **Application → Service Workers** — pastikan `ngsw-worker.js`
   berstatus *activated and is running*.
3. **Application → Cache Storage → `ngsw:/:1:data:api:cache`** — tunjukkan entri
   `/api/profile` beserta header respons `Vary: Authorization`.
4. **Network** — tunjukkan permintaan Bob ditandai *(ServiceWorker)* dan tidak
   ada permintaan keluar yang bersesuaian.

---

## 3. Siapkan berkas lampiran

Kirim sesedikit mungkin, tetapi cukup untuk dijalankan ulang:

| berkas | isi |
|---|---|
| `F-13-ngsw-ignorevary.md` | laporannya |
| `bukti-f13.png` | tangkapan layar peramban |
| `poc-f13.mjs` | PoC |
| `index-f13.html` | halaman uji |
| `keluaran.txt` | keluaran terminal lengkap dari langkah 1 |

```bash
cd ~/f13
node poc-f13.mjs ./node_modules > keluaran.txt 2>&1
zip f13-poc.zip F-13-ngsw-ignorevary.md bukti-f13.png poc-f13.mjs index-f13.html keluaran.txt
```

---

## 4. Kirim

**Jalur utama — Google Bug Hunters** (<https://g.co/vulnz>)

1. Masuk, pilih laporan baru, produk **Angular** (open source / third-party
   dependency Google).
2. Judul:
   `Angular Service Worker forces ignoreVary: true, replaying authenticated cached responses across authorization contexts`
3. Tempel isi `F-13-ngsw-ignorevary.md` sebagai badan laporan.
4. Lampirkan `f13-poc.zip`.
5. Isi severity yang Anda usulkan: **Medium**, dengan alasan yang sudah tertulis
   di bagian *Severity* laporan.

**Jalur alternatif — surel**

Kirim ke `security@angular.io` dengan subjek yang sama, badan laporan yang sama,
dan lampiran yang sama. Sebutkan bahwa Anda juga terbuka melapor lewat
g.co/vulnz bila itu jalur yang mereka inginkan.

---

## 5. Isi laporannya dengan urutan ini

Triager membaca dari atas dan berhenti begitu yakin. Urutkan demikian:

1. **Satu kalimat dampak.** "Setelah transisi konteks otentikasi, Angular
   Service Worker dapat mengungkapkan respons ber-otentikasi milik prinsipal
   sebelumnya kepada prinsipal berikutnya tanpa menghubungi server."
2. **Tiga baris bukti** — hit server 1×, `cache.match` default `undefined`,
   `cache.match` dengan `ignoreVary:true` mengembalikan respons Alice.
3. **Akar masalah** — `generator.ts:203-210` plus tipe publik
   `Pick<CacheQueryOptions, 'ignoreSearch'>`.
4. **Arm yang ditambal** — `ignoreVary: false` menutupnya.
5. Baru kemudian prasyarat, batas, dan usulan perbaikan.

---

## 6. Yang harus dihindari di dalam laporan

- Jangan menulis `Vary: Authorization` "mencegah respons disimpan". Ia menyatakan
  representasi bervariasi menurut header itu; cache harus mempertimbangkannya
  saat mencari kecocokan.
- Jangan mengklaim ini melanggar same-origin policy. Tidak.
- Jangan mengklaim tidak butuh transisi identitas. Butuh — sebutkan bentuk
  realistisnya (account switcher, ganti tenant, impersonation, logout/login).
- Jangan mencampurnya dengan F-12. Sebut satu kalimat saja di bagian akhir.
  Kalau tidak, diskusi bisa tersedot ke perdebatan glob matching dan F-13 yang
  lebih kuat ikut turun.
- Jangan mengajukan PR perbaikan sebelum tim keamanan merespons.

---

## 7. Sesudah mengirim

- Catat tanggal kirim dan nomor laporan.
- Angular/Google biasanya membalas dalam beberapa hari kerja. Bila 14 hari tidak
  ada respons, kirim tindak lanjut singkat pada thread yang sama.
- Sepakati jadwal pengungkapan sebelum membicarakannya di tempat lain.
- Bila mereka meminta perbaikan, tawarkan patch `buildCacheQueryOptions` beserta
  uji regresi yang menegaskan `dataGroups` **tidak** menyertakan
  `ignoreVary: true`.

---

## Bila F-12 juga ingin dikirim

Kirim **terpisah**, dan sesudah F-13 mendapat nomor laporan.

F-12 lebih mungkin diperlakukan sebagai bug correctness karena dokumentasi
Angular mengakui pencocokan glob bersifat parsial. Menggabungkannya berisiko
menyeret turun F-13. Laporan F-12 sudah siap di
`analysis/reports/F-12-ngsw-crossorigin-cache.md`; jalur pengirimannya sama,
tetapi severity yang diusulkan sebaiknya Low–Medium dan dibingkai sebagai
*cache-scope confusion*, bukan sebagai kerentanan tersendiri.
