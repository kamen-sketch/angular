/**
 * Kontrol kesetiaan port. Menjalankan ULANG ekspektasi spec asli Angular
 * (packages/platform-server/test/utils_spec.ts) terhadap port.
 *
 * Ini adalah kontrol positif: kalau port ini tidak mereproduksi perilaku yang
 * SUDAH diuji Angular, hasil fuzzing apa pun tidak boleh dipercaya.
 */
import {validateAllowedHosts, isHostAllowed, NgError} from './port.mjs';

let lulus = 0,
  gagal = 0;
function cek(nama, aktual, harap) {
  const ok = aktual === harap;
  console.log(`${ok ? '  ok  ' : '  X   '} ${nama}  -> ${aktual}`);
  ok ? lulus++ : gagal++;
}

function kodeTolak(url, allowedHosts) {
  try {
    validateAllowedHosts(url, allowedHosts);
    return 'LOLOS';
  } catch (e) {
    return e instanceof NgError ? e.code : 'ERR:' + e.message;
  }
}

console.log('=== isHostAllowed (spec utils_spec.ts:27-43) ===');
cek("has('test.com')", isHostAllowed('test.com', new Set(['test.com', 'example.com'])), true);
cek('wildcard sub', isHostAllowed('sub.example.com', new Set(['test.com', '*.example.com'])), true);
cek('tolak evil.com', isHostAllowed('evil.com', new Set(['test.com', '*.example.com'])), false);
cek("'*' lolos semua", isHostAllowed('anydomain.com', new Set(['*'])), true);

console.log('\n=== renderApplication: host salah (spec :63-77) ===');
for (const u of ['http://evil.com/deep/path', 'ht\ttp://evil.com/deep/path']) {
  cek(JSON.stringify(u), kodeTolak(u, ['test.com', 'localhost']), 'HOST_NOT_ALLOWED');
}

console.log('\n=== host benar tidak ditolak (spec :79-89) ===');
cek(
  'http://test.com/deep/path',
  kodeTolak('http://test.com/deep/path', ['test.com', '*.example.com']),
  'LOLOS',
);

console.log('\n=== URL absolut malformed = "SSRF bypass attempt" (spec :91-113) ===');
for (const u of [
  'http://evil.com:80:80/path',
  'https://evil.com:80:80/path',
  'http://[google.com]/path',
  'http://google.com:port/path',
  'http://google.com:80a/path',
  'ht\ttp://evil.com:80:80/path',
  'ht\ntp://evil.com:80:80/path',
]) {
  cek(JSON.stringify(u), kodeTolak(u, ['test.com']), 'INVALID_URL');
}

console.log(`\nlulus=${lulus} gagal=${gagal}`);
process.exit(gagal === 0 ? 0 : 1);
