// N1 — KONTROL NEGATIF: Map sungguhan. Tidak boleh dilaporkan.
const safe = new Map<string, string>([['allow', 'yes']]);
export function decideSafe(k: string): string {
  return safe.get(k) ?? 'deny';
}
