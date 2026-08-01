/**
 * KORPUS REGEX — hasil kumulatif seluruh sesi analisis Angular
 *
 * Tiga kelompok:
 *   1. SINK/SOURCE  — 29 pola dari analysis/tools/scan-sinks.mjs (fase pemindaian)
 *   2. NATIVE       — regex keamanan milik Angular sendiri (korpus rujukan, untuk
 *                     diaudit, bukan untuk memindai)
 *   3. GUARD        — pola BARU untuk kelas cacat yang tidak terjangkau kelompok 1
 *
 * Alasan kelompok 3 ada: seluruh temuan nyata sesi ini (F-01, F-05, F-06) BUKAN
 * sink. Semuanya "garda yang gagal menjaga". Pola sink tidak akan pernah
 * menemukannya, berapa pun banyaknya pola sink yang ditambahkan.
 */

// ============================================================================
// CATATAN RISET REGEX (pelajaran yang harus dipertahankan)
// ============================================================================
export const CATATAN_RISET = [
  '`\\b` RUSAK untuk identifier JS: `$` dan `.` dianggap batas kata, sehingga',
  '   `\\beval\\(` ikut cocok pada `this.eval(` dan `$eval(`. Gunakan lookbehind',
  '   negatif `(?<![\\w$.])` untuk menuntut identifier berdiri sendiri.',
  'Akses bracket butuh pola TERPISAH: `obj["eval"]()` tidak akan pernah cocok',
  '   dengan pola berbasis titik. Setiap sink perlu varian titik + varian bracket.',
  'ripgrep TIDAK mendukung lookbehind (mesin Rust regex). Pemindaian yang',
  '   memakai lookbehind harus dijalankan lewat Node, bukan rg/Grep.',
  'Penugasan harus membedakan `=` dari `==`/`===`: pakai `\\+?=(?!=)`.',
  'Deklarasi TypeScript menimbulkan FP pada pola pemanggilan: `open(name: string)`',
  '   terlihat seperti `open(`. Batasi receiver (mis. window/self/globalThis).',
  'Nama SCREAMING_CASE biasanya konstanta, bukan data ternoda — berguna sebagai',
  '   pola penolakan pada sink dinamis seperti setAttribute(VAR, ...).',
  'Parsing multi-baris tidak boleh per-baris: entri schema yang membentang',
  '   beberapa baris HILANG. Pakai penghitungan kurung, bukan regex per-baris.',
];

// ============================================================================
// 1. SINK / SOURCE — 29 pola (fase pemindaian; ~360 kandidat, ditriase penuh)
// ============================================================================
export const SINKS = [
  {id: 'eval-langsung',          kat: 'eksekusi', re: /(?<![\w$.])eval\s*\(/},
  {id: 'eval-taklangsung',       kat: 'eksekusi', re: /\[\s*['"`]eval['"`]\s*\]\s*\(/},
  {id: 'function-constructor',   kat: 'eksekusi', re: /(?<![\w$.])(?:new\s+)?Function\s*\(/},
  {id: 'timer-string',           kat: 'eksekusi', re: /(?<![\w$.])set(?:Timeout|Interval)\s*\(\s*['"`]/},
  {id: 'import-dinamis',         kat: 'eksekusi', re: /(?<![\w$.])import\s*\(\s*(?!['"`])/},
  {id: 'worker-importscripts',   kat: 'eksekusi', re: /(?<![\w$.])(?:importScripts|Worker)\s*\(/},

  {id: 'innerhtml-tulis',        kat: 'html',     re: /\.\s*(?:inner|outer)HTML\s*\+?=(?!=)/},
  {id: 'innerhtml-bracket',      kat: 'html',     re: /\[\s*['"`](?:inner|outer)HTML['"`]\s*\]\s*\+?=(?!=)/},
  {id: 'insertadjacenthtml',     kat: 'html',     re: /\.\s*insertAdjacentHTML\s*\(/},
  {id: 'document-write',         kat: 'html',     re: /\.\s*write(?:ln)?\s*\(/, require: /document|doc\b|\bwin(?:dow)?\./},
  {id: 'range-fragment',         kat: 'html',     re: /\.\s*createContextualFragment\s*\(/},
  {id: 'domparser',              kat: 'html',     re: /\.\s*parseFromString\s*\(/},
  {id: 'srcdoc-tulis',           kat: 'html',     re: /\.\s*srcdoc\s*\+?=(?!=)/},

  {id: 'src-href-tulis',         kat: 'url',      re: /\.\s*(?:src|href|action|formAction|codebase)\s*\+?=(?!=)/},
  {id: 'setattribute-berbahaya', kat: 'url',      re: /\.\s*setAttribute\s*\(\s*['"`](?:src|href|srcdoc|action|formaction|data|codebase|xlink:href|style|sandbox|allow|csp)['"`]/i},
  {id: 'setattribute-dinamis',   kat: 'url',      re: /\.\s*setAttribute\s*\(\s*(?!['"`])[A-Za-z_$]/, tolak: /\b[A-Z][A-Z0-9_]{2,}\b/},
  {id: 'lokasi-navigasi',        kat: 'url',      re: /(?:location\s*\.\s*(?:href|protocol)\s*\+?=(?!=)|location\s*\.\s*(?:assign|replace)\s*\(|(?:window|self|globalThis|top|parent)\s*\.\s*open\s*\()/},
  {id: 'sw-navigasi',            kat: 'url',      re: /\.\s*(?:openWindow|navigate)\s*\(|scope\s*\.\s*fetch\s*\(/},

  {id: 'trusted-types-policy',   kat: 'tt',       re: /\.\s*create(?:Policy|HTML|Script|ScriptURL)\s*\(/},
  {id: 'bypass-sanitasi',        kat: 'bypass',   re: /(?<![\w$.])bypass(?:Security|Sanitization)Trust\w*\s*\(/},
  {id: 'unwrap-safevalue',       kat: 'bypass',   re: /(?<![\w$.])unwrapSafeValue\s*\(/},
  {id: 'sanitizer-runtime',      kat: 'sanitizer',re: /(?<![\w$.])(?:ɵɵsanitize\w+|_sanitize(?:Html|Url))\s*\(/},
  {id: 'trust-konstan',          kat: 'sanitizer',re: /(?<![\w$.])ɵɵtrustConstant\w+/},

  {id: 'child-process',          kat: 'node',     re: /(?<![\w$.])(?:exec|execSync|execFile|spawn|spawnSync)\s*\(/},
  {id: 'fs-tulis',               kat: 'node',     re: /(?<![\w$.])(?:writeFileSync|writeFile|appendFileSync|rmSync|unlinkSync)\s*\(/},

  {id: 'src-lokasi',             kat: 'sumber',   re: /(?:location\s*\.\s*(?:search|hash|href|pathname)|document\s*\.\s*(?:URL|referrer|documentURI))/},
  {id: 'src-postmessage',        kat: 'sumber',   re: /(?:\.\s*postMessage\s*\(|['"`]message['"`]\s*,\s*(?:this\.)?\w*(?:handler|listener|on\w+))/},
  {id: 'src-storage',            kat: 'sumber',   re: /(?:localStorage|sessionStorage)\s*\.\s*getItem\s*\(|document\s*\.\s*cookie/},
  {id: 'src-windowname',         kat: 'sumber',   re: /window\s*\.\s*name(?!\s*[:=]\s*['"`])/},
];

// ============================================================================
// 2. NATIVE — regex keamanan milik Angular (korpus rujukan untuk diaudit)
// ============================================================================
export const NATIVE = [
  {
    id: 'SAFE_URL_PATTERN',
    lokasi: 'core/src/sanitization/url_sanitizer.ts:38',
    re: /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i,
    audit: 'BLOCKLIST (hanya javascript:). data:/vbscript:/skema tak dikenal LOLOS — ' +
           'disengaja, dikonfirmasi tes (`unknown-scheme:abc` terdaftar valid). ' +
           'Closure yang dirujuk komentar justru memakai ALLOWLIST.',
  },
  {
    id: 'NON_ALPHANUMERIC_REGEXP',
    lokasi: 'core/src/sanitization/html_sanitizer.ts:275',
    re: /([^\#-~ |!])/g,
    audit: 'Rentang #(0x23)-~(0x7E) + spasi + | + !. `"`(0x22) DI LUAR rentang ' +
           'sehingga ikut di-escape -> injeksi atribut tertutup. BENAR.',
  },
  {
    id: 'SURROGATE_PAIR_REGEXP',
    lokasi: 'core/src/sanitization/html_sanitizer.ts:273',
    re: /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
    audit: 'Normalisasi pasangan pengganti sebelum escaping. BENAR.',
  },
  {
    id: 'APP_ID_VALIDATOR',
    lokasi: 'core/src/application/application_tokens.ts:60',
    re: /^[a-zA-Z0-9\-_]+$/,
    audit: 'Allowlist ketat (tolak kutip, <, backslash) — TETAPI hanya didaftarkan ' +
           'di ngDevMode. Lihat F-05.',
  },
  {
    id: 'BINDING_REGEXP',
    lokasi: 'core/src/render3/i18n/i18n_parse.ts:79',
    re: /�(\d+):?\d*�/gi,
    audit: 'Penanda placeholder i18n. Memisahkan atribut berbinding dari statis — ' +
           'menentukan cabang mana yang dipakai pada gate VALID_ATTRS (lihat F-06).',
  },
  {
    id: 'NESTED_ICU',
    lokasi: 'core/src/render3/i18n/i18n_parse.ts:81',
    re: /�(\d+)�/,
    audit: 'Penanda ICU bersarang pada simpul komentar.',
  },
  {
    id: 'VALID_WIDTH_DESCRIPTOR_SRCSET',
    lokasi: 'common/src/directives/ng_optimized_image/ng_optimized_image.ts:66',
    re: /^((\s*\d+w\s*(,|$)){1,})$/,
    audit: 'Membedakan srcset deskriptor-lebar dari deskriptor-kepadatan. Bukan kontrol keamanan.',
  },
];

// ============================================================================
// 3. GUARD — pola BARU: "garda yang gagal menjaga"
//    Kelas ini yang benar-benar membuahkan temuan; pola sink buta terhadapnya.
// ============================================================================
export const GUARDS = [
  {
    id: 'G-01-guard-dev-only',
    hipotesis: 'Validator/garda hanya didaftarkan di ngDevMode, sementara nilai yang ' +
               'dijaganya mencapai sink di produksi.',
    re: /ngDevMode\s*\?\s*\[/,
    temuan: 'F-05 (platform_ref.ts:55, create_application.ts:69)',
    triase: 'Lacak nilai yang divalidasi. Apakah ada sink yang menerimanya saat ngDevMode false?',
  },
  {
    id: 'G-02-gate-bracket',
    hipotesis: 'Gate allowlist memakai akses bracket, bukan hasOwnProperty, sehingga ' +
               'nama Object.prototype menembusnya.',
    re: /(?<!hasOwnProperty\()\b(?:VALID_ATTRS|VALID_ELEMENTS|URI_ATTRS|HTML_ATTRS|ARIA_ATTRS|VOID_ELEMENTS|BLOCK_ELEMENTS|INLINE_ELEMENTS|SKIP_TRAVERSING\w*)\s*\[/,
    temuan: 'F-06 (i18n_parse.ts:841). html_sanitizer.ts:199 juga cocok tetapi AMAN ' +
            'karena sudah dijaga hasOwnProperty di baris 193.',
    triase: 'Cek apakah ada gate hasOwnProperty SEBELUMNYA pada jalur yang sama.',
  },
  {
    id: 'G-03-set-prototipe-hidup',
    hipotesis: 'Set lookup dibangun dengan objek literal {} sehingga rantai prototipe ' +
               'hidup; seharusnya Object.create(null).',
    re: /=\s*\{\}\s*;[\s\S]{0,160}?\[\s*\w+\s*\]\s*=\s*true/,
    temuan: 'html_sanitizer.ts tagSet/merge — akar penyebab G-02.',
    triase: 'Bila set ini pernah diakses dengan bracket sebagai gate, G-02 menjadi hidup.',
    multiline: true,
  },
  {
    id: 'G-04-interpolasi-ke-string-kutip',
    hipotesis: 'Nilai diinterpolasi MENTAH ke dalam literal string berkutip di dalam ' +
               'template literal — konteks skrip/JS, butuh escaping.',
    re: /`[^`]*"\$\{(?!JSON\.stringify)[^}]*\}"/,
    // Tanpa filter konteks pola ini menghasilkan 278 kecocokan, hampir seluruhnya
    // pesan galat berprosa (`... property "${prop}" is not supported`). Yang membuat
    // F-05 berbahaya bukan kutipannya, melainkan bahwa hasilnya menjadi ISI <script>.
    konteks: /createScript|textContent\s*=|\.src\s*=|appendChild|insertBefore|\.after\(|window\.|document\.\w/,
    konteksBaris: 6,
    temuan: 'F-05 (platform-server/src/utils.ts:174 -> `"${appId}",`)',
    triase: 'Apakah string hasilnya menjadi isi <script> / dieksekusi? Bandingkan dengan ' +
            'TransferState.toJson() yang meng-escape `<` untuk alasan ini.',
  },
  {
    id: 'G-05-anggaran-percobaan',
    hipotesis: 'Penghitung percobaan/retry dengan jalur galat yang mungkin tak terjangkau ' +
               '(loop keluar lebih dini daripada yang diasumsikan).',
    re: /(?:mXSSAttempts|\w*[Aa]ttempts|maxRetries|retriesLeft|budget)\s*(?:--|-=|=\s*\d+)/,
    temuan: 'F-01 (html_sanitizer.ts:314-326) — anggaran 5, maksimum nyata 2 iterasi.',
    triase: 'Simulasikan loop. Apakah penghitung bisa mencapai 0? Bila tidak, jalur galat ' +
            'adalah kode mati dan gardanya fail-open.',
  },
  {
    id: 'G-06-assert-dev-only',
    hipotesis: 'Pemeriksaan keamanan di dalam blok ngDevMode; hilang di produksi.',
    re: /if\s*\(\s*(?:typeof\s+ngDevMode[^)]*\|\|\s*)?ngDevMode\s*\)\s*\{/,
    // 160 kecocokan tanpa filter. Sesuai catatan triase, blok dev hanya menarik bila
    // ia MENOLAK nilai (throw/assert), bukan sekadar console.warn.
    konteks: /throw\s+new|assertNot|assertValid|RuntimeError/,
    konteksBaris: 10,
    temuan: 'NgOptimizedImage assertNotBase64Image/assertNotBlobUrl (dikonfirmasi di ' +
            'bundel npm); banyak FP karena mayoritas blok dev hanya untuk pesan galat.',
    triase: 'FP tinggi. Hanya menarik bila blok memuat penolakan NILAI, bukan sekadar warn.',
  },
  {
    id: 'G-07-sinkron-dua-salinan',
    hipotesis: 'Komentar menyuruh menjaga sinkronisasi dengan simbol lain — simbolnya ' +
               'mungkin tidak ada, atau salinannya sudah menyimpang.',
    // Menangkap NAMA SIMBOL pada grup 1 supaya pemindai bisa mentriase sendiri.
    // Tautan dokumentasi markdown (`@see [HTTP Guide](guide/http)`) sengaja tidak
    // dicocokkan — yang dicari adalah rujukan ke simbol KODE.
    re: /(?:[Kk]eep\s+(?:this\s+)?in\s+sync\s+with|[Mm]ust\s+match|[Ss]hould\s+match)\s+`?([A-Za-z_$][\w$]{3,})`?/,
    verifikasiSimbol: true,
    temuan: 'F-02 (SECURITY_SENSITIVE_ELEMENTS tidak ada di seluruh repositori).',
    triase: 'Otomatis: simbol yang dirujuk dicari di seluruh repo. 0 kecocokan lain -> cacat.',
  },
];

// ============================================================================
// 4. GUARD LANJUTAN — kelas yang lahir dari F-07 dan F-08
//    Ditambahkan setelah dua temuan terakhir memperlihatkan bentuk cacat baru
//    yang tidak terjangkau G-01..G-07.
// ============================================================================
export const GUARDS_LANJUTAN = [
  {
    id: 'G-08-tipe-skalar-atau-array',
    hipotesis:
      'Sebuah nilai bertipe `T | T[]`. Tipe itu MENGIZINKAN dua bentuk, tetapi ' +
      'pemakainya kerap hanya menangani satu. Ini akar F-07.',
    // Menangkap `X | X[]` dengan backreference: tipe yang sama muncul sebagai
    // skalar DAN array. Bentuk inilah yang menciptakan cabang tak tertangani.
    re: /:\s*([A-Z]\w+)\s*\|\s*\1\[\]/,
    temuan: 'F-07 — ExtractedAttributeOp.securityContext: SecurityContext | SecurityContext[]',
    triase:
      'Untuk tiap pemakai field ini: apakah ada `Array.isArray` atau padanannya? ' +
      'Bila satu pemakai memeriksanya dan pemakai lain tidak, yang tidak memeriksa ' +
      'itulah cabang yang gagal diam-diam.',
  },
  {
    id: 'G-09-switch-tanpa-default',
    hipotesis:
      '`switch` atas nilai keamanan tanpa cabang `default`. Bila nilainya di luar ' +
      'dugaan (mis. array), TIDAK ADA case yang cocok dan alur lolos tanpa ' +
      'perlakuan apa pun — gagal secara diam.',
    re: /switch\s*\([^)]*\)\s*\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\}/,
    multiline: true,
    tolakCocokan: /\bdefault\s*:/,
    konteks: /SecurityContext|sanitiz|Trusted|securityContext/i,
    konteksBaris: 25,
    temuan: 'F-07 — resolve_i18n_attr_sanitizers.ts:49 switch tanpa default',
    triase:
      'Bandingkan dengan penanganan setara di tempat lain. Bila salinan lain punya ' +
      '`default` yang melempar sementara yang ini tidak, sikap kegagalan keduanya ' +
      'berlawanan (fail-closed vs fail-open).',
  },
  {
    id: 'G-10-pasangan-roundtrip',
    hipotesis:
      'Berkas yang mendefinisikan parse DAN serialize (atau encode/decode, ' +
      'stringify/parse) menjanjikan sifat round-trip yang jarang diuji. Ini akar F-08.',
    berkasPenuh: true,
    re: /\b(?:parse|deserialize|decode)\s*\([^)]*\)\s*[:{]/,
    konteks: /\b(?:serialize|encode|stringify)\s*\(/,
    temuan: 'F-08 — DefaultUrlSerializer.parse/serialize tidak idempoten pada level pohon',
    triase:
      'Uji propertinya, jangan dibaca: apakah f(g(f(x))) == f(x)? Bandingkan HASIL ' +
      'TERSTRUKTUR, bukan hanya string — F-08 stabil pada string tetapi TIDAK pada pohon.',
  },
  {
    id: 'G-11-normalisasi-membuang',
    hipotesis:
      'Normalisasi yang MEMBUANG bagian kosong. Informasi yang dibuang tidak dapat ' +
      'dipulihkan, sehingga dua masukan berbeda menjadi satu keluaran.',
    re: /\.filter\s*\(\s*(?:\(?\s*\w+\s*\)?\s*=>\s*(?:\w+\s*(?:!==?\s*['"]{2}|\.length)|!!?\s*\w+)|Boolean\s*\))/,
    konteks: /url|path|segment|route|normaliz|sanitiz/i,
    konteksBaris: 12,
    temuan: 'terkait F-08 — segmen kosong hilang saat serialisasi',
    triase:
      'Apakah yang dibuang bermakna di hilir? Bila pencocokan rute/otorisasi ' +
      'membedakan "kosong" dari "tidak ada", pembuangan itu menggabungkan dua keadaan.',
  },
];

// ============================================================================
// 5. DESYNC — kelas yang lahir dari F-08
//    Pelajaran F-08 bukan karakter `)`-nya, melainkan dua bentuk yang lebih umum:
//      (a) parser MENDIAMKAN sesuatu alih-alih menolaknya
//      (b) dua lapisan membandingkan string yang sama dengan aturan berbeda
// ============================================================================
export const DESYNC = [
  {
    id: 'G-12-validasi-regex-tanpa-jangkar',
    prafilter: /\.\s*test\s*\(/,
    hipotesis:
      'Regex dipakai memvalidasi tetapi TANPA jangkar `^`/`$`, sehingga ia cocok ' +
      'pada SUBSTRING. Nilai berbahaya lolos asal memuat bagian yang sah di mana pun.',
    // Menangkap literal regex tepat sebelum .test(, lalu MENOLAK yang berjangkar.
    re: /(\/(?:\\.|\[(?:\\.|[^\]])*\]|[^/\\\n])+\/[gimsuy]*)\s*\.\s*test\s*\(/,
    tolakCocokan: /[\^$]/,
    temuan: 'kelas baru — belum ada temuan; APP_ID validator justru CONTOH BENAR (berjangkar)',
    triase:
      'Apakah hasil .test dipakai sebagai KEPUTUSAN (izinkan/tolak)? Bila ya, coba ' +
      'sisipkan bagian sah di tengah nilai jahat dan lihat apakah lolos.',
  },
  {
    id: 'G-13-pemotongan-diam',
    prafilter: /indexOf\s*\(|\.search\s*\(/,
    hipotesis:
      'Parser memotong masukan pada suatu pembatas lalu MELANJUTKAN tanpa galat. ' +
      'Sisa yang dibuang membuat dua masukan berbeda menjadi satu hasil. Akar F-08.',
    re: /\b(?:indexOf|search)\s*\([^)]*\)[^;\n]{0,60}\b(?:slice|substring|substr)\s*\(/,
    konteks: /url|path|segment|route|parse|host|origin|token/i,
    konteksBaris: 10,
    temuan: 'F-08 — `)` memotong sisa URL tanpa galat',
    triase:
      'Bandingkan dua masukan yang berbeda HANYA pada bagian yang dipotong. Bila ' +
      'keduanya menghasilkan keadaan yang sama, lapisan lain yang TIDAK memotong ' +
      'akan berbeda pendapat dengan lapisan ini.',
  },
  {
    id: 'G-14-perbandingan-path-string',
    prafilter: /url|path|href|route|origin/i,
    hipotesis:
      'Keputusan diambil dengan membandingkan path/URL sebagai STRING. Setiap ' +
      'lapisan yang menormalkan berbeda akan mengambil keputusan berbeda.',
    re: /\b(?:url|path|pathname|route|href|origin)\w*\s*(?:===?|!==?)\s*['"`]|\b(?:url|path|pathname|route|href)\w*\s*\.\s*(?:startsWith|endsWith|includes)\s*\(\s*['"`]/i,
    temuan: 'kelas baru — bentuk sisi-aplikasi yang membuat F-08 dapat dieksploitasi',
    triase:
      'Apakah perbandingan ini menjaga sesuatu? Bandingkan aturannya dengan cara ' +
      'Angular memarse path yang sama (pemotongan `)`, peka huruf, `//` runtuh).',
  },
  {
    id: 'G-15-decode-tanpa-penjagaan',
    prafilter: /decodeURI/,
    hipotesis:
      '`decodeURIComponent` MELEMPAR pada persen-encoding cacat (mis. `%`, `%zz`). ' +
      'Tanpa try/catch, satu URL cacat dapat menggagalkan alur — atau ditangani ' +
      'berbeda oleh lapisan lain.',
    re: /(?<![\w$.])decodeURI(?:Component)?\s*\(/,
    tolakKonteks: /try\s*\{|catch\s*\(/,
    konteksBaris: 8,
    temuan: 'kelas baru',
    triase:
      'Picu dengan `%` tunggal. Apakah melempar? Bila ya, apakah galatnya tertangani ' +
      'atau merambat sampai menggagalkan navigasi/render?',
  },
];

// ============================================================================
// 6. RAPUH — kelas yang lahir dari F-09
//    Generalisasi F-09: bukan "decodeURIComponent" secara khusus, melainkan
//    OPERASI YANG MELEMPAR yang dipanggil di JALUR YANG TIDAK BOLEH GAGAL.
//    Interceptor, guard, resolver, dan hook daur hidup adalah jalur seperti itu:
//    satu galat di sana menggagalkan permintaan atau navigasi seluruhnya.
// ============================================================================
export const RAPUH = [
  {
    id: 'G-16-operasi-melempar-tanpa-guard',
    hipotesis:
      'Operasi yang MELEMPAR pada masukan cacat (JSON.parse, atob, new URL, ' +
      'BigInt) dipanggil tanpa try/catch. Bila jalurnya tidak boleh gagal, satu ' +
      'masukan cacat menggagalkan seluruh alur. Bentuk yang sama dengan F-09.',
    prafilter: /JSON\.parse|atob\s*\(|new URL\s*\(|BigInt\s*\(/,
    re: /(?<![\w$.])(?:JSON\s*\.\s*parse|atob|BigInt)\s*\(|new\s+URL\s*\(/,
    tolakKonteks: /try\s*\{|catch\s*[({]/,
    konteksBaris: 8,
    temuan: 'kelas baru; F-09 adalah anggotanya lewat decodeURIComponent',
    triase:
      'Dua pertanyaan: (1) apakah masukannya dapat dipengaruhi dari luar? ' +
      '(2) apakah jalurnya boleh gagal? Bila jawabannya "ya, tidak", itu cacat ' +
      'ketangguhan seperti F-09.',
  },
  {
    id: 'G-17-regexp-dari-data',
    hipotesis:
      '`new RegExp(x)` dengan x BUKAN literal. Dua risiko sekaligus: ReDoS bila ' +
      'x dipengaruhi luar, dan galat sintaks yang melempar bila x cacat.',
    prafilter: /new\s+RegExp/,
    re: /new\s+RegExp\s*\(\s*(?!['"`/])/,
    temuan: 'kelas baru — kandidat terlihat sekilas pada keluaran G-15',
    triase:
      'Lacak asal argumennya. Bila berasal dari URL/cookie/header/terjemahan, uji ' +
      'dengan pola bersarang (mis. `(a+)+$`) untuk ReDoS dan dengan `[` untuk galat sintaks.',
  },
  {
    id: 'G-18-catch-kosong',
    hipotesis:
      'Blok catch KOSONG menelan galat tanpa jejak. Kebalikan F-09: bukan gagal ' +
      'berisik, melainkan gagal DIAM — keadaan rusak berlanjut tanpa ada yang tahu.',
    prafilter: /catch/,
    re: /catch\s*(?:\([^)]*\))?\s*\{\s*\}/,
    temuan: 'kelas baru',
    triase:
      'Apakah yang ditelan adalah kegagalan KONTROL KEAMANAN? Menelan galat parsing ' +
      'biasanya wajar; menelan galat verifikasi/validasi berarti gagal-terbuka.',
  },
];

// ============================================================================
// 7. STRUKTUR — kelas yang belum pernah disasar sama sekali
//    G-02 menutup sisi BACA rantai prototipe. Sisi TULIS belum. Ditambah dua
//    kelas yang tidak terlihat sebagai "kode berbahaya" tetapi merusak asumsi:
//    pelipatan huruf bergantung locale, dan langganan tanpa pembongkaran.
// ============================================================================
export const STRUKTUR = [
  {
    id: 'G-19-tulis-kunci-dinamis',
    hipotesis:
      'Penulisan `obj[k] = v` dengan k dinamis. Bila k dapat bernilai `__proto__` ' +
      'atau `constructor`, penulisan itu mencemari prototipe — bukan sekadar ' +
      'mengisi objek. Ini sisi TULIS dari kelas yang sama dengan F-06.',
    prafilter: /\]\s*=/,
    re: /\b\w+\s*\[\s*(?!['"`\d\]])[A-Za-z_$][\w$.]*\s*\]\s*=(?!=)/,
    // Hanya menarik bila kuncinya benar-benar berasal dari iterasi/masukan,
    // bukan indeks lokal seperti `arr[i] = x`.
    konteks: /Object\.(?:keys|entries|assign)|for\s*\(\s*const\s+\w+\s+(?:of|in)\b|JSON\.parse|merge|copy|\bparams?\b|\battrs?\b/i,
    konteksBaris: 8,
    temuan: 'kelas baru — melengkapi F-06 pada arah tulis',
    triase:
      'Bisakah kuncinya bernilai `__proto__`/`constructor`/`prototype`? Bila objek ' +
      'tujuannya `{}` (bukan `Object.create(null)`/`Map`), coba tulis kunci itu dan ' +
      'periksa apakah `({}).tercemar` menjadi terdefinisi.',
  },
  {
    id: 'G-20-lipat-huruf-locale',
    hipotesis:
      '`toLocaleLowerCase`/`toLocaleUpperCase` BERGANTUNG LOCALE. Pada locale ' +
      'Turki, `"I".toLocaleLowerCase()` menghasilkan `"ı"`, bukan `"i"`. Bila ' +
      'dipakai untuk perbandingan keamanan, hasilnya berbeda per pengguna. ' +
      '(`toLowerCase` biasa AMAN — ia tidak bergantung locale.)',
    prafilter: /toLocale(?:Lower|Upper)Case/,
    re: /\.\s*toLocale(?:Lower|Upper)Case\s*\(/,
    temuan: 'kelas baru',
    triase:
      'Apakah hasilnya dipakai untuk MEMBANDINGKAN (nama tag, atribut, skema, ' +
      'header), bukan untuk menampilkan? Bila ya, ganti ke toLowerCase biasa.',
  },
  {
    id: 'G-21-langganan-tanpa-pembongkaran',
    hipotesis:
      'Berkas berlangganan Observable tanpa satu pun mekanisme pembongkaran. ' +
      'Langganan bertahan setelah komponen hancur: kebocoran memori, dan callback ' +
      'tetap berjalan atas keadaan yang sudah usang.',
    berkasPenuh: true,
    prafilter: /\.subscribe\s*\(/,
    re: /\.\s*subscribe\s*\(/,
    // Penolak diperluas setelah triase: `directive_outputs.ts` sempat lolos karena
    // pembongkarannya bernama `storeListenerCleanup` dan variabelnya huruf kecil,
    // sehingga tidak tertangkap daftar awal. Pelajarannya: mekanisme teardown
    // punya banyak nama; daftar penolak harus mengejar MAKNA, bukan satu idiom.
    tolakKonteks:
      /takeUntilDestroyed|takeUntil\s*\(|\.unsubscribe\s*\(|DestroyRef|[Ss]ubscription|ngOnDestroy|\btake\s*\(\s*1\s*\)|\bfirst\s*\(\s*\)|toSignal|\basync\b|[Cc]leanup|teardown|[Dd]estroy|\.complete\s*\(|onDestroy/,
    temuan: 'kelas baru',
    triase:
      'Apakah langganan ini berumur sama dengan aplikasi (mis. layanan root) atau ' +
      'lebih pendek (komponen/directive)? Hanya yang kedua yang bermasalah.',
  },
];

// ============================================================================
// 8. INKONSISTENSI-DIRI — kelas paling produktif sejauh ini
//    Semua kelas di atas menebak apa yang SEHARUSNYA dilakukan kode. Kelas ini
//    tidak menebak apa pun: ia mengadu kode dengan pernyataan penulisnya
//    sendiri. Kalau sebuah berkas repot-repot mendefinisikan pembungkus aman,
//    berkas itu sudah menyatakan primitifnya butuh dibungkus — dan setiap
//    pemanggilan mentah yang tersisa di berkas yang sama adalah kontradiksi
//    yang bisa dibuktikan, bukan selera.
//    Hasil: G-22 menghasilkan F-11 dengan 1 temuan dari 2037 berkas (0 palsu).
// ============================================================================
export const INKONSISTENSI_DIRI = [
  {
    id: 'G-22-penjaga-menganggur',
    hipotesis:
      'Sebuah modul MENDEFINISIKAN pembungkus aman untuk primitif yang bisa ' +
      'melempar (mis. `tryDecodeURIComponent` membungkus `decodeURIComponent` ' +
      'dengan try/catch) TAPI masih memanggil primitif mentahnya di tempat lain ' +
      'dalam modul yang sama.',
    berkasPenuh: true,
    prafilter: /try\s*\{/,
    // Dipakai berpasangan: `re` menemukan pembungkusnya, `reMentah` menemukan
    // pemanggilan mentah; temuan = keduanya ada di berkas yang sama dan
    // pemanggilan mentah berada DI LUAR badan pembungkus.
    re: /function\s+(\w+)\s*\([^)]*\)[^{]*\{\s*try\s*\{[^}]*(decodeURIComponent|decodeURI\s*\(|JSON\s*\.\s*parse)/,
    reMentah: /(?<![.\w])(?:decodeURIComponent|decodeURI)\s*\(|(?<!\w)JSON\s*\.\s*parse\s*\(/,
    implementasi: 'analysis/regex-corpus/scan-unused-guard.mjs',
    temuan: 'F-11 (common/upgrade/src/params.ts:150,167)',
    triase:
      'Apakah pemanggilan mentah itu memproses masukan runtime (location, cookie, ' +
      'header, respons) atau nilai build-time? Hanya yang pertama yang berdampak. ' +
      'Lalu telusuri ke atas: adakah try/catch di rantai pemanggilnya? Bila tidak, ' +
      'ukur apa yang runtuh — satu fitur, atau seluruh konstruktor.',
  },
];

INKONSISTENSI_DIRI.push(
  {
    id: 'G-28-escape-tak-lengkap',
    hipotesis:
      'Sebuah fungsi ENCODER mengescape sebagian karakter struktural dan MELEPAS ' +
      'escape sebagian yang lain, padahal parser di berkas yang sama memperlakukan ' +
      'keduanya sebagai struktural. Bentuk yang dicari: rantai .replace() yang ' +
      'mengubah %XX kembali menjadi karakter literal, tepat di sebelah .replace() ' +
      'yang melakukan kebalikannya.',
    berkasPenuh: true,
    prafilter: /replace\(\/%[0-9A-Fa-f]{2}\/g?i?\s*,\s*['"]/,
    re: /\.replace\(\/%([0-9A-Fa-f]{2})\/g?i?,\s*['"](.)['"]\)/,
    implementasi: 'analysis/tools/router-colon/probe.mjs (ditemukan lewat penelusuran, bukan pemindai)',
    temuan:
      'F-21. router/src/url_tree.ts:513 encodeUriString mengembalikan %3A menjadi ":", ' +
      'sedangkan encodeUriSegment:548 — memanggilnya — mengescape "(" dan ")" JUSTRU ' +
      'karena keduanya struktural. Parser di berkas yang sama (parseParens) memakai ' +
      '":" sebagai pembatas nama outlet. Terkonfirmasi runtime pada artefak npm.',
    triase:
      'Pertanyaan yang memisahkan temuan dari desain: karakter yang dilepas escape-nya ' +
      'itu, apakah GRAMATIKA MILIK PROYEK INI SENDIRI memberinya arti? Bukan apakah ' +
      'RFC mengizinkannya. ":" memang sah dalam path menurut WHATWG — dan itulah ' +
      'alasan escape-nya dilepas — tetapi router punya gramatika sendiri di atasnya. ' +
      'Ukurannya adalah parser milik proyek itu, bukan spesifikasi luar.',
    pelajaran:
      'Sifat yang diuji harus SEMPIT. Uji pertama saya ("pohon hasil round-trip ' +
      'identik") ikut menjatuhkan kasus tanpa titik dua sama sekali, karena grup ' +
      'kurung berisi satu anak primer memang diratakan. Sifat yang benar adalah ' +
      '"tidak ada NAMA OUTLET BARU" — itu memisahkan cacat dari normalisasi.',
  },
  {
    id: 'G-30-kewajiban-sinkron',
    hipotesis:
      'Bila kode SENDIRI menyatakan "jaga agar tetap sinkron dengan X", maka ada ' +
      'dua tempat yang harus sepakat. Ketidaksepakatan di antara keduanya adalah ' +
      'cacat LOGIKA — dan orakelnya datang dari kodenya sendiri, bukan dari selera ' +
      'saya. Rujukan yang MENGGANTUNG (menunjuk sesuatu yang tidak ada) lebih buruk ' +
      'lagi: kewajibannya tidak bisa dijalankan sama sekali.',
    berkasPenuh: true,
    prafilter: /keep\s+\w*\s*in\s+sync|is\s+an?\s+(?:exact\s+)?copy\s+of|mirrors?\s+the/i,
    implementasi: 'analysis/regex-corpus/scan-declared-sync.mjs',
    temuan:
      '3630 berkas. 4 rujukan menggantung (2 di antaranya F-02 yang sudah dikenal, ' +
      '1 derau "`if`", 1 BARU: F-23 `InjectFlags` "above" di core/src/di/interface/' +
      'injector.ts yang enumnya sudah tidak ada di berkas itu). 2 pasangan berkas ' +
      'yang dinyatakan harus sepakat — keduanya diperiksa dan SEPAKAT.',
    mengapaBerbeda:
      'INI SATU-SATUNYA POLA SAYA YANG BUKAN PENCOCOK BENTUK. G-22..G-29 semuanya ' +
      'sintaktis: mereka hanya bisa melihat cacat yang punya tanda tangan teks. ' +
      'Cacat logika tidak punya. G-30 memeriksa KESEPAKATAN, sehingga ia bisa ' +
      'melihat penyimpangan berapa pun bentuknya. Ini jawaban langsung atas ' +
      'pertanyaan "apakah korpus saya terlalu ketat untuk cacat logika".',
    triase:
      'Untuk tiap pasangan, tanyakan apa TEPATNYA yang harus sepakat — nilai ' +
      'konstanta, daftar anggota, atau urutan cabang — lalu bandingkan HAL ITU. ' +
      'F-23 menunjukkan mengapa perbandingan TEKSTUAL tidak cukup: kedua enum ' +
      'menulis nilai yang sama dalam notasi berbeda (1 << 3 vs 0b1000), sehingga ' +
      'diff teks akan menyatakan mereka berbeda padahal sepakat.',
    pelajaran:
      'Jalan pertama pemindai ini mengambil kata BerhurufBesar pertama dalam prosa ' +
      'dan menghasilkan 8 "temuan", separuhnya kalimat biasa: "Security" dari ' +
      '"DOM Security Schema", "Mirrors" dari "Mirrors the plugin interface", ' +
      '"Array" dari "the Array.isArray check". Sekarang hanya pengenal yang ' +
      'DITANDAI sebagai kode (dalam backtick) atau KONSTANTA_HURUF_BESAR yang ' +
      'diterima. Turun ke 4, dan yang tersisa nyata.',
  },
  {
    id: 'G-29-penjaga-satu-arah',
    hipotesis:
      'Sebuah bahaya dijaga di sisi MASUK sebuah sistem tetapi tidak di sisi ' +
      'KELUARnya. Petunjuk terkuatnya adalah komentar penjaga itu sendiri: bila ' +
      'ia menjelaskan MENGAPA sesuatu berbahaya, penjelasan itu berlaku juga ' +
      'bagi setiap tempat lain yang bisa menghasilkan bentuk yang sama.',
    berkasPenuh: true,
    prafilter: /protocol-relative|SecurityError|different origin/i,
    implementasi: 'analysis/tools/protocol-relative/probe.mjs',
    temuan:
      'F-22. router/src/url_tree.ts parseRootSegment membuang garis miring awal ' +
      'dan komentarnya menyebut "protocol-relative ... different origin ... ' +
      'SecurityError". Sisi keluarnya — common/src/location/util.ts joinWithSlash, ' +
      'yang merupakan SELURUH isi prepareExternalUrl — meloloskan "//" saat ' +
      'baseHref "" atau "/". Diukur di Chromium: href jadi lintas origin, ' +
      'pushState melempar SecurityError.',
    triase:
      'Hitung ADA BERAPA TEMPAT bahaya itu bisa muncul, lalu berapa yang dijaga. ' +
      'Satu dari dua masih bisa disengaja. F-22 ternyata dua dari tiga dijaga ' +
      '(parse DAN jalur commands), dan justru itu yang membuat tempat ketiga ' +
      'layak dicatat — pertahanan yang timpang, bukan keputusan desain.',
    pelajaran:
      'Kontrol positif kadang lebih menentukan daripada kontrol negatif. Di sini ' +
      'yang membuat catatannya bermakna bukan "sisi keluar bocor", melainkan ' +
      '"dua sisi lain menutupnya". Dan pengukuran jalur normal (commands) yang ' +
      'ternyata AMAN adalah yang menahan saya menuliskannya sebagai kerentanan.',
  },
  {
    id: 'G-23-default-bertentangan',
    hipotesis:
      'SATU opsi diberi default BOOLEAN yang berbeda di dua tempat. Satu cabang ' +
      'fail-open, cabang lain fail-closed, untuk opsi yang sama. Paling banyak ' +
      'satu di antaranya benar.',
    berkasPenuh: true,
    prafilter: /\?\?\s*(?:true|false)|\|\|\s*(?:true|false)/,
    re: /([\w$]+)\s*(?:\?\?|\|\|)\s*(true|false)\b/,
    implementasi: 'analysis/regex-corpus/scan-conflicting-defaults.mjs',
    temuan:
      '1 kandidat (cacheOpaqueResponses di service-worker/worker/src/data.ts:353 vs :399) ' +
      '-> TERNYATA DISENGAJA dan terdokumentasi eksplisit dalam tabel di config.md:304-309. ' +
      'Negatif bersih.',
    triase:
      'Batasi ke default BOOLEAN saja — default string seperti "OK" vs "Unknown Error" ' +
      'adalah pesan, bukan kebijakan. Buang baris komentar; tanpa itu keluarannya ' +
      "didominasi `region='...'` di JSDoc. Lalu: apakah dokumentasi menyebut kedua " +
      'default itu? Kalau ya, itu desain, bukan cacat.',
  },
  {
    id: 'G-24-konfigurasi-lebih-sempit-dari-perilaku',
    hipotesis:
      'Tipe konfigurasi PUBLIK menyempitkan tipe internal dengan `Pick<T, ...>`, ' +
      'tetapi implementasinya membangun `T` penuh dan mengisi properti DI LUAR ' +
      'daftar itu. Framework menentukan perilaku yang aplikasi tidak punya cara ' +
      'sah untuk mengubahnya.',
    berkasPenuh: true,
    prafilter: /Pick</,
    re: /Pick<\s*([A-Za-z_$][\w$]*)\s*,\s*([^>]+)>/,
    // Dipakai berpasangan dengan pencarian pembangunan `): T {` / `: T = {`
    // lalu membandingkan kunci literalnya dengan daftar Pick.
    implementasi: 'analysis/regex-corpus/scan-narrow-config.mjs',
    temuan: 'F-13 (ignoreVary di service-worker/config/src/generator.ts:205)',
    triase:
      'Apakah properti yang tidak dapat dipilih itu MENONAKTIFKAN mekanisme yang ' +
      'dinyatakan pihak lain — server, peramban, atau spesifikasi? Kalau ya, ' +
      'aplikasi tidak punya jalan keluar yang sah dan itu jauh lebih berat ' +
      'daripada sekadar default yang kurang tepat. Sisanya (ProgramInfo di ' +
      'schematics) build-time, tidak menarik.',
  },
);

// ============================================================================
// 9. PELAJARAN LINTAS-AREA
//    Setelah G-22..G-24 habis, area baru dibuka BUKAN dengan regex baru,
//    melainkan dengan memindahkan KELAS cacat yang sudah terbukti membayar.
//    F-12 lahir dari "perangkaian anchor regex"; kelas yang sama, dipindahkan
//    ke @angular/forms, langsung menghasilkan F-14 (`^`+pola+`$` tanpa grup
//    non-capturing -> alternasi lolos anchor).
//    Yang berpindah antar-paket bukan polanya, melainkan pertanyaannya.
// ============================================================================
export const KELAS_BERPINDAH = [
  {
    id: 'K-01-perangkaian-anchor',
    pertanyaan:
      'Di mana lagi kode merangkai `^` dan `$` (atau pembatas lain) ke sebuah ' +
      'pola yang dipasok pengguna, dengan perangkaian string biasa?',
    prafilter: /['"`]\^['"`]|\+\s*['"`]\$['"`]|\^\$\{/,
    re: /(['"`]\^['"`]\s*\+|\+\s*['"`]\$['"`]|`\^\$\{[^}]+\}\$`)/,
    temuan: 'F-12 (ngsw, anchor HILANG di 2 dari 5 tempat), F-14 (forms, anchor ADA tapi tidak mengikat)',
    triase:
      'Dua kegagalan yang berlawanan dari satu kelas: anchor bisa HILANG, atau ' +
      'ADA tetapi tidak mengikat karena presedensi `|`. Selalu tanyakan keduanya. ' +
      'Lalu cari ACUAN eksternal — spesifikasi atau perilaku platform — supaya ' +
      '"seharusnya" tidak bergantung pada selera.',
  },
];

INKONSISTENSI_DIRI.push({
  id: 'G-27-baca-rantai-prototipe',
  hipotesis:
    'Sebuah PETA dideklarasikan sebagai objek literal lalu dibaca dengan kunci ' +
    'DINAMIS. Objek literal mewarisi seluruh anggota Object.prototype, sehingga ' +
    'kunci seperti toString/constructor/valueOf/__proto__ mengembalikan nilai ' +
    'bawaan yang truthy — dan setiap gerbang berbentuk M[k], M[k] || d, atau ' +
    'M[k] ?? d ikut bocor.',
  berkasPenuh: true,
  prafilter: /(?:const|let|var)\s+[A-Za-z_$][\w$]*\s*(?::[^=\n]*)?=\s*\{/,
  re: /(?<![\w$.])([A-Z][\w$]*)\s*\[\s*(?!['"`\d])[A-Za-z_$][\w$.]*\s*\]/,
  implementasi: 'analysis/regex-corpus/scan-proto-read.mjs',
  temuan: 'F-06 (VALID_ATTRS) dan F-17 (META_KEYS_MAP) — keduanya dipakai sebagai jangkar validasi-diri',
  triase:
    'Tiga pertanyaan, berurutan: (1) bisakah kuncinya bernilai anggota ' +
    'Object.prototype? (2) dari mana kuncinya berasal — masukan runtime atau ' +
    'nilai build-time? (3) apa akibat nilai bawaan yang truthy: gerbang ' +
    'terbuka, atau sekadar lemparan? Pertanyaan (2) yang paling sering ' +
    'menggugurkan kandidat.',
  pelajaran:
    'Jalan pertama pemindai ini BUTA terhadap F-06 dan validasi-dirilah yang ' +
    'menangkapnya. Dua celah: peta yang dibangun fungsi (`merge(...)`) bukan ' +
    'literal, dan peta yang dideklarasikan di berkas LAIN lalu diimpor. ' +
    'Pemindai satu-berkas akan selalu melewatkan kelas kedua itu.',
  celahYangMasihAda:
    'F-20 (TransferState.store) TIDAK ditemukan pemindai ini, dan itu ditemukan ' +
    'lewat penelusuran fitur. Sebabnya: `store` adalah PROPERTI KELAS ' +
    '(`store: Record<string, unknown> = {}`), bukan `const NAME = {`. Bentuk ' +
    'ketiga yang belum tercakup. Pelajaran yang lebih besar: pemindai menutup ' +
    'BENTUK yang sudah dikenal; penelusuran fitur menemukan bentuk yang belum. ' +
    'Keduanya diperlukan, dan yang kedua yang menghasilkan bentuk baru untuk ' +
    'diberikan kembali ke pemindai.',
  celahItuKiniDitutup:
    'Langkah 3 ditambahkan: peta PROPERTI KELAS yang dibaca lewat `this.NAMA[k]`. ' +
    'Validasi-diri sekarang menuntut F-06, F-17, DAN F-20, plus satu kontrol ' +
    'negatif dari berkas yang sama (`onSerializeCallbacks`, yang memang dijaga ' +
    'di transfer_state.ts:134 dan karena itu TIDAK boleh terlapor). ' +
    'Dua kali validasi-diri itu menolak versi pemindai saya: uji penjaga ' +
    'tingkat-BERKAS menyatakan transfer_state.ts aman (ada `hasOwnProperty` di ' +
    'baris 111), lalu uji tingkat-PETA masih menyatakan `this.store` aman ' +
    '(penjaganya menyebut peta yang benar — hanya di metode yang berbeda). ' +
    'Keduanya membutakan pemindai terhadap cacatnya sendiri.',
  pelajaranPenjaga:
    'Ruang lingkup penjaga adalah BATAS METODE, bukan jarak baris. Jendela ' +
    '"N baris ke atas" gagal di dua arah sekaligus: sempit -> placeholder.ts:158 ' +
    'terlapor padahal penjaganya ada di :152, dihoist ke boolean lalu dipakai ' +
    'untuk keluar lebih awal; lebar -> F-20 tertelan karena `hasKey()` hanya ' +
    'dua puluh baris dari `get()`. Yang membedakan keduanya bukan jarak: ' +
    'penjaga placeholder.ts ada DI DALAM metode yang sama, penjaga F-20 tidak.',
});

export const SEMUA = {
  CATATAN_RISET, SINKS, NATIVE, GUARDS, GUARDS_LANJUTAN, DESYNC, RAPUH, STRUKTUR,
  INKONSISTENSI_DIRI, KELAS_BERPINDAH,
};
