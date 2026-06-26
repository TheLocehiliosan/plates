export type CountingBase = 10 | 16 | 2;

export const PLATE_CHAR_LIMIT = 7;

function maxValueForBase(base: CountingBase, charLimit: number): number {
  return base ** charLimit - 1;
}

/** Largest 0-based index whose target fits within charLimit characters. */
export function getMaxCountingIndex(
  base: CountingBase,
  charLimit = PLATE_CHAR_LIMIT,
): number {
  return maxValueForBase(base, charLimit) - 1;
}

/** Total finds to complete a counting sequence within charLimit characters. */
export function getCountingTotalSteps(
  base: CountingBase,
  charLimit = PLATE_CHAR_LIMIT,
): number {
  return maxValueForBase(base, charLimit);
}

export const BINARY_TOTAL = getCountingTotalSteps(2);
export const DECIMAL_TOTAL = getCountingTotalSteps(10);
export const HEX_TOTAL = getCountingTotalSteps(16);

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

/** Final win target for a counting base at the plate character limit. */
export function getCountingWinTarget(base: CountingBase): string {
  return getCountingTarget(getMaxCountingIndex(base), base);
}
