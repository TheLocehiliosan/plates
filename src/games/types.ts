export type VariantId =
  | 'classic'
  | 'decimal'
  | 'hex'
  | 'binary'
  | 'elements'
  | 'pi';

export const VARIANT_IDS: VariantId[] = [
  'classic',
  'decimal',
  'hex',
  'binary',
  'elements',
  'pi',
];

export interface ProgressEntry {
  target: string;
  foundAt: string;
  note?: string;
  /** Links entries recorded together in a cross-game combo find. */
  comboGroupId?: string;
}

export interface VariantProgress {
  priorCount: number;
  entries: ProgressEntry[];
  /** When the user started logging finds in the app (ISO string). */
  trackedSince?: string;
  /** When the winning find was logged (ISO string). */
  completedAt?: string;
  /** Whether the one-time win celebration has been shown. */
  winCelebrated?: boolean;
}

export interface AppState {
  version: 4;
  variants: Record<VariantId, VariantProgress>;
}

export type MatchRule = 'endAnchored' | 'anywhere';

export interface VariantDefinition {
  id: VariantId;
  name: string;
  shortDescription: string;
  matchRule: MatchRule;
  matchRuleHint: string;
  getTarget: (index: number) => string | null;
  isComplete: (index: number) => boolean;
  totalSteps?: number;
  /** When false, progress shows "N found" instead of "N / totalSteps found". Default true. */
  showTotalSteps?: boolean;
  /** Message shown on the complete road sign in variant detail. */
  completeTitle?: string;
}

export type SetPositionMode = 'nextTarget' | 'lastFound';
