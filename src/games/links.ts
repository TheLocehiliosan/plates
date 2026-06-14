import { getElementName } from './sequences/elements';
import type { VariantId } from './types';

export interface LearnMoreInfo {
  href: string;
  label: string;
}

function wikiUrl(title: string): string {
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`;
}

function targetToNumber(variantId: VariantId, target: string): number | null {
  switch (variantId) {
    case 'classic':
    case 'decimal':
    case 'pi': {
      const value = Number.parseInt(target, 10);
      return Number.isNaN(value) ? null : value;
    }
    case 'hex': {
      const value = Number.parseInt(target, 16);
      return Number.isNaN(value) ? null : value;
    }
    case 'binary': {
      const value = Number.parseInt(target, 2);
      return Number.isNaN(value) ? null : value;
    }
    default:
      return null;
  }
}

function numberWikiUrl(n: number): string {
  // Wikipedia redirects many integers; the _(number) form is common for facts pages.
  if (n >= 0 && n <= 9999) {
    return wikiUrl(`${n}_(number)`);
  }
  return wikiUrl(String(n));
}

export function getLearnMoreLink(
  variantId: VariantId,
  target: string,
): LearnMoreInfo | null {
  if (variantId === 'elements') {
    const name = getElementName(target);
    if (!name) {
      return null;
    }
    return {
      href: wikiUrl(name),
      label: `Read about ${name} on Wikipedia`,
    };
  }

  const value = targetToNumber(variantId, target);
  if (value === null || value < 0) {
    return null;
  }

  const display =
    variantId === 'hex' || variantId === 'binary' ? target : String(value);

  return {
    href: numberWikiUrl(value),
    label: `Interesting facts about ${display}`,
  };
}
