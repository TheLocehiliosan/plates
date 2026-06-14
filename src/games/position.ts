import { getVariant } from './registry';
import { PI_DIGIT_COUNT } from './sequences/pi';
import type { SetPositionMode, VariantId } from './types';

function targetsMatch(variantId: VariantId, a: string, b: string): boolean {
  if (variantId === 'elements') {
    return a.toLowerCase() === b.toLowerCase();
  }
  return a === b;
}

export function normalizeTargetInput(variantId: VariantId, raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) {
    return '';
  }

  if (variantId === 'classic') {
    const digits = trimmed.replace(/\D/g, '');
    if (!digits) {
      return trimmed;
    }
    const n = Number.parseInt(digits, 10);
    if (Number.isNaN(n) || n < 1 || n > 999) {
      return trimmed;
    }
    return String(n).padStart(3, '0');
  }

  if (variantId === 'hex') {
    return trimmed.toUpperCase();
  }

  if (variantId === 'elements') {
    return trimmed.toUpperCase();
  }

  if (variantId === 'pi') {
    return trimmed.replace(/\D/g, '').slice(0, 3);
  }

  return trimmed;
}

function searchLimit(variantId: VariantId): number {
  const variant = getVariant(variantId);
  if (variant.totalSteps !== undefined) {
    return variant.totalSteps;
  }
  if (variantId === 'pi') {
    return PI_DIGIT_COUNT - 2;
  }
  return 100_000;
}

/** Index of a completed target in the sequence (0-based). */
export function findCompletedTargetIndex(
  variantId: VariantId,
  rawInput: string,
): number | null {
  const normalized = normalizeTargetInput(variantId, rawInput);
  if (!normalized) {
    return null;
  }

  const variant = getVariant(variantId);
  const limit = searchLimit(variantId);

  for (let i = 0; i < limit; i++) {
    const target = variant.getTarget(i);
    if (target === null) {
      break;
    }
    if (targetsMatch(variantId, target, normalized)) {
      return i;
    }
  }

  return null;
}

/** Progress index — number of completed finds; next target is getTarget(index). */
export function resolveProgressIndex(
  variantId: VariantId,
  mode: SetPositionMode,
  rawInput: string,
): number | null {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return null;
  }

  const completedIndex = findCompletedTargetIndex(variantId, trimmed);
  if (completedIndex === null) {
    return null;
  }

  if (mode === 'lastFound') {
    return completedIndex + 1;
  }

  // nextTarget: index where this value is what they're looking for now
  return completedIndex;
}

export function getPositionInputHint(variantId: VariantId, mode: SetPositionMode): string {
  switch (variantId) {
    case 'classic':
      return mode === 'nextTarget' ? 'e.g. 048 or 48' : 'e.g. 047';
    case 'decimal':
      return mode === 'nextTarget' ? 'e.g. 38' : 'e.g. 37';
    case 'hex':
      return mode === 'nextTarget' ? 'e.g. 1A' : 'e.g. 19';
    case 'binary':
      return mode === 'nextTarget' ? 'e.g. 100110' : 'e.g. 100101';
    case 'elements':
      return mode === 'nextTarget' ? 'e.g. CA' : 'e.g. K';
    case 'pi':
      return mode === 'nextTarget' ? 'e.g. 653' : 'e.g. 535';
    default:
      return '';
  }
}

export function getPositionInputPlaceholder(
  variantId: VariantId,
  mode: SetPositionMode,
): string {
  return getPositionInputHint(variantId, mode).replace(/^e\.g\. /, '');
}
