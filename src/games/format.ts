import type { VariantId } from './types';
import { getPiDigitsFound } from './sequences/pi';

export interface ProgressCountOptions {
  totalSteps?: number;
  showTotalSteps?: boolean;
  isComplete?: boolean;
}

export function formatProgressCount(
  variantId: VariantId,
  foundCount: number,
  options?: ProgressCountOptions,
): string {
  const { totalSteps, showTotalSteps = true, isComplete = false } = options ?? {};

  if (isComplete && variantId !== 'pi') {
    return 'Complete';
  }

  if (variantId === 'pi') {
    if (foundCount === 1) {
      return '1 digit of π found';
    }
    return `${foundCount} digits of π found`;
  }

  if (totalSteps !== undefined && showTotalSteps) {
    return `${foundCount} / ${totalSteps} found`;
  }
  return `${foundCount} found`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export function formatPriorCount(variantId: VariantId, count: number): string {
  if (count === 0) {
    return '';
  }

  if (variantId === 'pi') {
    if (count === 1) {
      return '1 digit of π before tracking';
    }
    return `${count} digits of π before tracking`;
  }

  if (count === 1) {
    return '1 find before tracking';
  }
  return `${count} finds before tracking`;
}

export function formatTrackedSummary(
  variantId: VariantId,
  priorCount: number,
  trackedCount: number,
  options?: ProgressCountOptions,
): string {
  const progressIndex = priorCount + trackedCount;
  const displayCount =
    variantId === 'pi' ? getPiDigitsFound(progressIndex) : progressIndex;
  const { totalSteps, showTotalSteps = true, isComplete = false } = options ?? {};

  if (isComplete && showTotalSteps === false && variantId !== 'pi') {
    return `${displayCount} found · Complete`;
  }

  if (isComplete && totalSteps !== undefined && variantId !== 'pi') {
    return `${displayCount} / ${totalSteps} found`;
  }

  return formatProgressCount(variantId, displayCount, {
    totalSteps,
    showTotalSteps,
    isComplete: false,
  });
}

export function formatPriorCountForProgress(
  variantId: VariantId,
  progressIndex: number,
): string {
  const displayCount =
    variantId === 'pi' ? getPiDigitsFound(progressIndex) : progressIndex;
  return formatPriorCount(variantId, displayCount);
}

/** Display form shown in the UI (plates use uppercase element symbols). */
export function formatTargetDisplay(variantId: VariantId, target: string): string {
  if (variantId === 'elements') {
    return target.toUpperCase();
  }
  return target;
}
