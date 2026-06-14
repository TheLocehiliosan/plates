import type { VariantDefinition, VariantId } from './types';
import { getPiDigitsFound } from './sequences/pi';

export function formatMatchRule(variant: VariantDefinition): string {
  if (variant.matchRule === 'endAnchored') {
    return 'Last 3 digits of the plate';
  }
  return 'Anywhere on the plate';
}

export function formatProgressCount(
  variantId: VariantId,
  foundCount: number,
  totalSteps?: number,
): string {
  if (variantId === 'pi') {
    if (foundCount === 1) {
      return '1 digit of π found';
    }
    return `${foundCount} digits of π found`;
  }

  if (totalSteps !== undefined) {
    return `${foundCount} / ${totalSteps} found`;
  }
  return `${foundCount} found`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export function formatPriorCount(variantId: VariantId, count: number): string {
  if (count === 0) {
    return '';
  }

  if (variantId === 'pi') {
    if (count === 1) {
      return '1 digit of π before tracking';
    }
    return `${count} digits of π before tracking`;
  }

  if (count === 1) {
    return '1 find before tracking';
  }
  return `${count} finds before tracking`;
}

export function formatTrackedSummary(
  variantId: VariantId,
  priorCount: number,
  trackedCount: number,
  totalSteps?: number,
): string {
  const progressIndex = priorCount + trackedCount;
  const displayCount =
    variantId === 'pi' ? getPiDigitsFound(progressIndex) : progressIndex;
  return formatProgressCount(variantId, displayCount, totalSteps);
}

export function formatPriorCountForProgress(
  variantId: VariantId,
  progressIndex: number,
): string {
  const displayCount =
    variantId === 'pi' ? getPiDigitsFound(progressIndex) : progressIndex;
  return formatPriorCount(variantId, displayCount);
}

/** Display form shown in the UI (plates use uppercase element symbols). */
export function formatTargetDisplay(variantId: VariantId, target: string): string {
  if (variantId === 'elements') {
    return target.toUpperCase();
  }
  return target;
}
