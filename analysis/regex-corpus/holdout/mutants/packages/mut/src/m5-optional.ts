// M5 — pembacaan dengan optional chaining. Prototipe tetap tertelusuri.
const cache: {[k: string]: string} = {allow: 'yes'};
export function decide5(k: string): string {
  return cache?.[k] ?? 'deny';
}
