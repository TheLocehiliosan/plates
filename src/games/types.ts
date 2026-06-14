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
}

export interface VariantProgress {
  priorCount: number;
  entries: ProgressEntry[];
  /** When the user started logging finds in the app (ISO string). */
  trackedSince?: string;
}

export interface AppState {
  version: 2;
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
}

export type SetPositionMode = 'nextTarget' | 'lastFound';
