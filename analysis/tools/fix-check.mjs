// Versi PERBAIKAN: tukar urutan dua pernyataan terakhir
// (parse dulu, baru baca innerHTML dari elemen yang baru diparse)
function loopDiperbaiki(transform, H0) {
  const getInert = (html) => ({innerHTML: transform(html)});
  let inertBodyElement = getInert(H0);
  let unsafeHtml = H0;
  let mXSSAttempts = 5;
  let parsedHtml = unsafeHtml;
  let iterations = 0;
  do {
    if (mXSSAttempts === 0) throw new Error('input is unstable');
    mXSSAttempts--;
    iterations++;
    unsafeHtml = parsedHtml;
    inertBodyElement = getInert(unsafeHtml);      // <- dipindah ke atas
    parsedHtml = inertBodyElement.innerHTML;      // <- dibaca dari elemen baru
  } while (unsafeHtml !== parsedHtml);
  return {iterations, stabilDi: unsafeHtml};
}
console.log('--- Versi diperbaiki ---');
try {
  console.log('tak pernah stabil :', loopDiperbaiki(s => s + 'x', 'a'));
} catch (e) { console.log('tak pernah stabil : MELEMPAR ->', e.message, '(benar!)'); }
const rantai = {'H0':'H1','H1':'H2','H2':'H2'};
console.log('stabil ronde 3    :', loopDiperbaiki(s => rantai[s] ?? s, 'H0'), '(mencapai H2, benar!)');
console.log('sudah stabil      :', loopDiperbaiki(s => s, 'H0'));
