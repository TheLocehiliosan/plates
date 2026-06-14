import { createContext } from 'react';
import type { AppState, VariantId } from '../games/types';

export interface ProgressContextValue {
  state: AppState;
  recordFind: (variantId: VariantId, note?: string) => boolean;
  undoLast: (variantId: VariantId) => boolean;
  setPosition: (variantId: VariantId, progressIndex: number) => boolean;
  restoreBackup: (state: AppState) => void;
}

export const ProgressContext = createContext<ProgressContextValue | null>(null);
