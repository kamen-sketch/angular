// M2 — peta dibangun HELPER lalu dibaca. Bentuk deklarasinya bukan objek literal.
function buildLookup(): {[k: string]: string} {
  return {allow: 'yes'};
}
const table = buildLookup();
export function decide2(userKey: string): string {
  return table[userKey] || 'deny';
}
