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
  entries: ProgressEntry[];
}

export interface AppState {
  version: 1;
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
