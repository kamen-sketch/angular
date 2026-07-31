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

## Kelas (b): logika keamanan yang diduplikasi

Dua berkas tambahan menutup celah yang dulu dicatat sebagai "belum ada polanya".

### `scan-duplicated-security.mjs` — logika yang dibangun ulang

Aturannya satu kalimat: **bedakan impor PERILAKU dari impor DATA.**

| Yang diimpor | Artinya | Nilai |
|---|---|---|
| `ɵɵsanitizeHtml`, `_sanitizeUrl` | mendelegasikan | aman — satu implementasi |
| `VALID_ATTRS`, `getInertBodyHelper` | membangun ulang | konstanta allowlist & helper parsing hanya dibutuhkan bila penyaringan ditulis sendiri |

Hasil: **2 berkas ditandai dari 3018.**

```
[skor 17] packages/core/src/render3/i18n/i18n_parse.ts
  bahan mentah: checkSecurityContext, getTemplateContent, VALID_ATTRS,
                VALID_ELEMENTS, getInertBodyHelper
  bukti menyaring sendiri: gate hasOwnProperty; gate akses bracket;
                penelusuran DOM sendiri; iterasi atribut sendiri

[skor 2]  packages/compiler/src/schema/dom_element_schema_registry.ts
  bahan mentah: checkSecurityContext
  bukti menyaring sendiri: (tidak ada)      <- delegasi sah, peringkat rendah
```

`i18n_parse.ts` — sumber F-06 — berada di peringkat 1 dengan skor 17, jauh di
atas satu-satunya kandidat lain. Temuan F-06 semula didapat lewat **membaca
daftar impor secara manual**; berkas ini mengubahnya jadi pemeriksaan otomatis.

### `scan-twin-drift.mjs` — data yang disalin lalu menyimpang

Melengkapi G-07, yang hanya memeriksa **keberadaan** simbol, bukan **isi**
salinan.

Dua jebakan yang harus dilewati, keduanya tercatat di kode:

1. **Pengelompokan berdasarkan nama dasar terlalu naif.** `schema.ts` muncul
   5 kali dan `sanitization.ts` 4 kali di paket yang tidak berhubungan — semuanya
   kebetulan senama. Diatasi dengan gerbang kemiripan.
2. **Jaccard atas literal saja tidak cukup.** `trusted_types.ts` (core vs
   upgrade) hanya mencetak **0.143** karena sidik jarinya kecil (5 vs 3 elemen),
   sehingga beberapa perbedaan sah langsung menenggelamkan skornya — padahal
   keduanya jelas kembar. Diatasi dengan sinyal kedua: **nama fungsi bersama**
   (keduanya mendefinisikan `getPolicy`).

Uji kembar akhirnya menggabungkan keduanya: kemiripan ≥ 0.3 **atau** ≥ 2 nama
fungsi bersama. Kuat untuk berkas padat data *dan* padat logika.

Hasil akhir — 2 kembar sungguhan, nol kebetulan:

```
dom_security_schema.ts  (compiler + core)
  IDENTIK: 44 literal, 21 konstanta — sinkron.

trusted_types.ts  (core + upgrade)
  MENYIMPANG (kemiripan 0.14, fungsi bersama 2):
    hanya di core   : "angular", konstanta HTML
    hanya di upgrade: "angular#unsafe-upgrade"
```

Keduanya sudah ditriase:

- **`dom_security_schema`** terkonfirmasi sinkron — lewat metode berbeda dari
  pemeriksa lama (`../tools/check-security-schema-sync.mjs`), jadi ini
  konfirmasi independen, bukan pengulangan.
- **`trusted_types`** memang menyimpang, tetapi **disengaja**: salinan upgrade
  memakai `createHTML: (s) => s` (identitas, tanpa sanitasi) dan nama policy-nya
  sendiri mengumumkannya — `angular#unsafe-upgrade`. Bukan cacat.

## Perluasan: G-08…G-11 (kelas yang lahir dari F-07 dan F-08)

Empat pola ditambahkan setelah dua temuan terakhir memperlihatkan bentuk cacat
yang tidak terjangkau G-01…G-07. Validasi-diri naik ke **6/6** — G-09 menemukan
kembali F-07 tanpa diberi tahu lokasinya.

| Pola | Hipotesis | Hasil |
|---|---|---:|
| G-08 tipe `T \| T[]` | tipe mengizinkan dua bentuk, pemakainya sering menangani satu | 106 |
| G-09 `switch` tanpa `default` | nilai di luar dugaan lolos tanpa perlakuan | 10 |
| G-10 pasangan parse/serialize | menjanjikan round-trip yang jarang diuji | 5 |
| G-11 normalisasi membuang bagian kosong | dua masukan berbeda menjadi satu keluaran | 5 |

### Triase kandidat baru

**G-09 → `i18n_apply.ts:427` — POSITIF PALSU.** Ini `switch` tanpa `default`,
tetapi operandnya `opCode & I18nUpdateOpCode.MASK_OPCODE`: bilangan yang
DIHASILKAN COMPILER dari enum tertutup, bukan data eksternal. Opcode tak dikenal
berarti ketidakcocokan versi compiler/runtime, bukan masukan penyerang.

Perbedaannya dengan F-07 penting dan menjadi aturan triase pola ini:

> `switch` tanpa `default` baru berarti bila **tipe operandnya sendiri
> mengizinkan bentuk yang tidak tertangani**. Pada F-07 tipenya
> `SecurityContext | SecurityContext[]` — array tidak pernah cocok dengan case
> mana pun. Pada `i18n_apply` operandnya bilangan bertopeng dari enum tertutup.

**G-08 terlalu luas (106).** Tipe union skalar-atau-array lazim di IR compiler.
Pola ini baru berguna bila dipasangkan dengan pemeriksaan lanjutan: *satu*
pemakai field memanggil `Array.isArray` sementara pemakai lain tidak. Itu
menuntut analisis pemakaian per-field, bukan pencocokan teks — dicatat sebagai
batas, bukan diklaim selesai.

**G-10 menemukan kembali rumah F-08** (`router/src/url_tree.ts:423`), yang
memvalidasi polanya. Empat kandidat lain belum diuji dan semuanya pasangan
parse/serialize sungguhan:

```
compiler/src/i18n/serializers/xliff.ts:225
compiler/src/i18n/serializers/xliff2.ts:249
localize/tools/.../xliff1_translation_parser.ts:39
router/src/navigation_transition.ts:484
```

Keempatnya dapat difuzz dengan properti yang sama persis seperti F-08 —
bandingkan hasil TERSTRUKTUR, bukan string, karena F-08 stabil pada string
tetapi tidak pada pohon. Ini pekerjaan berikutnya yang paling jelas.

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
- ~~Belum ada pola untuk kelas (a) dan (b)~~ — **sudah ditutup** oleh
  `scan-twin-drift.mjs` (kelas a: membandingkan ISI dua salinan, bukan sekadar
  keberadaan simbol) dan `scan-duplicated-security.mjs` (kelas b: aturan impor
  data vs impor perilaku). Keduanya bervalidasi-diri.
- **Batas kelas (b) yang tersisa**: detektornya hanya mengenali rumah keamanan
  yang sudah didaftarkan di `RUMAH_KEAMANAN`. Duplikasi logika di luar domain
  keamanan (mis. dua parser URL, dua penyandi entitas) tidak akan tertangkap.
  Generalisasinya menuntut ukuran "berkas B mengimpor primitif A lalu memakai
  ulang pola pemakaian A" — itu analisis graf, bukan leksikal.
- **`scan-twin-drift.mjs` hanya mengelompokkan berdasarkan NAMA DASAR.** Salinan
  yang di-rename saat disalin (mis. `html_sanitizer.ts` -> `icu_sanitizer.ts`)
  akan lolos. Menutupnya butuh perbandingan seluruh-pasangan berbasis sidik jari,
  bukan pengelompokan nama — O(n²) tetapi masih layak untuk 3018 berkas bila
  disaring dulu dengan MinHash.
