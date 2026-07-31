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

export const SEMUA = {CATATAN_RISET, SINKS, NATIVE, GUARDS, GUARDS_LANJUTAN};
