import type { VariantDefinition } from './types';

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
