import type { VariantDefinition, VariantId } from './types';

export function formatMatchRule(variant: VariantDefinition): string {
  if (variant.matchRule === 'endAnchored') {
    return 'Last 3 digits of the plate';
  }
  return 'Anywhere on the plate';
}

export function formatProgressCount(
  foundCount: number,
  totalSteps?: number,
): string {
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

export function formatPriorCount(count: number): string {
  if (count === 0) {
    return '';
  }
  if (count === 1) {
    return '1 find before tracking';
  }
  return `${count} finds before tracking`;
}

export function formatTrackedSummary(
  priorCount: number,
  trackedCount: number,
  totalSteps?: number,
): string {
  const total = priorCount + trackedCount;
  return formatProgressCount(total, totalSteps);
}

/** Display form shown in the UI (plates use uppercase element symbols). */
export function formatTargetDisplay(variantId: VariantId, target: string): string {
  if (variantId === 'elements') {
    return target.toUpperCase();
  }
  return target;
}
