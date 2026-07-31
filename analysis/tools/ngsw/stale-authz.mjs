/**
 * F-12 langkah 3 — dari "respons pihak ketiga bisa di-cache" menjadi
 * "KEPUTUSAN KEAMANAN menjadi salah".
 *
 * Langkah 2 hanya membuktikan respons lintas-origin masuk cache dan disajikan
 * ulang. Itu belum menaikkan severity. Di sini kita tunjukkan konsekuensi yang
 * tidak ambigu: aplikasi MENERIMA token yang seharusnya DITOLAK, dan mengizinkan
 * tindakan admin yang seharusnya ditolak — semata karena service worker
 * menyajikan JWKS basi.
 *
 * SKENARIO (semuanya lazim di aplikasi nyata)
 * -------------------------------------------
 * Aplikasi di https://app.example.com/ memakai IdP pihak ketiga. Konfigurasi
 * ngsw-nya berisi satu dataGroup untuk API-nya sendiri:
 *
 *     dataGroups: [{ name:'api', urls:['/api/**'],
 *                    cacheConfig:{ strategy:'performance', maxAge:'1d', ... } }]
 *
 * Developer bermaksud: "cache API SAYA". Tetapi endpoint JWKS milik IdP
 * kebetulan beralamat  https://idp.example.test/v1/api/keys  — dan pola tanpa
 * anchor itu mencocokkannya.
 *
 * Lini masa:
 *   T0  Kunci k1 sah. Aplikasi mengambil JWKS.  -> masuk cache
 *   T1  k1 BOCOR. IdP merotasinya keluar; JWKS kini hanya berisi k2.
 *       Semua token yang ditandatangani k1 HARUS ditolak.
 *   T2  Penyerang menyodorkan JWT role=admin yang ditandatangani dengan k1 bocor.
 *
 * Verifikasinya memakai WebCrypto asli (ECDSA P-256 / ES256), bukan tiruan.
 * Kalau tanda tangannya tidak sah, ia benar-benar gagal.
 *
 * TIGA JALANNYA — hanya SATU variabel yang berubah tiap kali
 * ----------------------------------------------------------
 *   A  RENTAN   pola `\/api\/.*` (persis keluaran Generator), JWKS di /v1/api/keys
 *   B  KONTROL  pola sama, JWKS di /v1/keys  (tidak memuat "/api/")
 *   C  PERBAIKAN pola ter-anchor ke origin aplikasi, JWKS di /v1/api/keys
 *
 * Jalankan: node analysis/tools/ngsw/stale-authz.mjs <path-node_modules>
 */
import {readFileSync} from 'fs';
import {createHash, webcrypto} from 'crypto';
import {join} from 'path';
import {pathToFileURL} from 'url';
import {muatWorker} from './mock-sw.mjs';

const {subtle} = webcrypto;
const nm = process.argv[2];
if (!nm) {
  console.error('pakai: node stale-authz.mjs <path-ke-node_modules>');
  process.exit(2);
}
const swDir = join(nm, '@angular/service-worker');
const pkg = JSON.parse(readFileSync(join(swDir, 'package.json'), 'utf8'));
const {Generator} = await import(pathToFileURL(join(swDir, 'fesm2022/config.mjs')).href);

const SCOPE = 'https://app.example.com/';

// ---------------------------------------------------------------- JWT/JWKS --
const b64url = (buf) =>
  Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const b64urlDecode = (s) => Buffer.from(s.replace(/-/g, '+').replace(/_/g, '/'), 'base64');

async function buatKunci(kid) {
  const pair = await subtle.generateKey({name: 'ECDSA', namedCurve: 'P-256'}, true, [
    'sign',
    'verify',
  ]);
  const jwk = await subtle.exportKey('jwk', pair.publicKey);
  return {kid, privat: pair.privateKey, jwk: {...jwk, kid, alg: 'ES256', use: 'sig'}};
}

async function tandatangani(kunci, payload) {
  const header = {alg: 'ES256', typ: 'JWT', kid: kunci.kid};
  const data = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(payload))}`;
  const sig = await subtle.sign(
    {name: 'ECDSA', hash: 'SHA-256'},
    kunci.privat,
    Buffer.from(data, 'utf8'),
  );
  return `${data}.${b64url(sig)}`;
}

/**
 * Kode "aplikasi": memverifikasi JWT terhadap JWKS dan memutuskan akses admin.
 * Ini kode yang JUJUR — ia memeriksa kid, memverifikasi tanda tangan secara
 * kriptografis, dan menolak kunci yang tidak lagi ada di JWKS. Satu-satunya hal
 * yang bisa membuatnya salah adalah JWKS yang ia terima.
 */
async function bolehMasukAdmin(jwt, ambilJwks) {
  const [h, p, s] = jwt.split('.');
  const header = JSON.parse(b64urlDecode(h).toString('utf8'));

  const jwks = await ambilJwks();
  const jwk = jwks.keys.find((k) => k.kid === header.kid);
  if (!jwk) {
    return {izin: false, alasan: `kid "${header.kid}" tidak ada di JWKS (sudah dirotasi keluar)`};
  }

  const kunciPublik = await subtle.importKey(
    'jwk',
    jwk,
    {name: 'ECDSA', namedCurve: 'P-256'},
    false,
    ['verify'],
  );
  const sah = await subtle.verify(
    {name: 'ECDSA', hash: 'SHA-256'},
    kunciPublik,
    b64urlDecode(s),
    Buffer.from(`${h}.${p}`, 'utf8'),
  );
  if (!sah) return {izin: false, alasan: 'tanda tangan tidak sah'};

  const payload = JSON.parse(b64urlDecode(p).toString('utf8'));
  return {
    izin: payload.role === 'admin',
    alasan: `tanda tangan sah dengan kid "${header.kid}", role="${payload.role}"`,
  };
}

// ------------------------------------------------------------------ harness --
const isiBerkas = {'/index.html': '<html>app</html>'};

async function bangunManifest(polaDataGroup) {
  const fsPalsu = {
    list: async () => Object.keys(isiBerkas),
    read: async (p) => isiBerkas[p],
    hash: async (p) => createHash('sha1').update(Buffer.from(isiBerkas[p], 'utf8')).digest('hex'),
    write: async () => {},
  };
  const manifest = await new Generator(fsPalsu, '/').process({
    index: '/index.html',
    assetGroups: [{name: 'app', installMode: 'prefetch', resources: {files: ['/index.html']}}],
    dataGroups: [
      {
        name: 'api',
        urls: ['/api/**'],
        cacheConfig: {strategy: 'performance', maxSize: 100, maxAge: '1d'},
      },
    ],
    navigationUrls: ['/**'],
  });
  if (polaDataGroup) manifest.dataGroups[0].patterns = [polaDataGroup];
  return manifest;
}

async function jalankanSkenario({nama, urlJwks, polaDataGroup, k1, k2, tokenPenyerang}) {
  const manifest = await bangunManifest(polaDataGroup);

  // Keadaan IdP: awalnya k1 sah; sesudah rotasi hanya k2.
  let jwksSekarang = {keys: [k1.jwk]};
  let hitJwks = 0;

  async function jaringan(req) {
    const u = req.url;
    if (u.includes('ngsw.json')) {
      return new Response(JSON.stringify(manifest), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
      });
    }
    if (u === SCOPE + 'index.html') return new Response(isiBerkas['/index.html'], {status: 200});
    if (u === urlJwks) {
      hitJwks++;
      return new Response(JSON.stringify(jwksSekarang), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
      });
    }
    return new Response('tidak ditemukan', {status: 404});
  }

  const scope = muatWorker(join(swDir, 'ngsw-worker.js'), SCOPE, jaringan);
  await scope.kirim('install');
  await scope.kirim('activate');
  for (const pesan of scope.pesanKeDiriSendiri) {
    await scope.kirim('message', {data: pesan, source: null, ports: []});
  }

  // Persis perilaku peramban: kirim ke SW; kalau SW tidak mengambil alih,
  // permintaan lanjut ke jaringan.
  async function ambilJwks() {
    const req = new Request(urlJwks, {mode: 'cors'});
    const res = await scope.kirim('fetch', {request: req, clientId: 'c1'});
    const final = res ?? (await jaringan(req));
    return JSON.parse(await final.clone().text());
  }

  // T0 — pemuatan halaman biasa; aplikasi mengambil JWKS saat k1 masih sah.
  const jwksT0 = await ambilJwks();

  // T1 — k1 BOCOR. IdP merotasinya keluar.
  jwksSekarang = {keys: [k2.jwk]};
  const hitSebelum = hitJwks;

  // T2 — penyerang menyodorkan token role=admin bertanda tangan k1 bocor.
  const putusan = await bolehMasukAdmin(tokenPenyerang, ambilJwks);
  const idpDihubungi = hitJwks > hitSebelum;

  return {
    nama,
    urlJwks,
    pola: manifest.dataGroups[0].patterns[0],
    kidT0: jwksT0.keys.map((k) => k.kid),
    idpDihubungiSetelahRotasi: idpDihubungi,
    putusan,
  };
}

// -------------------------------------------------------------------- main --
const k1 = await buatKunci('k1-bocor');
const k2 = await buatKunci('k2-baru');
const tokenPenyerang = await tandatangani(k1, {
  sub: 'penyerang',
  role: 'admin',
  iss: 'https://idp.example.test/',
});

const garis = '='.repeat(78);
console.log(garis);
console.log(`F-12 langkah 3 — respons basi -> keputusan otorisasi salah`);
console.log(`ngsw-worker.js @angular/service-worker@${pkg.version} (npm), ES256 WebCrypto asli`);
console.log(garis);
console.log(`
Aplikasi   : ${SCOPE}
ngsw-config: dataGroups[{ urls:['/api/**'], strategy:'performance', maxAge:'1d' }]
Maksud     : "cache API milik saya sendiri"

Lini masa  : T0 k1 sah, aplikasi ambil JWKS
             T1 k1 BOCOR, IdP merotasinya keluar -> JWKS hanya berisi k2
             T2 penyerang menyodorkan JWT role=admin bertanda tangan k1`);

const hasil = [];
hasil.push(
  await jalankanSkenario({
    nama: 'A  RENTAN    — pola apa adanya, JWKS di /v1/api/keys',
    urlJwks: 'https://idp.example.test/v1/api/keys',
    polaDataGroup: null,
    k1,
    k2,
    tokenPenyerang,
  }),
);
hasil.push(
  await jalankanSkenario({
    nama: 'B  KONTROL   — pola sama, JWKS di /v1/keys (tanpa "/api/")',
    urlJwks: 'https://idp.example.test/v1/keys',
    polaDataGroup: null,
    k1,
    k2,
    tokenPenyerang,
  }),
);
hasil.push(
  await jalankanSkenario({
    nama: 'C  PERBAIKAN — pola ter-anchor ke origin aplikasi',
    urlJwks: 'https://idp.example.test/v1/api/keys',
    polaDataGroup: '^https:\\/\\/app\\.example\\.com\\/api\\/.*$',
    k1,
    k2,
    tokenPenyerang,
  }),
);

for (const h of hasil) {
  console.log('\n' + garis);
  console.log(h.nama);
  console.log(garis);
  console.log(`  URL JWKS                     ${h.urlJwks}`);
  console.log(`  pola dataGroup di manifest   ${h.pola}`);
  console.log(`  kid yang terlihat di T0      ${JSON.stringify(h.kidT0)}`);
  console.log(`  IdP dihubungi setelah rotasi ${h.idpDihubungiSetelahRotasi}`);
  console.log(
    `  KEPUTUSAN                    ${h.putusan.izin ? '>>> AKSES ADMIN DIBERIKAN' : 'akses ditolak'}`,
  );
  console.log(`  alasan                       ${h.putusan.alasan}`);
}

// ================== SKENARIO 2 — pencabutan hak yang tidak berlaku ==========
// Skenario 1 mengandaikan aplikasi memverifikasi JWT di sisi klien. Itu nyata
// tetapi tidak universal. Skenario 2 memakai pola yang JAUH lebih umum dan
// tidak memerlukan asumsi itu sama sekali: aplikasi menanyakan hak akses
// pengguna ke endpoint IdP/billing pihak ketiga, lalu memakai jawabannya untuk
// memutuskan apa yang boleh dilakukan.
//
// Ini adalah kegagalan "pencabutan tidak berlaku": admin mencabut peran
// seseorang (karyawan keluar, akun disusupi, langganan diturunkan), tetapi
// peramban orang itu terus menerima jawaban LAMA sampai maxAge habis — dan
// IdP tidak pernah dihubungi lagi.

async function jalankanPencabutan({nama, urlHak, polaDataGroup}) {
  const manifest = await bangunManifest(polaDataGroup);

  let hakSekarang = {role: 'admin', active: true};
  let hit = 0;

  async function jaringan(req) {
    const u = req.url;
    if (u.includes('ngsw.json')) {
      return new Response(JSON.stringify(manifest), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
      });
    }
    if (u === SCOPE + 'index.html') return new Response(isiBerkas['/index.html'], {status: 200});
    if (u === urlHak) {
      hit++;
      return new Response(JSON.stringify(hakSekarang), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
      });
    }
    return new Response('tidak ditemukan', {status: 404});
  }

  const scope = muatWorker(join(swDir, 'ngsw-worker.js'), SCOPE, jaringan);
  await scope.kirim('install');
  await scope.kirim('activate');
  for (const pesan of scope.pesanKeDiriSendiri) {
    await scope.kirim('message', {data: pesan, source: null, ports: []});
  }

  async function ambilHak() {
    const req = new Request(urlHak, {mode: 'cors'});
    const res = await scope.kirim('fetch', {request: req, clientId: 'c1'});
    const final = res ?? (await jaringan(req));
    return JSON.parse(await final.clone().text());
  }

  // T0 — pengguna memuat aplikasi selagi masih admin.
  await ambilHak();

  // T1 — admin MENCABUT hak; IdP kini menjawab viewer/tidak aktif.
  hakSekarang = {role: 'viewer', active: false};
  const hitSebelum = hit;

  // T2 — pengguna membuka panel admin lagi.
  const hak = await ambilHak();
  return {
    nama,
    urlHak,
    pola: manifest.dataGroups[0].patterns[0],
    idpDihubungi: hit > hitSebelum,
    hakTerlihat: hak,
    izinAdmin: hak.role === 'admin' && hak.active === true,
  };
}

console.log('\n\n' + garis);
console.log('SKENARIO 2 — pencabutan hak akses yang tidak berlaku');
console.log(garis);
console.log(`
Aplikasi menanyakan hak pengguna ke endpoint pihak ketiga, lalu memakainya
untuk memutuskan akses. Tidak ada verifikasi JWT sisi klien yang diandaikan.

  T0  pengguna adalah admin, aplikasi mengambil hak aksesnya
  T1  admin MENCABUT peran itu (karyawan keluar / akun disusupi)
  T2  pengguna membuka panel admin lagi`);

const cabut = [];
cabut.push(
  await jalankanPencabutan({
    nama: 'A  RENTAN    — hak akses di /v2/api/entitlements',
    urlHak: 'https://idp.example.test/v2/api/entitlements',
    polaDataGroup: null,
  }),
);
cabut.push(
  await jalankanPencabutan({
    nama: 'B  KONTROL   — hak akses di /v2/entitlements (tanpa "/api/")',
    urlHak: 'https://idp.example.test/v2/entitlements',
    polaDataGroup: null,
  }),
);

for (const c of cabut) {
  console.log('\n' + garis);
  console.log(c.nama);
  console.log(garis);
  console.log(`  URL hak akses                ${c.urlHak}`);
  console.log(`  pola dataGroup di manifest   ${c.pola}`);
  console.log(`  IdP dihubungi setelah cabut  ${c.idpDihubungi}`);
  console.log(`  hak yang DILIHAT aplikasi    ${JSON.stringify(c.hakTerlihat)}`);
  console.log(
    `  KEPUTUSAN                    ${c.izinAdmin ? '>>> PANEL ADMIN TETAP TERBUKA' : 'akses dicabut dengan benar'}`,
  );
}

const A = hasil[0],
  B = hasil[1],
  C = hasil[2];
const pencabutanRentan = cabut[0].izinAdmin && !cabut[1].izinAdmin;
const terkonfirmasi =
  A.putusan.izin && !B.putusan.izin && !C.putusan.izin && pencabutanRentan;

console.log('\n' + garis);
if (terkonfirmasi) {
  console.log('TERKONFIRMASI — keputusan otorisasi berbeda, dan satu-satunya yang');
  console.log('berubah adalah apakah pola dataGroup mencocokkan URL IdP.');
  console.log('');
  console.log('  A  SW menyajikan JWKS basi -> kunci yang sudah dirotasi keluar masih');
  console.log('     dianggap sah -> token palsu role=admin DITERIMA, dan IdP bahkan');
  console.log('     tidak pernah dihubungi lagi setelah rotasi.');
  console.log('  B  URL IdP tidak memuat "/api/" -> SW tidak ikut campur -> JWKS segar');
  console.log('     -> kid sudah tidak ada -> DITOLAK.');
  console.log('  C  Pola ter-anchor ke origin aplikasi -> SW tidak ikut campur -> DITOLAK.');
  console.log('');
  console.log('Kode aplikasi, kunci, token, dan kode verifikasi identik di ketiganya.');
  console.log('Yang membedakan diterimanya token palsu hanyalah BENTUK URL IdP.');
  console.log('');
  console.log('Skenario 2 menunjukkan hal yang sama tanpa mengandaikan verifikasi JWT');
  console.log('sisi klien: pencabutan peran tidak berlaku, panel admin tetap terbuka,');
  console.log('dan IdP tidak pernah dihubungi lagi setelah pencabutan.');
} else {
  console.log(`Tidak terkonfirmasi (A=${A.putusan.izin} B=${B.putusan.izin} C=${C.putusan.izin}).`);
}
console.log(garis);
process.exit(terkonfirmasi ? 0 : 1);
