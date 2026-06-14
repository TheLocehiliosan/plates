import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { getProgressIndex } from '../games/progress';
import { getNextTarget, getVariant } from '../games/registry';
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
      const progressIndex = getProgressIndex(progress);
      const nextTarget = getNextTarget(variantId, progressIndex);
      if (!nextTarget) {
        return false;
      }

      const trimmedNote = note?.trim();
      const now = new Date().toISOString();
      const next: AppState = {
        ...state,
        variants: {
          ...state.variants,
          [variantId]: {
            ...progress,
            trackedSince: progress.trackedSince ?? now,
            entries: [
              ...progress.entries,
              {
                target: nextTarget,
                foundAt: now,
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
            ...progress,
            entries: progress.entries.slice(0, -1),
          },
        },
      };

      persist(next);
      return true;
    },
    [persist, state],
  );

  const setPosition = useCallback(
    (variantId: VariantId, progressIndex: number) => {
      const variant = getVariant(variantId);
      if (progressIndex < 0) {
        return false;
      }
      if (variant.totalSteps !== undefined && progressIndex > variant.totalSteps) {
        return false;
      }
      if (variant.isComplete(progressIndex)) {
        // Allow setting to complete state only if it's exactly totalSteps
        if (progressIndex !== variant.totalSteps) {
          return false;
        }
      } else if (getNextTarget(variantId, progressIndex) === null) {
        return false;
      }

      const next: AppState = {
        ...state,
        variants: {
          ...state.variants,
          [variantId]: {
            priorCount: progressIndex,
            entries: [],
            trackedSince: undefined,
          },
        },
      };

      persist(next);
      return true;
    },
    [persist, state],
  );

  const value = useMemo(
    () => ({ state, recordFind, undoLast, setPosition }),
    [recordFind, setPosition, state, undoLast],
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}
