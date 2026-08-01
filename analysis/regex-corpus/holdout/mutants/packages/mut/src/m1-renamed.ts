// M1 — kelas F-06/F-17 dengan SIMBOL DIGANTI. Tidak ada nama yang dikenal
// corpus (VALID_ATTRS, META_KEYS_MAP, URI_ATTRS). Semantiknya identik.
const rules: {[k: string]: string} = {allow: 'yes'};
export function decide(name: string): string {
  return rules[name] || 'deny';
}
