import type { VariantId } from '../types';

export interface CountingWinCopy {
  target: string;
  message: string;
}

const WIN_COPY: Record<'binary' | 'decimal' | 'hex', CountingWinCopy> = {
  binary: {
    target: '1111111',
    message:
      'Every bit a one. On a 7-character plate, that\u2019s as high as binary goes.',
  },
  decimal: {
    target: '9999999',
    message:
      'Seven nines. The highest decimal string that fits on a standard plate.',
  },
  hex: {
    target: 'FFFFFFF',
    message:
      'Seven Fs \u2014 268,435,455 in decimal. Maximum hex density.',
  },
};

export function getCountingWinCopy(
  variantId: VariantId,
): CountingWinCopy | null {
  if (variantId === 'binary' || variantId === 'decimal' || variantId === 'hex') {
    return WIN_COPY[variantId];
  }
  return null;
}

export function isCountingWinVariant(
  variantId: VariantId,
): variantId is 'binary' | 'decimal' | 'hex' {
  return variantId === 'binary' || variantId === 'decimal' || variantId === 'hex';
}
