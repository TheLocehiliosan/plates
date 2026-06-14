export type CountingBase = 10 | 16 | 2;

export function getCountingTarget(index: number, base: CountingBase): string {
  const value = index + 1;
  if (base === 10) {
    return String(value);
  }
  if (base === 16) {
    return value.toString(16).toUpperCase();
  }
  return value.toString(2);
}
