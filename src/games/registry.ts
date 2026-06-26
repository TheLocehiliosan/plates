import type { VariantDefinition, VariantId } from './types';
import { getClassicTarget, CLASSIC_TOTAL } from './sequences/classic';
import {
  BINARY_TOTAL,
  DECIMAL_TOTAL,
  getCountingTarget,
  getCountingWinTarget,
  HEX_TOTAL,
} from './sequences/counting';
import { getElementTarget, ELEMENTS_TOTAL } from './sequences/elements';
import { getPiTarget } from './sequences/pi';

function boundedTarget(
  getTarget: (index: number) => string | null,
  total: number,
): (index: number) => string | null {
  return (index) => (index >= total ? null : getTarget(index));
}

export const VARIANTS: VariantDefinition[] = [
  {
    id: 'classic',
    name: 'Classic Plate Spotting',
    shortDescription: 'Find plates ending in 001, 002, … up to 999.',
    matchRule: 'endAnchored',
    matchRuleHint: 'The last three characters of the plate must match.',
    getTarget: boundedTarget(getClassicTarget, CLASSIC_TOTAL),
    isComplete: (index) => index >= CLASSIC_TOTAL,
    totalSteps: CLASSIC_TOTAL,
    completeTitle: '999 reached',
  },
  {
    id: 'decimal',
    name: 'Unanchored Decimal',
    shortDescription: 'Find 1, 2, 3, … anywhere on the plate.',
    matchRule: 'anywhere',
    matchRuleHint: 'The target can appear anywhere on the plate.',
    getTarget: boundedTarget((index) => getCountingTarget(index, 10), DECIMAL_TOTAL),
    isComplete: (index) => index >= DECIMAL_TOTAL,
    totalSteps: DECIMAL_TOTAL,
    showTotalSteps: false,
    completeTitle: `${getCountingWinTarget(10)} found`,
  },
  {
    id: 'hex',
    name: 'Unanchored Hexadecimal',
    shortDescription: 'Find 1…F, 10, 11, … anywhere on the plate.',
    matchRule: 'anywhere',
    matchRuleHint: 'The target can appear anywhere on the plate.',
    getTarget: boundedTarget((index) => getCountingTarget(index, 16), HEX_TOTAL),
    isComplete: (index) => index >= HEX_TOTAL,
    totalSteps: HEX_TOTAL,
    showTotalSteps: false,
    completeTitle: `${getCountingWinTarget(16)} found`,
  },
  {
    id: 'binary',
    name: 'Unanchored Binary',
    shortDescription: 'Find 1, 10, 11, 100, … anywhere on the plate.',
    matchRule: 'anywhere',
    matchRuleHint: 'The target can appear anywhere on the plate.',
    getTarget: boundedTarget((index) => getCountingTarget(index, 2), BINARY_TOTAL),
    isComplete: (index) => index >= BINARY_TOTAL,
    totalSteps: BINARY_TOTAL,
    showTotalSteps: false,
    completeTitle: `${getCountingWinTarget(2)} found`,
  },
  {
    id: 'elements',
    name: 'Elements',
    shortDescription: 'Find element symbols in periodic-table order.',
    matchRule: 'anywhere',
    matchRuleHint: 'The element symbol can appear anywhere on the plate.',
    getTarget: boundedTarget(getElementTarget, ELEMENTS_TOTAL),
    isComplete: (index) => index >= ELEMENTS_TOTAL,
    totalSteps: ELEMENTS_TOTAL,
    completeTitle: 'All elements found',
  },
  {
    id: 'pi',
    name: 'Pi',
    shortDescription: 'Find sliding 3-digit windows of π.',
    matchRule: 'anywhere',
    matchRuleHint: 'Three consecutive digits of π, anywhere on the plate.',
    getTarget: (index) => getPiTarget(index),
    isComplete: () => false,
  },
];

export const VARIANT_MAP: Record<VariantId, VariantDefinition> = VARIANTS.reduce(
  (acc, variant) => {
    acc[variant.id] = variant;
    return acc;
  },
  {} as Record<VariantId, VariantDefinition>,
);

export function getVariant(id: VariantId): VariantDefinition {
  return VARIANT_MAP[id];
}

export function getNextTarget(id: VariantId, progressIndex: number): string | null {
  const variant = getVariant(id);
  if (variant.isComplete(progressIndex)) {
    return null;
  }
  return variant.getTarget(progressIndex);
}

export function getProgressLabel(id: VariantId, progressIndex: number): string {
  const variant = getVariant(id);
  if (variant.isComplete(progressIndex)) {
    return 'Complete';
  }
  const target = variant.getTarget(progressIndex);
  return target ?? '—';
}
