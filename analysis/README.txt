ANALISIS & PEMETAAN KODE MONOREPO ANGULAR
==============================================================================

Direktori ini berisi hasil analisis mendalam dan pemetaan kode repositori
angular/angular, beserta perkakas untuk melanjutkan analisisnya.

ISI DIREKTORI
-------------
  README.txt              berkas ini
  ARCHITECTURE-MAP.txt    peta arsitektur: direktori, paket, alur hidup
                          aplikasi dari build hingga hidrasi, konvensi kode
  TASKLIST.txt            DAFTAR TUGAS BERCENTANG per subsistem ([x]/[~]/[ ])
  PROGRESS.txt            progres numerik per area (dihasilkan otomatis)
  CHECKED-FUNCTIONS.txt   LOG SELURUH FUNGSI YANG SUDAH DICEK, berisi nama
                          fungsi + lokasi + penjelasan (dihasilkan otomatis)

  TAINT-TO-SINK.txt       ANALISIS KEAMANAN: penelusuran aliran data tidak
                          tepercaya (source) menuju titik berbahaya (sink),
                          beserta matriks status dan titik audit prioritas
  SINK-INVENTORY.txt      HASIL PEMINDAIAN POLA seluruh repositori: setiap
                          kandidat sink/source beserta file:line dan regex yang
                          menemukannya (dihasilkan otomatis)
  SINK-TRIAGE.txt         VONIS per kelompok temuan: false positive, kode yang
                          tidak terkirim, sink beguard, atau sink berkontrak
  SINK-REACHABILITY.txt   UJI KETERJANGKAUAN tiap sink nyata terhadap tiga
                          gerbang (bundle / execution / source) untuk menyaring
                          sisa false positive

  functions/<area>.txt    INVENTORY LENGKAP seluruh simbol per area.
                          Satu baris per fungsi/kelas/metode:
                              [ ] namaFungsi  (export function) :123
                          Tanda [x] berarti fungsi tersebut sudah dianalisis.

  subsystems/*.txt        CATATAN ANALISIS per subsistem. Ini sumber kebenaran:
                          berisi uraian arsitektur + daftar fungsi yang dipahami
                          dalam format:
                              [x] nama | path/berkas.ts:123 | penjelasan

  tools/build-inventory.mjs   membangun ulang functions/*.txt dari kode
  tools/sync-checklist.mjs    mencentang inventory dari catatan subsistem,
                              lalu menulis ulang CHECKED-FUNCTIONS.txt & PROGRESS.txt
  tools/check-security-schema-sync.mjs
                              memverifikasi dua skema keamanan DOM (compiler vs
                              core) tetap identik -- lihat TAINT-TO-SINK.txt P1
  tools/scan-sinks.mjs        memindai seluruh repo dengan katalog 28 pola
                              sink/source; catatan riset regex ada di kepala
                              berkas -- lihat TAINT-TO-SINK.txt bagian 12

ANGKA CAKUPAN
-------------
  Berkas .ts sumber dipindai   : 2.495 berkas (dari 5.116 berkas .ts termasuk
                                 spec/test yang sengaja dikecualikan)
  Simbol terinventarisasi      : 18.072 (fungsi, arrow, kelas, metode, accessor)
  Area/paket terpetakan        : 26
  Fungsi dianalisis + dijelaskan: 844
  Catatan subsistem            : 15 berkas

CARA MEMAKAI
------------
1. Ingin gambaran besar?         baca ARCHITECTURE-MAP.txt
2. Ingin tahu apa yang sudah/belum dianalisis?  baca TASKLIST.txt & PROGRESS.txt
3. Ingin memahami satu subsistem? baca subsystems/NN-*.txt
4. Mencari fungsi tertentu?       grep di functions/<area>.txt, mis:
       grep -n "refreshView" analysis/functions/core.txt
5. Melihat penjelasan fungsi yang sudah dicek?
       grep -A1 "refreshView" analysis/CHECKED-FUNCTIONS.txt

CARA MELANJUTKAN ANALISIS
-------------------------
1. Pilih item bertanda [ ] atau [~] di TASKLIST.txt.
2. Baca kodenya, lalu buat/lengkapi berkas di analysis/subsystems/ dengan baris
   berformat:
       [x] namaFungsi | packages/x/src/y.ts:123 | penjelasan singkat
   (Nama dan nomor baris harus PERSIS sama dengan entri di functions/<area>.txt;
    untuk metode kelas pakai format Kelas.metode.)
3. Jalankan:
       node analysis/tools/sync-checklist.mjs
   Perkakas akan mencentang inventory, menulis ulang CHECKED-FUNCTIONS.txt, dan
   memperbarui PROGRESS.txt. Entri yang namanya/barisnya tidak cocok akan
   dilaporkan sebagai "tidak cocok" sehingga kesalahan ketik langsung ketahuan.
4. Bila kode sumber berubah (nomor baris bergeser), bangun ulang inventory:
       node analysis/tools/build-inventory.mjs
       node analysis/tools/sync-checklist.mjs
   Centang akan dipulihkan otomatis dari catatan subsistem.

BATAS KEMAMPUAN PEMINDAI
------------------------
`build-inventory.mjs` adalah pemindai berbasis baris (tanpa dependensi, karena
node_modules tidak tersedia di lingkungan ini), bukan parser TypeScript penuh.
Konsekuensinya:
  - Konstanta objek multi-baris yang tanda `=`-nya jauh dari nama variabel bisa
    terlewat (satu kasus diketahui: LINKED_SIGNAL_NODE; dilaporkan di PROGRESS.txt).
  - Overload fungsi tercatat sebagai beberapa entri terpisah (ini justru
    berguna: tiap tanda tangan terlihat).
  - Fungsi bersarang di dalam fungsi ikut tercatat bila dideklarasikan dengan
    `function`.
Bila node_modules tersedia, mengganti pemindai dengan TypeScript compiler API
akan menghilangkan keterbatasan ini tanpa mengubah format berkas keluaran.
