// Replikasi PERSIS loop mXSS dari packages/core/src/sanitization/html_sanitizer.ts:314-326
// Tujuan: membuktikan berapa kali loop benar-benar berputar.

function simulateAngularLoop(transform, H0) {
  // getInertBodyElement(html) -> elemen yang innerHTML-nya = hasil parse+serialize
  const getInertBodyElement = (html) => ({innerHTML: transform(html)});

  let inertBodyElement = getInertBodyElement(H0);
  let unsafeHtml = H0;

  // ---- awal kutipan kode Angular ----
  let mXSSAttempts = 5;
  let parsedHtml = unsafeHtml;

  let iterations = 0;
  const trace = [];
  do {
    if (mXSSAttempts === 0) {
      throw new Error('Failed to sanitize html because the input is unstable');
    }
    mXSSAttempts--;
    iterations++;

    unsafeHtml = parsedHtml;
    parsedHtml = inertBodyElement.innerHTML;
    inertBodyElement = getInertBodyElement(unsafeHtml);

    trace.push({iterations, unsafeHtml, parsedHtml, lanjut: unsafeHtml !== parsedHtml});
  } while (unsafeHtml !== parsedHtml);
  // ---- akhir kutipan kode Angular ----

  return {iterations, mXSSAttemptsTersisa: mXSSAttempts, trace, diserialisasiDari: unsafeHtml};
}

// Loop yang BENAR-BENAR mencari fixed point, untuk pembanding.
function simulateFixedPointLoop(transform, H0) {
  let attempts = 5;
  let current = H0;
  let iterations = 0;
  while (true) {
    if (attempts === 0) throw new Error('input is unstable');
    attempts--;
    iterations++;
    const next = transform(current);
    if (next === current) return {iterations, stabilDi: current};
    current = next;
  }
}

console.log('='.repeat(72));
console.log('KASUS 1: input yang TIDAK PERNAH stabil (transform selalu mengubah)');
console.log('='.repeat(72));
const takPernahStabil = (s) => s + 'x';
const r1 = simulateAngularLoop(takPernahStabil, 'a');
console.log('Jumlah iterasi loop Angular :', r1.iterations);
console.log('Sisa jatah mXSSAttempts     :', r1.mXSSAttemptsTersisa, '(mulai dari 5)');
console.log('Keluar tanpa melempar error : ya');
console.log('Trace:');
for (const t of r1.trace) {
  console.log(`  iter ${t.iterations}: unsafeHtml=${JSON.stringify(t.unsafeHtml)} ` +
              `parsedHtml=${JSON.stringify(t.parsedHtml)} -> lanjut=${t.lanjut}`);
}
try {
  const f1 = simulateFixedPointLoop(takPernahStabil, 'a');
  console.log('Loop fixed-point yang benar :', f1);
} catch (e) {
  console.log('Loop fixed-point yang benar : MELEMPAR ->', e.message);
}

console.log();
console.log('='.repeat(72));
console.log('KASUS 2: input yang stabil setelah 3 ronde (mXSS berantai)');
console.log('='.repeat(72));
// H0 -> H1 -> H2 -> H2 (stabil di ronde ke-3)
const rantai = {'H0': 'H1', 'H1': 'H2', 'H2': 'H2'};
const stabilRonde3 = (s) => rantai[s] ?? s;
const r2 = simulateAngularLoop(stabilRonde3, 'H0');
console.log('Jumlah iterasi loop Angular :', r2.iterations);
console.log('String yang akhirnya diparse lalu diserialisasi:', r2.diserialisasiDari);
console.log('  -> artinya serializer bekerja pada parse(' + r2.diserialisasiDari + ')');
console.log('  -> padahal titik stabil sesungguhnya adalah H2');
console.log('Trace:');
for (const t of r2.trace) {
  console.log(`  iter ${t.iterations}: unsafeHtml=${JSON.stringify(t.unsafeHtml)} ` +
              `parsedHtml=${JSON.stringify(t.parsedHtml)} -> lanjut=${t.lanjut}`);
}
const f2 = simulateFixedPointLoop(stabilRonde3, 'H0');
console.log('Loop fixed-point yang benar :', f2);

console.log();
console.log('='.repeat(72));
console.log('KASUS 3: input yang memang sudah stabil sejak awal');
console.log('='.repeat(72));
const sudahStabil = (s) => s;
const r3 = simulateAngularLoop(sudahStabil, 'H0');
console.log('Jumlah iterasi loop Angular :', r3.iterations, '(benar, tidak ada masalah)');

console.log();
console.log('='.repeat(72));
console.log('KESIMPULAN');
console.log('='.repeat(72));
console.log('Loop tidak pernah berputar lebih dari 2 kali, apa pun masukannya.');
console.log('Akibatnya:');
console.log('  1. Jatah mXSSAttempts=5 tidak pernah terpakai habis');
console.log('  2. Error "input is unstable" TIDAK DAPAT DICAPAI (dead code)');
console.log('  3. Normalisasi berhenti di ronde ke-2, bukan di titik stabil');
