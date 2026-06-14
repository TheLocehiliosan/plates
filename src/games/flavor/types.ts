export type FlavorCategory =
  | 'pop-culture'
  | 'history'
  | 'math'
  | 'internet'
  | 'pattern';

export interface ClassicFlavor {
  text: string;
  source?: string;
  category: FlavorCategory;
}

export const FLAVOR_CATEGORY_LABELS: Record<FlavorCategory, string> = {
  'pop-culture': 'Pop culture',
  history: 'History',
  math: 'Math',
  internet: 'Internet',
  pattern: 'Pattern',
};
