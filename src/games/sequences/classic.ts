export const CLASSIC_TOTAL = 999;

export function getClassicTarget(index: number): string | null {
  if (index < 0 || index >= CLASSIC_TOTAL) {
    return null;
  }
  return String(index + 1).padStart(3, '0');
}
