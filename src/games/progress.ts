import { VARIANT_IDS, type AppState, type VariantProgress } from './types';

export function getProgressIndex(progress: VariantProgress): number {
  return progress.priorCount + progress.entries.length;
}

export function getTotalFoundCount(progress: VariantProgress): number {
  return getProgressIndex(progress);
}

export function getTotalFindsAcrossGames(state: AppState): number {
  return VARIANT_IDS.reduce(
    (total, id) => total + getTotalFoundCount(state.variants[id]),
    0,
  );
}
