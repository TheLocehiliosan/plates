import { createContext } from 'react';
import type { ComboFind } from '../games/combos';
import type { AppState, VariantId } from '../games/types';

export interface RecordFindResult {
  success: boolean;
  recorded: ComboFind[];
  comboGroupId?: string;
  newlyCompleted: VariantId[];
}

export interface ProgressContextValue {
  state: AppState;
  recordFind: (variantId: VariantId, note?: string) => RecordFindResult;
  undoLast: (variantId: VariantId) => boolean;
  setPosition: (variantId: VariantId, progressIndex: number) => boolean;
  markWinCelebrated: (variantId: VariantId) => void;
  restoreBackup: (state: AppState) => void;
}

export const ProgressContext = createContext<ProgressContextValue | null>(null);
