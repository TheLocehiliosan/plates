export type FlavorCategory =
  | 'pop-culture'
  | 'history'
  | 'math'
  | 'internet'
  | 'pattern'
  | 'science';

export interface Flavor {
  text: string;
  source?: string;
  category: FlavorCategory;
}

/** @deprecated Use {@link Flavor} */
export type ClassicFlavor = Flavor;

export const FLAVOR_CATEGORY_LABELS: Record<FlavorCategory, string> = {
  'pop-culture': 'Pop culture',
  history: 'History',
  math: 'Math',
  internet: 'Internet',
  pattern: 'Pattern',
  science: 'Science',
};
