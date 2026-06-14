import type { VariantProgress } from './types';

export function getProgressIndex(progress: VariantProgress): number {
  return progress.priorCount + progress.entries.length;
}

export function getTotalFoundCount(progress: VariantProgress): number {
  return getProgressIndex(progress);
}
