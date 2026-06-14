import { VARIANT_IDS, type AppState, type VariantId } from '../games/types';

export const STORAGE_KEY = 'plate-pursuit:v1';

function createEmptyState(): AppState {
  return {
    version: 1,
    variants: VARIANT_IDS.reduce(
      (acc, id) => {
        acc[id] = { entries: [] };
        return acc;
      },
      {} as AppState['variants'],
    ),
  };
}

function isVariantId(value: string): value is VariantId {
  return VARIANT_IDS.includes(value as VariantId);
}

function normalizeState(raw: unknown): AppState {
  const empty = createEmptyState();
  if (!raw || typeof raw !== 'object') {
    return empty;
  }

  const candidate = raw as Partial<AppState>;
  if (candidate.version !== 1 || !candidate.variants) {
    return empty;
  }

  for (const id of VARIANT_IDS) {
    const progress = candidate.variants[id];
    if (!progress || !Array.isArray(progress.entries)) {
      continue;
    }

    empty.variants[id].entries = progress.entries
      .filter(
        (entry): entry is { target: string; foundAt: string; note?: string } =>
          !!entry &&
          typeof entry === 'object' &&
          typeof entry.target === 'string' &&
          typeof entry.foundAt === 'string' &&
          (entry.note === undefined || typeof entry.note === 'string'),
      )
      .map((entry) => ({
        target: entry.target,
        foundAt: entry.foundAt,
        note: entry.note?.trim() || undefined,
      }));
  }

  return empty;
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createEmptyState();
    }
    return normalizeState(JSON.parse(raw));
  } catch {
    return createEmptyState();
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function isValidVariantId(value: string | undefined): value is VariantId {
  return !!value && isVariantId(value);
}

export { createEmptyState };
