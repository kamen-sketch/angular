// Replikasi PERSIS insertEventRecordScript (platform-server/src/utils.ts:171-177)
function buildReplayScript(appId, regular, capture) {
  return `window.__jsaction_bootstrap(` +
    `document.body,` +
    `"${appId}",` +
    `${JSON.stringify(Array.from(regular))},` +
    `${JSON.stringify(Array.from(capture))}` +
    `);`;
}
// Validator APP_ID (application_tokens.ts:60) — HANYA aktif di ngDevMode
const isValid = (id) => /^[a-zA-Z0-9\-_]+$/.test(id);

const cases = [
  ['ng', 'default, wajar'],
  ['app-a_1', 'valid'],
  ['x";alert(document.domain);//', 'keluar dari literal string JS'],
  ['x</script><img src=x onerror=alert(1)>', 'keluar dari tag <script>'],
];

for (const [appId, label] of cases) {
  const out = buildReplayScript(appId, ['click'], []);
  console.log('appId      :', JSON.stringify(appId));
  console.log('keterangan :', label);
  console.log('lolos validator dev?', isValid(appId) ? 'YA' : 'TIDAK (ditolak di dev, LOLOS di produksi)');
  console.log('script     :', out);
  console.log('-'.repeat(78));
}
