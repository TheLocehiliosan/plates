import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { getNextTarget } from '../games/registry';
import type { AppState, VariantId } from '../games/types';
import { loadState, saveState } from '../storage/progressStore';
import { ProgressContext } from './progress-context';

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => loadState());

  const persist = useCallback((next: AppState) => {
    setState(next);
    saveState(next);
  }, []);

  const recordFind = useCallback(
    (variantId: VariantId, note?: string) => {
      const progress = state.variants[variantId];
      const nextTarget = getNextTarget(variantId, progress.entries.length);
      if (!nextTarget) {
        return false;
      }

      const trimmedNote = note?.trim();
      const next: AppState = {
        ...state,
        variants: {
          ...state.variants,
          [variantId]: {
            entries: [
              ...progress.entries,
              {
                target: nextTarget,
                foundAt: new Date().toISOString(),
                note: trimmedNote || undefined,
              },
            ],
          },
        },
      };

      persist(next);
      return true;
    },
    [persist, state],
  );

  const undoLast = useCallback(
    (variantId: VariantId) => {
      const progress = state.variants[variantId];
      if (progress.entries.length === 0) {
        return false;
      }

      const next: AppState = {
        ...state,
        variants: {
          ...state.variants,
          [variantId]: {
            entries: progress.entries.slice(0, -1),
          },
        },
      };

      persist(next);
      return true;
    },
    [persist, state],
  );

  const value = useMemo(
    () => ({ state, recordFind, undoLast }),
    [recordFind, state, undoLast],
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}
