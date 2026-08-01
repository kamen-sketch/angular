// N2 — KONTROL NEGATIF: dijaga Object.hasOwn di tempatnya. Tidak boleh dilaporkan.
const guarded: {[k: string]: string} = {allow: 'yes'};
export function decideGuarded(k: string): string {
  if (!Object.hasOwn(guarded, k)) return 'deny';
  return guarded[k];
}
