# Korpus Regex — analisis keamanan Angular

Kumpulan seluruh pola regex yang dipakai sepanjang sesi analisis, disimpan agar
kerja ini dapat diulang dan dikembangkan. Dua berkas:

- **`corpus.mjs`** — korpus itu sendiri, tiga kelompok pola + catatan riset regex.
- **`scan-guard-defects.mjs`** — pemindai untuk kelompok GUARD (pola baru).

Pemindai lama (`../tools/scan-sinks.mjs`) tetap dipakai untuk kelompok SINK.

---

## Mengapa ada kelompok pola baru

29 pola pertama semuanya **pola SINK** — mencari operasi berbahaya (`eval`,
`innerHTML`, `setAttribute('src')`, …). Pola itu menghasilkan ~360 kandidat yang
sudah ditriase penuh, dan hasil akhirnya: **nol cacat**. Semua sink ternyata
berguard, tidak terkirim, atau memang dirancang begitu.

Sementara itu, **ketiga cacat nyata yang akhirnya ditemukan bukan sink sama
sekali**:

| Temuan | Apa sebenarnya yang salah |
|---|---|
| F-01 | Loop mXSS keluar di iterasi ke-2, jatah 5 tak terpakai, `throw` jadi kode mati |
| F-05 | Validator `APP_ID` hanya didaftarkan di `ngDevMode`; sink-nya jalan di produksi |
| F-06 | Gate allowlist pakai akses bracket, ditembus rantai `Object.prototype` |

Ketiganya satu kelas: **garda yang gagal menjaga**. Tidak ada pola sink —
berapa pun banyaknya — yang bisa menemukan itu, karena yang dicari bukan
"operasi berbahaya" melainkan "perlindungan yang tidak menutup".

Kelompok GUARD (G-01…G-07) lahir dari generalisasi ketiga temuan itu.

---

## Validasi-diri

Masalah pola heuristik: mudah menulis regex yang terlihat pintar tetapi tidak
menemukan apa pun. Karena itu pemindai GUARD menutup dirinya dengan uji balik —
ia harus menemukan kembali temuan yang sudah diketahui:

```
$ node analysis/regex-corpus/scan-guard-defects.mjs

  [DITEMUKAN] F-01 via G-05-anggaran-percobaan   -> core/.../html_sanitizer.ts:314
  [DITEMUKAN] F-05 via G-01-guard-dev-only       -> core/.../platform_ref.ts:55
  [DITEMUKAN] F-05 via G-04-interpolasi...       -> platform-server/src/utils.ts:174
  [DITEMUKAN] F-06 via G-02-gate-bracket         -> core/.../i18n_parse.ts:841
  [DITEMUKAN] F-02 via G-07-sinkron-dua-salinan  -> compiler/.../dom_security_schema.ts:112

  Skor validasi-diri: 5/5
```

Kalau nanti ada yang mengubah pola dan skornya turun, polanya rusak — bukan
repositorinya yang bersih.

---

## Menekan derau: filter konteks

Tiga pola awalnya terlalu berisik. Perbaikannya bukan mempersempit regex
(yang berisiko membuang temuan asli), melainkan menambahkan **syarat konteks** —
sinyal pendukung yang harus muncul dalam ±N baris.

| Pola | Sebelum | Sesudah | Cara |
|---|---:|---:|---|
| G-04 interpolasi ke string berkutip | 278 | **11** | butuh sinyal pembangun skrip (`createScript`, `textContent =`, `window.`, `.after(`) dalam ±6 baris |
| G-06 assert dev-only | 160 | **35** | butuh penolakan NILAI (`throw new`, `assertNot`, `RuntimeError`) dalam ±10 baris, bukan sekadar `console.warn` |
| G-07 sinkron dua salinan | 42 | **9** | berhenti mencocokkan tautan markdown; hanya rujukan ke simbol KODE |

Alasannya: yang membuat F-05 berbahaya bukan tanda kutipnya, melainkan bahwa
hasilnya menjadi isi `<script>`. Konteks itulah sinyalnya, bukan bentuk regexnya.

---

## G-07 mentriase dirinya sendiri

Satu pola tidak berhenti di pencocokan. G-07 menangkap **nama simbol** yang
dirujuk komentar "keep in sync with X", lalu mencarinya ke seluruh repositori
dan melaporkan yang **menggantung**.

Ada jebakan halus di sini yang sempat membuat hasilnya salah. Ambang naif
"muncul ≤ 1 kali berarti tidak ada" gagal, karena `SECURITY_SENSITIVE_ELEMENTS`
disebut **dua kali** — schema Angular punya dua salinan dan keduanya memuat
komentar yang sama. Perbaikannya: kurangi jumlah kemunculan dengan jumlah
baris-komentar yang merujuknya. Sisa 0 berarti simbol hanya hidup di dalam
komentar.

Hasilnya, tanpa diberi tahu lokasinya, pemindai menandai kedua salinan:

```
verifikasi: 2 dari 9 rujukan MENGGANTUNG
  compiler/src/schema/dom_security_schema.ts:112   <-- MENGGANTUNG (SECURITY_SENSITIVE_ELEMENTS)
  core/src/sanitization/dom_security_schema.ts:112 <-- MENGGANTUNG (SECURITY_SENSITIVE_ELEMENTS)
```

---

## Catatan riset regex

Tersimpan di `CATATAN_RISET` pada `corpus.mjs`. Ringkasnya:

- **`\b` rusak untuk identifier JS.** `$` dan `.` dianggap batas kata, jadi
  `\beval\(` ikut cocok pada `this.eval(`. Pakai lookbehind `(?<![\w$.])`.
- **Akses bracket butuh pola terpisah.** `obj["eval"]()` tak akan pernah cocok
  dengan pola berbasis titik.
- **ripgrep tidak mendukung lookbehind** (mesin Rust regex) — pemindaian yang
  memakainya harus lewat Node, bukan `rg`/Grep.
- **Bedakan `=` dari `==`/`===`** dengan `\+?=(?!=)`.
- **Deklarasi TypeScript menimbulkan FP** pada pola pemanggilan: `open(name: string)`
  terlihat seperti `open(`. Batasi receiver.
- **Jangan parsing multi-baris per-baris.** Versi pertama pemeriksa schema
  kehilangan 18 entri karena entri membentang beberapa baris; harus memakai
  penghitungan kurung.

---

## Cara pakai

```bash
# pemindai kelas garda (pola baru)
node analysis/regex-corpus/scan-guard-defects.mjs          # ringkas
node analysis/regex-corpus/scan-guard-defects.mjs --all    # seluruh kecocokan

# pemindai sink (pola lama)
node analysis/tools/scan-sinks.mjs
```

## Yang masih kurang

Korpus ini murni leksikal, jadi ada batas yang jelas:

- **Tidak melacak aliran data.** G-01 menemukan garda dev-only, tetapi manusia
  masih harus membuktikan nilainya sampai ke sink. Untuk F-05 pembuktian itu
  manual.
- **Tidak memahami keterjangkauan.** G-05 menemukan penghitung percobaan; bahwa
  loopnya tidak pernah mencapai ronde ke-3 baru terbukti lewat simulasi
  (`../tools/mxss-loop-proof.mjs`) dan peramban nyata
  (`../tools/mxss-browser/`).
- **G-06 masih 35 kecocokan** — perlu penyempitan lanjutan, mungkin dengan
  menuntut nilai yang ditolak berasal dari input publik (`@Input`, parameter).
- **Belum ada pola untuk dua kelas yang terbukti produktif secara manual**:
  (a) dua salinan data yang harus identik tetapi menyimpang isinya — G-07 baru
  memeriksa keberadaan simbol, belum membandingkan isi; (b) sanitizer/gate kedua
  yang menduplikasi logika keamanan di tempat lain (seperti `walkIcuTree` yang
  menduplikasi `SanitizingHtmlSerializer`) — ini yang menuntun ke F-06 dan
  ditemukan lewat pembacaan impor, bukan regex.
