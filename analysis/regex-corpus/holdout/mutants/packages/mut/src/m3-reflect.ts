// M3 — pembacaan lewat Reflect.get. Reflect.get MENELUSURI rantai prototipe,
// jadi cacatnya identik; sintaksnya sama sekali berbeda.
const policy: {[k: string]: string} = {allow: 'yes'};
export function decide3(attackerKey: string): string {
  return Reflect.get(policy, attackerKey) || 'deny';
}
