// M4 — peta di-ALIAS ke variabel lokal lebih dulu, lalu dibaca lewat alias.
const registry: {[k: string]: string} = {allow: 'yes'};
export function decide4(k: string): string {
  const t = registry;
  return t[k] || 'deny';
}
