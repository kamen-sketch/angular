/**
 * PERINGKAT EKSPLOITABILITAS DAN TIER.
 *
 * Sampai sekarang temuan diurutkan menurut urutan penemuan, dan pemindai
 * mencetak beberapa kecocokan pertama per pola. Akibatnya kandidat bernilai
 * tinggi bisa tenggelam di bawah kandidat yang kebetulan ditemukan lebih dulu.
 *
 * Berkas ini memberi setiap temuan skor dari atribut ANCAMAN, bukan dari
 * bentuk sintaksisnya, lalu mengelompokkannya ke tier. Atributnya dinyatakan
 * satu per satu supaya bisa dibantah per butir — bukan satu angka yang harus
 * dipercaya begitu saja.
 *
 * Jalankan: node analysis/regex-corpus/triage-rank.mjs
 */

/** Bobot. Positif menaikkan peluang menjadi temuan besar; negatif menurunkan. */
export const BOBOT = {
  lintasPrincipal: [4, 'melintasi batas principal/pengguna'],
  kredensial: [4, 'menyangkut kredensial, otorisasi, atau respons privat'],
  stateLintasRequest: [3, 'state dipakai ulang lintas-request'],
  konfigurasiDefault: [3, 'konfigurasi default terdampak'],
  serverTidakDitanya: [3, 'server tidak menerima request / tidak sempat memverifikasi'],
  masukanPenyerang: [2, 'masukan dikendalikan penyerang lewat jaringan'],
  invarianPlatform: [2, 'melanggar invarian peramban/platform'],
  tanpaSalahPakai: [2, 'tidak butuh developer salah pakai'],
  paketLuas: [1, 'paket runtime berjangkauan luas'],
  hanyaBuildTime: [-3, 'hanya build-time'],
  butuhApiTakAman: [-3, 'butuh API tak-aman yang eksplisit'],
  hanyaCrashLokal: [-2, 'hanya merusak satu komponen secara lokal'],
};

/**
 * Atribut per temuan. Ini PENILAIAN saya, dan sengaja dieja supaya tiap butir
 * bisa dibantah sendiri-sendiri. Yang tidak disebut dianggap tidak berlaku.
 */
export const TEMUAN = [
  {id: 'F-13', judul: 'ngsw ignoreVary:true tidak diekspos', a: ['lintasPrincipal', 'kredensial', 'stateLintasRequest', 'serverTidakDitanya', 'tanpaSalahPakai', 'paketLuas']},
  {id: 'F-12', judul: 'pola dataGroup dicocokkan sbg substring URL absolut', a: ['lintasPrincipal', 'kredensial', 'stateLintasRequest', 'serverTidakDitanya', 'masukanPenyerang', 'paketLuas']},
  {id: 'F-08', judul: 'route confusion: ")" vs "/" menjalankan guard berbeda', a: ['kredensial', 'masukanPenyerang', 'tanpaSalahPakai', 'paketLuas']},
  {id: 'F-01', judul: 'loop proteksi mXSS berhenti sebelum fixed point', a: ['invarianPlatform', 'masukanPenyerang', 'tanpaSalahPakai', 'paketLuas']},
  {id: 'F-03', judul: 'srcset diizinkan sanitizer tapi tidak disanitasi sbg URL', a: ['invarianPlatform', 'masukanPenyerang', 'tanpaSalahPakai', 'paketLuas']},
  {id: 'F-04', judul: 'pembacaan firstChild melewati pemeriksaan DOM clobbering', a: ['invarianPlatform', 'masukanPenyerang', 'tanpaSalahPakai', 'paketLuas']},
  {id: 'F-06', judul: 'gate allowlist i18n ditembus rantai prototipe', a: ['masukanPenyerang', 'tanpaSalahPakai', 'paketLuas']},
  {id: 'F-22', judul: 'protocol-relative "//host" tidak dijaga di sisi keluar', a: ['lintasPrincipal', 'invarianPlatform', 'paketLuas']},
  {id: 'F-05', judul: 'validator APP_ID hanya ngDevMode', a: ['konfigurasiDefault', 'paketLuas']},
  {id: 'F-21', judul: "encodeUriSegment melepas escape ':'", a: ['paketLuas', 'masukanPenyerang']},
  {id: 'F-09', judul: 'cookie XSRF cacat menggagalkan semua request mutasi', a: ['tanpaSalahPakai', 'paketLuas', 'hanyaCrashLokal']},
  {id: 'F-19', judul: 'APP_ID mentah ke selektor CSS', a: ['paketLuas']},
  {id: 'F-17', judul: 'META_KEYS_MAP[prop] || prop', a: ['paketLuas']},
  {id: 'F-07', judul: 'salinan sanitizer beda perlakuan konteks ARRAY', a: ['paketLuas']},
  {id: 'F-11', judul: 'AngularJSUrlCodec: pembungkus aman tidak dipakai', a: ['paketLuas', 'hanyaCrashLokal']},
  {id: 'F-10', judul: 'HttpParams melempar URIError pada %-cacat', a: ['paketLuas', 'hanyaCrashLokal']},
  {id: 'F-20', judul: 'TransferState.get() baca rantai prototipe', a: ['paketLuas']},
  {id: 'F-14', judul: 'Validators.pattern membungkus tanpa grup', a: ['paketLuas']},
  {id: 'F-18', judul: 'SELF_TOKEN_REGEX kehilangan backslash', a: ['paketLuas']},
  {id: 'F-02', judul: 'rujukan SECURITY_SENSITIVE_ELEMENTS menggantung', a: ['hanyaBuildTime']},
  {id: 'F-23', judul: 'rujukan InjectFlags "above" menggantung', a: ['hanyaBuildTime']},
];

export function skor(t) {
  return t.a.reduce((s, k) => s + BOBOT[k][0], 0);
}
export function tier(s) {
  if (s >= 12) return 'A  principal/state/origin/security-boundary';
  if (s >= 6) return 'B  parser, sanitizer, invarian konfigurasi';
  if (s >= 2) return 'C  ketahanan / DoS';
  return 'D  kualitas kode';
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const line = '='.repeat(78);
  console.log(line);
  console.log('PERINGKAT EKSPLOITABILITAS — diurutkan menurut ancaman, bukan urutan temuan');
  console.log(line);
  const urut = [...TEMUAN].sort((x, y) => skor(y) - skor(x));
  let tierKini = null;
  for (const t of urut) {
    const s = skor(t);
    const tr = tier(s);
    if (tr !== tierKini) {
      console.log(`\n--- TIER ${tr} ---`);
      tierKini = tr;
    }
    console.log(`  ${String(s).padStart(3)}  ${t.id}  ${t.judul}`);
    console.log(`        ${t.a.map((k) => BOBOT[k][1]).join('; ')}`);
  }

  console.log('\n' + line);
  console.log('YANG DIKATAKAN URUTAN INI');
  console.log(line);
  const A = urut.filter((t) => tier(skor(t)).startsWith('A'));
  console.log(`
Tier A hanya berisi ${A.length}: ${A.map((t) => t.id).join(', ')}.
Keduanya lahir dari PENELUSURAN ngsw, bukan dari pemindai mana pun — dan
keduanya punya bentuk yang sama: ada Alice dan Bob, ada state bersama, dan
server tidak pernah ditanya untuk permintaan Bob.

Tidak satu pun pola G-xx saya dirancang untuk mencari bentuk itu. Seluruh
korpus mencari cacat LOKAL yang bentuknya sudah dikenal, sedangkan yang
mengisi tier A adalah INTERAKSI lintas-principal. Itu penjelasan paling
sederhana mengapa pemindai hanya melahirkan tiga kelas baru dari 21 temuan.

Konsekuensi praktis untuk pekerjaan berikutnya: menambah pola bergaya G-xx
akan terus mengisi tier C dan D. Untuk mengisi tier A dibutuhkan harness
lintas-principal — dua identitas, satu state bersama, lalu tanyakan apakah
respons milik yang satu bisa sampai ke yang lain.
`);
}
