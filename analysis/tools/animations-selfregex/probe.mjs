/**
 * F-18 — SELF_TOKEN_REGEX kehilangan backslash: "s*" bukan kelas whitespace.
 *
 * BERKAS  packages/animations/browser/src/dsl/animation_ast_builder.ts
 *
 *     const SELF_TOKEN = ':self';                                       // :80
 *     const SELF_TOKEN_REGEX = new RegExp(`s*${SELF_TOKEN}s*,?`, 'g');  // :81
 *
 *     function normalizeSelector(selector) {                            // :588
 *       const hasAmpersand = selector.split(SPLIT_KOMA)                 // backslashnya BENAR di sini
 *         .find((token) => token == SELF_TOKEN) ? true : false;
 *       if (hasAmpersand) selector = selector.replace(SELF_TOKEN_REGEX, '');  // :593
 *
 * (SPLIT_KOMA pada sumber aslinya adalah literal regex "backslash-s bintang,
 * koma, backslash-s bintang". Ditulis begini di sini supaya tidak mengakhiri
 * komentar blok ini.)
 *
 * Maksudnya tidak ambigu: buang ":self" beserta whitespace di sekitarnya dan
 * koma yang menyertainya. Baris di atasnya menuliskan kelas whitespace dengan
 * BENAR, jadi penulisnya memang bermaksud whitespace, bukan huruf "s".
 *
 * Yang benar-benar dibangun: huruf "s" literal nol-atau-lebih, ":self", huruf
 * "s" literal nol-atau-lebih, koma opsional. Ia tidak pernah memakan whitespace.
 *
 * CATATAN METODE — tiga jalan pertama harness ini SALAH, semuanya dicatat:
 *   1. Logika normalisasi sempat ditaruh di dalam template literal halaman,
 *      sehingga "backslash-s" dimakan JS menjadi "s" biasa — harnessnya sendiri
 *      mengalami bug yang sedang diselidiki. Sekarang SELURUH transformasi
 *      string dilakukan di Node; peramban HANYA menilai selektor.
 *   2. Usulan perbaikan pertama saya ("tambahkan backslash") ternyata masih
 *      meninggalkan koma menggantung pada urutan "X, :self".
 *   3. Usulan kedua ("serap koma di kedua sisi") menghasilkan selektor yang SAH
 *      tetapi SALAH ARTI. Karena itu ada kolom semantik, bukan hanya "sah".
 *
 * Jalankan: node analysis/tools/animations-selfregex/probe.mjs <path-node_modules> [--shot x.png]
 */
import {readFileSync, globSync} from 'fs';
import {join} from 'path';
import {createRequire} from 'module';

const nm = process.argv[2];
if (!nm) {
  console.error('pakai: node probe.mjs <path-ke-node_modules> [--shot out.png]');
  process.exit(2);
}
const iShot = process.argv.indexOf('--shot');
const shot = iShot > 0 ? process.argv[iShot + 1] : null;
const {chromium} = createRequire(join(nm, 'x.js'))('playwright');
const pkg = JSON.parse(readFileSync(join(nm, '@angular/animations/package.json'), 'utf8'));

// Sumber regex diambil APA ADANYA dari bundel npm — tidak diketik ulang.
const bundle = readFileSync(join(nm, '@angular/animations/fesm2022/browser.mjs'), 'utf8');
const m = bundle.match(/new RegExp\(`([^`]*\$\{SELF_TOKEN\}[^`]*)`\s*,\s*'g'\)/);
if (!m) {
  console.error('SELF_TOKEN_REGEX tidak ada di bundel npm; hentikan daripada menebak.');
  process.exit(2);
}
const SELF_TOKEN = ':self';
const VARIANTS = {
  terkirim: m[1].replace('${SELF_TOKEN}', SELF_TOKEN),
  'tambah-bslash': String.raw`\s*` + SELF_TOKEN + String.raw`\s*,?`,
  'koma-2-sisi': String.raw`\s*,?\s*` + SELF_TOKEN + String.raw`\s*,?\s*`,
};

const SPLIT_KOMA = /\s*,\s*/;

/** normalizeSelector apa adanya (animation_ast_builder.ts:588-603). */
function normalize(selector, reSource) {
  const re = new RegExp(reSource, 'g');
  const hasAmpersand = selector.split(SPLIT_KOMA).find((t) => t === SELF_TOKEN) ? true : false;
  if (hasAmpersand) selector = selector.replace(re, '');
  return selector
    .replace(/@\*/g, '.ng-trigger')
    .replace(/@\w+/g, (mm) => '.ng-trigger-' + mm.slice(1))
    .replace(/:animating/g, '.ng-animating');
}

/**
 * ACUAN — bukan regex sama sekali: pecah pada koma, buang token :self, gabung
 * lagi. Memakai pemisah yang SAMA dengan baris hasAmpersand, jadi tidak mungkin
 * tidak sinkron dengannya.
 */
function referensi(selector) {
  return selector
    .split(SPLIT_KOMA)
    .filter((t) => t !== SELF_TOKEN && t !== '')
    .join(', ');
}

const SELECTORS = [
  ':self',
  ':self, .card',
  ':self , .card',
  '.card, :self',
  '.card , :self',
  '.cards, :self',
  ':self,.card',
  '.card, :self, .row',
];

const cases = SELECTORS.map((input) => ({
  input,
  ref: referensi(input),
  hasil: Object.fromEntries(
    Object.entries(VARIANTS).map(([k, src]) => [k, normalize(input, src)]),
  ),
}));

// Peramban HANYA menilai: sah atau tidak, dan apakah memilih himpunan elemen
// yang sama dengan acuan.
const CHROME = globSync('/opt/pw-browsers/chromium*/chrome-linux/chrome');
const browser = await chromium.launch(CHROME.length ? {executablePath: CHROME[0]} : {});
const page = await browser.newPage();
page.on('pageerror', (e) => console.error('  [pageerror]', e.message));
await page.setContent(
  '<div class="card"></div><div class="cards"></div><div class="row"></div>' +
    '<div class="card row"></div>',
);

const rows = await page.evaluate((cases) => {
  const nilai = (sel) => {
    if (!sel || !sel.trim()) return {sah: false, els: null};
    try {
      return {sah: true, els: [...document.querySelectorAll(sel)]};
    } catch {
      return {sah: false, els: null};
    }
  };
  const sama = (a, b) =>
    a.els !== null &&
    b.els !== null &&
    a.els.length === b.els.length &&
    a.els.every((el, i) => el === b.els[i]);

  return cases.map((c) => {
    const ref = nilai(c.ref);
    const per = {};
    for (const [k, sel] of Object.entries(c.hasil)) {
      const v = nilai(sel);
      per[k] = {
        selector: sel,
        sah: v.sah,
        benar: v.sah && ref.sah ? sama(v, ref) : v.sah === ref.sah,
      };
    }
    return {input: c.input, ref: c.ref, refSah: ref.sah, per};
  });
}, cases);

const names = Object.keys(VARIANTS);
const line = '='.repeat(78);
console.log(line);
console.log(`F-18 — SELF_TOKEN_REGEX, @angular/animations@${pkg.version} (artefak npm)`);
console.log(line);
console.log(`\nterkirim        /${VARIANTS.terkirim}/g   <- dari browser.mjs, bukan diketik ulang`);
for (const k of names.slice(1)) console.log(`${k.padEnd(15)} /${VARIANTS[k]}/g`);
console.log('\nAcuan = pecah pada koma, buang :self, gabung lagi. Bukan regex.');
console.log('"benar" = sah di peramban DAN memilih himpunan elemen yang sama dengan acuan.\n');
console.log('  query(...)              acuan            ' + names.map((n) => n.padEnd(16)).join(''));
for (const r of rows) {
  const bad = !r.per['terkirim'].benar;
  console.log(
    `  ${bad ? '>>' : '  '}` +
      r.input.padEnd(22) +
      JSON.stringify(r.ref).padEnd(17) +
      names.map((n) => (r.per[n].benar ? 'benar' : 'SALAH').padEnd(16)).join(''),
  );
}
console.log('\n  Selektor yang dihasilkan regex TERKIRIM:');
for (const r of rows) {
  console.log(
    `    ${r.input.padEnd(22)} -> ${JSON.stringify(r.per['terkirim'].selector).padEnd(24)}` +
      `${r.per['terkirim'].sah ? 'sah' : 'DITOLAK peramban'}`,
  );
}

if (shot) {
  await page.setContent(
    '<style>body{font:13px ui-monospace,monospace;margin:20px}table{border-collapse:collapse}' +
      'td,th{border:1px solid #bbb;padding:5px 9px;vertical-align:top}' +
      '.bad{background:#ffe1e1}.ok{background:#e8f6e8}</style>' +
      '<h3>Angular animations — normalizeSelector(":self, ...")</h3>' +
      '<p>regex terkirim: <code>/' + VARIANTS.terkirim + '/g</code> &nbsp; ' +
      'acuan = pecah pada koma, buang :self, gabung lagi</p>' +
      '<table><tr><th>query(...)</th><th>acuan</th>' +
      names.map((n) => '<th>' + n + '</th>').join('') +
      '</tr>' +
      rows
        .map(
          (r) =>
            '<tr class="' + (r.per['terkirim'].benar ? 'ok' : 'bad') + '">' +
            '<td><code>' + r.input + '</code></td><td><code>' + JSON.stringify(r.ref) + '</code></td>' +
            names
              .map(
                (n) =>
                  '<td><b>' + (r.per[n].benar ? 'benar' : 'SALAH') + '</b><br>' +
                  '<small><code>' + JSON.stringify(r.per[n].selector) + '</code></small></td>',
              )
              .join('') +
            '</tr>',
        )
        .join('') +
      '</table>',
  );
  await page.screenshot({path: shot, fullPage: true});
  console.log(`\nTangkapan layar: ${shot}`);
}

const skor = Object.fromEntries(names.map((n) => [n, rows.filter((r) => r.per[n].benar).length]));
console.log('\n' + line);
console.log('Benar secara semantik: ' + names.map((n) => `${n} ${skor[n]}/${rows.length}`).join('   '));

const adaYangSalah = skor['terkirim'] < rows.length;
const adaYangBenar = skor['terkirim'] > 0;
const tambalanGagal = skor['tambah-bslash'] < rows.length && skor['koma-2-sisi'] < rows.length;

if (adaYangSalah && adaYangBenar) {
  console.log('');
  console.log('TERKONFIRMASI. Sebagian bentuk tetap benar — itulah kontrol negatifnya, dan');
  console.log('itu pula sebabnya cacat ini bisa bertahan: bentuk yang paling lazim ditulis');
  console.log('orang, ":self, .card", kebetulan selamat.');
  if (tambalanGagal) {
    console.log('');
    console.log('DAN: kedua tambalan regex yang saya usulkan JUGA gagal.');
    console.log('  - "tambah backslash" tetap meninggalkan koma menggantung pada "X, :self"');
    console.log('  - "koma 2 sisi" menghasilkan selektor SAH tetapi SALAH ARTI:');
    console.log('    ".card, :self, .row" menjadi ".card.row" — elemen dengan KEDUA kelas,');
    console.log('    bukan salah satu. Uji "diterima peramban" saja tidak menangkap ini.');
    console.log('');
    console.log('Kesimpulan: ini bukan sesuatu yang bisa ditambal dengan regex. Perbaikannya');
    console.log('adalah memecah pada koma, membuang token :self, lalu menggabungkan kembali —');
    console.log('persis yang SUDAH dilakukan baris hasAmpersand dua baris di atasnya.');
  }
} else {
  console.log('Tidak terkonfirmasi.');
}
console.log(line);

await browser.close();
process.exit(adaYangSalah && adaYangBenar ? 0 : 1);
