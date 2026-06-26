import { getProgressIndex } from './progress';
import { getNextTarget, getVariant } from './registry';
import {
  VARIANT_IDS,
  type AppState,
  type VariantId,
} from './types';

export interface ComboFind {
  variantId: VariantId;
  targets: string[];
}

/** Witness string known to be on the plate when the source target is found. */
export function getWitness(variantId: VariantId, target: string): string {
  const variant = getVariant(variantId);
  if (variant.matchRule === 'endAnchored') {
    return target;
  }
  return target;
}

function isValidTargetChars(target: string, variantId: VariantId): boolean {
  switch (variantId) {
    case 'binary':
      return /^[01]+$/.test(target);
    case 'hex':
      return /^[0-9A-F]+$/.test(target);
    case 'elements':
      return /^[A-Za-z]+$/.test(target);
    case 'classic':
    case 'decimal':
    case 'pi':
      return /^[0-9]+$/.test(target);
    default:
      return false;
  }
}

export function targetInWitness(
  target: string,
  variantId: VariantId,
  witness: string,
): boolean {
  if (!isValidTargetChars(target, variantId)) {
    return false;
  }
  if (variantId === 'elements') {
    return witness.toUpperCase().includes(target.toUpperCase());
  }
  return witness.includes(target);
}

/** Classic end-anchored finds cannot be inferred from anywhere sources. */
export function canReceiveComboFrom(
  sourceVariantId: VariantId,
  targetVariantId: VariantId,
): boolean {
  if (targetVariantId === 'classic' && sourceVariantId !== 'classic') {
    return false;
  }
  return true;
}

/** Consecutive targets to record in one variant while each next ⊆ witness. */
export function getVariantChain(
  variantId: VariantId,
  progressIndex: number,
  witness: string,
): string[] {
  const variant = getVariant(variantId);
  if (variant.isComplete(progressIndex)) {
    return [];
  }

  const chain: string[] = [];
  let index = progressIndex;

  while (!variant.isComplete(index)) {
    const target = getNextTarget(variantId, index);
    if (!target || !targetInWitness(target, variantId, witness)) {
      break;
    }
    chain.push(target);
    index += 1;
  }

  return chain;
}

export function getComboFinds(
  sourceVariantId: VariantId,
  state: AppState,
): ComboFind[] {
  const progress = state.variants[sourceVariantId];
  const progressIndex = getProgressIndex(progress);
  const sourceTarget = getNextTarget(sourceVariantId, progressIndex);
  if (!sourceTarget) {
    return [];
  }

  const witness = getWitness(sourceVariantId, sourceTarget);
  const results: ComboFind[] = [];

  for (const variantId of VARIANT_IDS) {
    if (!canReceiveComboFrom(sourceVariantId, variantId)) {
      continue;
    }

    const variantProgress = state.variants[variantId];
    const variantIndex = getProgressIndex(variantProgress);
    const chain = getVariantChain(variantId, variantIndex, witness);

    if (chain.length > 0) {
      results.push({ variantId, targets: chain });
    }
  }

  return results;
}

export function getTotalComboEntryCount(comboFinds: ComboFind[]): number {
  return comboFinds.reduce((total, find) => total + find.targets.length, 0);
}

export function hasComboExtras(
  sourceVariantId: VariantId,
  comboFinds: ComboFind[],
): boolean {
  if (getTotalComboEntryCount(comboFinds) <= 1) {
    return false;
  }
  const sourceFind = comboFinds.find((find) => find.variantId === sourceVariantId);
  const otherFinds = comboFinds.filter((find) => find.variantId !== sourceVariantId);
  if (otherFinds.some((find) => find.targets.length > 0)) {
    return true;
  }
  return (sourceFind?.targets.length ?? 0) > 1;
}

export function hasCrossVariantComboFinds(
  sourceVariantId: VariantId,
  recorded: ComboFind[],
): boolean {
  return recorded.some(
    (find) => find.variantId !== sourceVariantId && find.targets.length > 0,
  );
}

export function getComboExtraCount(
  variantId: VariantId,
  state: AppState,
): number {
  const variant = getVariant(variantId);
  const progressIndex = getProgressIndex(state.variants[variantId]);
  if (variant.isComplete(progressIndex)) {
    return 0;
  }

  const total = getTotalComboEntryCount(getComboFinds(variantId, state));
  return total > 1 ? total - 1 : 0;
}

export function countComboVariants(comboFinds: ComboFind[]): number {
  return comboFinds.filter((find) => find.targets.length > 0).length;
}

export function countVariantsInComboGroup(
  state: AppState,
  comboGroupId: string,
): number {
  return VARIANT_IDS.filter((id) =>
    state.variants[id].entries.some(
      (entry) => entry.comboGroupId === comboGroupId,
    ),
  ).length;
}

/** Secure-context safe; falls back when crypto.randomUUID is unavailable (e.g. HTTP). */
export function createComboGroupId(): string {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }
  return `combo-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export const COMBO_GAME_SHORT_NAMES: Record<VariantId, string> = {
  classic: 'Classic',
  decimal: 'Decimal',
  hex: 'Hex',
  binary: 'Binary',
  elements: 'Elements',
  pi: 'Pi',
};
