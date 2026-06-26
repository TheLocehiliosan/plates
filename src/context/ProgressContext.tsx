import { useCallback, useMemo, useState, type ReactNode } from 'react';
import {
  createComboGroupId,
  getComboFinds,
  getTotalComboEntryCount,
} from '../games/combos';
import { getProgressIndex } from '../games/progress';
import { getNextTarget, getVariant } from '../games/registry';
import { VARIANT_IDS, type AppState, type VariantId } from '../games/types';
import { loadState, saveState } from '../storage/progressStore';
import {
  ProgressContext,
  type RecordFindResult,
} from './progress-context';

function applyComboFinds(
  state: AppState,
  comboFinds: ReturnType<typeof getComboFinds>,
  note: string | undefined,
  now: string,
  comboGroupId: string | undefined,
): { next: AppState; newlyCompleted: VariantId[] } {
  const newlyCompleted: VariantId[] = [];
  const variants = { ...state.variants };

  for (const { variantId, targets } of comboFinds) {
    const progress = variants[variantId];
    const variant = getVariant(variantId);
    const startIndex = getProgressIndex(progress);
    const newEntries = [...progress.entries];

    for (const target of targets) {
      newEntries.push({
        target,
        foundAt: now,
        note,
        comboGroupId,
      });
    }

    const newProgressIndex = startIndex + targets.length;
    const willComplete = variant.isComplete(newProgressIndex);
    const wasComplete = variant.isComplete(startIndex);

    if (willComplete && !wasComplete) {
      newlyCompleted.push(variantId);
    }

    variants[variantId] = {
      ...progress,
      trackedSince: progress.trackedSince ?? now,
      ...(willComplete ? { completedAt: now, winCelebrated: false } : {}),
      entries: newEntries,
    };
  }

  return { next: { ...state, variants }, newlyCompleted };
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => loadState());

  const persist = useCallback((next: AppState) => {
    setState(next);
    saveState(next);
  }, []);

  const recordFind = useCallback(
    (variantId: VariantId, note?: string): RecordFindResult => {
      const comboFinds = getComboFinds(variantId, state);
      const sourceFind = comboFinds.find((find) => find.variantId === variantId);

      if (!sourceFind || sourceFind.targets.length === 0) {
        return { success: false, recorded: [], newlyCompleted: [] };
      }

      const trimmedNote = note?.trim();
      const entryNote = trimmedNote || undefined;
      const now = new Date().toISOString();
      const totalEntries = getTotalComboEntryCount(comboFinds);
      const comboGroupId =
        totalEntries > 1 ? createComboGroupId() : undefined;

      const { next, newlyCompleted } = applyComboFinds(
        state,
        comboFinds,
        entryNote,
        now,
        comboGroupId,
      );

      persist(next);

      return {
        success: true,
        recorded: comboFinds,
        comboGroupId,
        newlyCompleted,
      };
    },
    [persist, state],
  );

  const undoLast = useCallback(
    (variantId: VariantId) => {
      const progress = state.variants[variantId];
      if (progress.entries.length === 0) {
        return false;
      }

      const lastEntry = progress.entries[progress.entries.length - 1];
      const comboGroupId = lastEntry?.comboGroupId;

      if (comboGroupId) {
        const variants = { ...state.variants };

        for (const id of VARIANT_IDS) {
          const variantProgress = variants[id];
          const variant = getVariant(id);
          const filtered = variantProgress.entries.filter(
            (entry) => entry.comboGroupId !== comboGroupId,
          );

          if (filtered.length === variantProgress.entries.length) {
            continue;
          }

          const wasComplete = variant.isComplete(getProgressIndex(variantProgress));
          const newProgressIndex =
            variantProgress.priorCount + filtered.length;
          const isCompleteNow = variant.isComplete(newProgressIndex);

          variants[id] = {
            ...variantProgress,
            entries: filtered,
            ...(wasComplete && !isCompleteNow
              ? { completedAt: undefined, winCelebrated: undefined }
              : {}),
          };
        }

        persist({ ...state, variants });
        return true;
      }

      const variant = getVariant(variantId);
      const wasComplete = variant.isComplete(getProgressIndex(progress));
      const newEntries = progress.entries.slice(0, -1);
      const newProgressIndex = progress.priorCount + newEntries.length;
      const isCompleteNow = variant.isComplete(newProgressIndex);

      persist({
        ...state,
        variants: {
          ...state.variants,
          [variantId]: {
            ...progress,
            entries: newEntries,
            ...(wasComplete && !isCompleteNow
              ? { completedAt: undefined, winCelebrated: undefined }
              : {}),
          },
        },
      });

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
            completedAt: undefined,
            winCelebrated: undefined,
          },
        },
      };

      persist(next);
      return true;
    },
    [persist, state],
  );

  const markWinCelebrated = useCallback(
    (variantId: VariantId) => {
      const progress = state.variants[variantId];
      if (progress.winCelebrated) {
        return;
      }

      persist({
        ...state,
        variants: {
          ...state.variants,
          [variantId]: {
            ...progress,
            winCelebrated: true,
          },
        },
      });
    },
    [persist, state],
  );

  const restoreBackup = useCallback(
    (next: AppState) => {
      persist(next);
    },
    [persist],
  );

  const value = useMemo(
    () => ({
      state,
      recordFind,
      undoLast,
      setPosition,
      markWinCelebrated,
      restoreBackup,
    }),
    [markWinCelebrated, recordFind, restoreBackup, setPosition, state, undoLast],
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}
