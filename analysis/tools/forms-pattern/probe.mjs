/**
 * F-14 — `Validators.pattern(string)` membungkus pola dengan `^` dan `$` tanpa
 * grup non-capturing, sehingga alternasi tingkat atas LOLOS dari anchor.
 *
 * BERKAS  packages/forms/src/validators.ts:569-596
 *
 *     if (pattern.charAt(0) !== '^') regexStr += '^';
 *     regexStr += pattern;
 *     if (pattern.charAt(pattern.length - 1) !== '$') regexStr += '$';
 *     regex = new RegExp(regexStr);
 *
 * `|` punya presedensi TERENDAH dalam regex. `^cat|dog$` berarti
 * `(^cat)|(dog$)`, bukan `^(cat|dog)$`. Jadi pola yang dimaksudkan sebagai
 * daftar nilai yang diizinkan berubah menjadi "berawalan cat ATAU berakhiran
 * dog".
 *
 * Cacat kedua di fungsi yang sama: pemeriksaan anchor memakai `charAt`, bukan
 * parsing. Pola yang berakhir dengan `$` YANG TER-ESCAPE (`\$`, artinya karakter
 * dolar literal) dianggap sudah punya anchor akhir, sehingga `$` tidak
 * ditambahkan sama sekali.
 *
 * Dokumentasi (validators.ts:407-410) menyatakan mekanismenya — "the `^`
 * character is prepended and the `$` character is appended" — tetapi maksud yang
 * dinyatakan contohnya jelas pencocokan SELURUH string
 * (`'[a-zA-Z ]*'` -> `'^[a-zA-Z ]*$'`). Tidak ada peringatan bahwa alternasi
 * membatalkan itu.
 *
 * Harness ini mengimpor `Validators` dari artefak npm yang dikirim.
 *
 * Jalankan: node analysis/tools/forms-pattern/probe.mjs <path-node_modules>
 */
import {readFileSync} from 'fs';
import {join} from 'path';
import {pathToFileURL} from 'url';

const nm = process.argv[2];
if (!nm) {
  console.error('pakai: node probe.mjs <path-ke-node_modules>');
  process.exit(2);
}
const M = (p) => pathToFileURL(join(nm, p)).href;
await import(M('@angular/compiler/fesm2022/compiler.mjs'));
const pkg = JSON.parse(readFileSync(join(nm, '@angular/forms/package.json'), 'utf8'));
const {Validators, FormControl} = await import(M('@angular/forms/fesm2022/forms.mjs'));

/** true = nilai DITERIMA validator (tidak ada error). */
const accepts = (pattern, value) => Validators.pattern(pattern)(new FormControl(value)) === null;

/** Perbaikan satu baris yang diusulkan: bungkus dengan grup non-capturing. */
const acceptsFixed = (pattern, value) => new RegExp(`^(?:${pattern})$`).test(value);

const line = '='.repeat(78);
console.log(line);
console.log(`F-14 — Validators.pattern, @angular/forms@${pkg.version} (artefak npm)`);
console.log(line);

// ---------------------------------------------------------------------------
console.log('\n[1] KONTROL POSITIF — validatornya memang bekerja untuk pola sederhana');
const control = [
  ['[a-z]+', 'abc', true],
  ['[a-z]+', '123', false],
  ['[a-z]+', 'abc123', false],
  ['[a-zA-Z ]*', 'aaAA', true],
  ['[a-zA-Z ]*', 'aaa0', false],
];
let controlOk = true;
for (const [p, v, expected] of control) {
  const got = accepts(p, v);
  if (got !== expected) controlOk = false;
  console.log(
    `    ${got === expected ? 'ok ' : 'X  '} pattern(${JSON.stringify(p)}) terhadap ` +
      `${JSON.stringify(v)} -> ${got ? 'DITERIMA' : 'ditolak'}`,
  );
}
console.log(`    -> pembanding berfungsi: ${controlOk}`);

// ---------------------------------------------------------------------------
console.log('\n[2] CACAT A — alternasi tingkat atas lolos dari anchor');
console.log('    Maksud developer: nilai HARUS persis "cat" atau "dog".\n');
const alternation = [
  ['cat|dog', 'cat', 'nilai sah'],
  ['cat|dog', 'dog', 'nilai sah'],
  ['cat|dog', 'cat-and-a-lot-more', 'BERAWALAN cat'],
  ['cat|dog', 'a-very-evil-dog', 'BERAKHIRAN dog'],
  ['cat|dog', 'catastrophe', 'BERAWALAN cat'],
  ['cat|dog', 'bulldog', 'BERAKHIRAN dog'],
  ['cat|dog', 'lizard', 'seharusnya ditolak'],
];
const bypassA = [];
for (const [p, v, note] of alternation) {
  const angular = accepts(p, v);
  const fixed = acceptsFixed(p, v);
  const isBypass = angular && !fixed;
  if (isBypass) bypassA.push({p, v});
  console.log(
    `    ${isBypass ? '>>> BYPASS' : '          '} ${JSON.stringify(v).padEnd(24)} ` +
      `Angular=${angular ? 'DITERIMA' : 'ditolak '}  ^(?:...)$=${fixed ? 'DITERIMA' : 'ditolak '}  ${note}`,
  );
}
console.log(`\n    regex yang benar-benar dibangun Angular: ${JSON.stringify(bangun('cat|dog'))}`);
console.log(`    yang dimaksud developer                : ${JSON.stringify('^(?:cat|dog)$')}`);

// ---------------------------------------------------------------------------
console.log('\n[3] CACAT B — pemeriksaan anchor memakai charAt, bukan parsing');
console.log('    Pola yang berakhir dengan dolar TER-ESCAPE dikira sudah ber-anchor.\n');
const escaped = [
  ['[0-9]+\\$', '12$', 'nilai sah — harga dalam dolar'],
  ['[0-9]+\\$', '12$ lalu apa pun', 'ekor tidak dibatasi'],
  ['[0-9]+\\$', '12$<img src=x onerror=alert(1)>', 'ekor tidak dibatasi'],
];
const bypassB = [];
for (const [p, v, note] of escaped) {
  const angular = accepts(p, v);
  const fixed = acceptsFixed(p, v);
  const isBypass = angular && !fixed;
  if (isBypass) bypassB.push({p, v});
  console.log(
    `    ${isBypass ? '>>> BYPASS' : '          '} ${JSON.stringify(v).padEnd(34)} ` +
      `Angular=${angular ? 'DITERIMA' : 'ditolak '}  ^(?:...)$=${fixed ? 'DITERIMA' : 'ditolak '}  ${note}`,
  );
}
console.log(`\n    regex yang dibangun Angular: ${JSON.stringify(bangun('[0-9]+\\$'))}   <- tanpa anchor akhir`);

// ---------------------------------------------------------------------------
console.log('\n[4] KONTROL NEGATIF — bukan sekadar "semuanya diterima"');
const negative = [
  ['cat|dog', 'lizard'],
  ['[a-z]+', 'ABC'],
  ['[0-9]+\\$', 'abc$'],
  ['(cat|dog)', 'a-very-evil-dog'],
];
for (const [p, v] of negative) {
  console.log(
    `    ${accepts(p, v) ? 'X  DITERIMA' : 'ok ditolak '} pattern(${JSON.stringify(p)}) ` +
      `terhadap ${JSON.stringify(v)}`,
  );
}
console.log('    -> perhatikan baris terakhir: developer yang KEBETULAN menulis');
console.log('       tanda kurung sendiri tidak terdampak. Pemicunya spesifik.');

// ---------------------------------------------------------------------------
console.log('\n[5] APAKAH `$` COCOK SEBELUM NEWLINE DI AKHIR? (diuji, tidak diasumsikan)');
for (const v of ['abc\n', 'abc\r\n', 'abc ']) {
  console.log(
    `    ${JSON.stringify(v).padEnd(12)} pattern('[a-z]+') -> ` +
      `${accepts('[a-z]+', v) ? 'DITERIMA' : 'ditolak'}`,
  );
}
console.log('    (Di JavaScript, tanpa flag `m`, `$` hanya cocok di akhir masukan —');
console.log('     berbeda dari Python/Perl. Diuji di sini, bukan diandaikan.)');

/** Membangun ulang regexStr persis seperti validators.ts:573-582. */
function bangun(pattern) {
  let s = '';
  if (pattern.charAt(0) !== '^') s += '^';
  s += pattern;
  if (pattern.charAt(pattern.length - 1) !== '$') s += '$';
  return s;
}

console.log('\n' + line);
console.log(`Bypass alternasi: ${bypassA.length}   bypass dolar-ter-escape: ${bypassB.length}`);
const confirmed = controlOk && bypassA.length > 0 && bypassB.length > 0;
if (confirmed) {
  console.log('TERKONFIRMASI terhadap artefak npm. Perbaikannya satu baris:');
  console.log("    regexStr = `^(?:${pattern})$`   (dan buang pemeriksaan charAt)");
} else {
  console.log('Tidak terkonfirmasi.');
}
console.log(line);
process.exit(confirmed ? 0 : 1);
