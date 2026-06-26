import { VARIANT_IDS, type AppState, type VariantId } from '../games/types';

export const STORAGE_KEY = 'plate-pursuit:v1';

function emptyVariantProgress(): AppState['variants'][VariantId] {
  return { priorCount: 0, entries: [] };
}

function createEmptyState(): AppState {
  return {
    version: 3,
    variants: VARIANT_IDS.reduce(
      (acc, id) => {
        acc[id] = emptyVariantProgress();
        return acc;
      },
      {} as AppState['variants'],
    ),
  };
}

function isVariantId(value: string): value is VariantId {
  return VARIANT_IDS.includes(value as VariantId);
}

function normalizeEntries(raw: unknown): AppState['variants'][VariantId]['entries'] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw
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

function normalizeVariantProgress(raw: unknown): AppState['variants'][VariantId] {
  const base = emptyVariantProgress();
  if (!raw || typeof raw !== 'object') {
    return base;
  }

  const candidate = raw as {
    priorCount?: unknown;
    entries?: unknown;
    trackedSince?: unknown;
    completedAt?: unknown;
    winCelebrated?: unknown;
  };

  if (typeof candidate.priorCount === 'number' && candidate.priorCount >= 0) {
    base.priorCount = Math.floor(candidate.priorCount);
  }

  base.entries = normalizeEntries(candidate.entries);

  if (typeof candidate.trackedSince === 'string' && candidate.trackedSince) {
    base.trackedSince = candidate.trackedSince;
  }

  if (typeof candidate.completedAt === 'string' && candidate.completedAt) {
    base.completedAt = candidate.completedAt;
  }

  if (candidate.winCelebrated === true) {
    base.winCelebrated = true;
  }

  return base;
}

function normalizeState(raw: unknown): AppState {
  const empty = createEmptyState();
  if (!raw || typeof raw !== 'object') {
    return empty;
  }

  const candidate = raw as { version?: unknown; variants?: unknown };
  if (!candidate.variants || typeof candidate.variants !== 'object') {
    return empty;
  }

  const version = candidate.version;

  for (const id of VARIANT_IDS) {
    const progress = (candidate.variants as Record<string, unknown>)[id];
    if (version === 1) {
      empty.variants[id] = {
        priorCount: 0,
        entries: normalizeEntries(
          progress && typeof progress === 'object'
            ? (progress as { entries?: unknown }).entries
            : [],
        ),
      };
    } else if (version === 2 || version === 3) {
      empty.variants[id] = normalizeVariantProgress(progress);
    }
  }

  if (version !== 1 && version !== 2 && version !== 3) {
    return createEmptyState();
  }

  return empty;
}

export function parseBackupData(raw: unknown): AppState | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const candidate = raw as { version?: unknown; variants?: unknown };
  if (candidate.version !== 1 && candidate.version !== 2 && candidate.version !== 3) {
    return null;
  }
  if (!candidate.variants || typeof candidate.variants !== 'object') {
    return null;
  }

  return normalizeState(raw);
}

export function serializeState(state: AppState): string {
  return JSON.stringify(state, null, 2);
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createEmptyState();
    }
    const state = normalizeState(JSON.parse(raw));
    if (state.version !== 3) {
      saveState({ ...state, version: 3 });
    }
    return { ...state, version: 3 };
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
