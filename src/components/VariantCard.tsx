import { Link } from 'react-router-dom';
import { ElementTargetDisplay } from './ElementTargetDisplay';
import { formatProgressCount, formatTargetDisplay } from '../games/format';
import { getTotalFoundCount } from '../games/progress';
import { getNextTarget, getVariant } from '../games/registry';
import type { VariantId } from '../games/types';
import { useProgress } from '../context/useProgress';
import styles from './VariantCard.module.css';

const SHORT_NAMES: Record<VariantId, string> = {
  classic: 'Classic',
  decimal: 'Decimal',
  hex: 'Hex',
  binary: 'Binary',
  elements: 'Elements',
  pi: 'Pi',
};

interface VariantCardProps {
  variantId: VariantId;
}

export function VariantCard({ variantId }: VariantCardProps) {
  const { state } = useProgress();
  const variant = getVariant(variantId);
  const progress = state.variants[variantId];
  const foundCount = getTotalFoundCount(progress);
  const isComplete = variant.isComplete(foundCount);
  const nextTarget = getNextTarget(variantId, foundCount);
  const isLongTarget = !isComplete && (nextTarget?.length ?? 0) > 5;

  return (
    <Link
      to={`/variant/${variantId}`}
      className={`${styles.cell} ${isComplete ? styles.complete : ''}`}
    >
      <span className={styles.label}>{SHORT_NAMES[variantId]}</span>
      <span
        className={`${styles.target} ${isLongTarget ? styles.targetLong : ''}`}
      >
        {isComplete && '✓'}
        {!isComplete && variantId === 'elements' && nextTarget && (
          <ElementTargetDisplay
            symbol={nextTarget}
            size="small"
            stopPropagation
          />
        )}
        {!isComplete &&
          variantId !== 'elements' &&
          nextTarget &&
          formatTargetDisplay(variantId, nextTarget)}
      </span>
      <span className={styles.count}>
        {formatProgressCount(foundCount, variant.totalSteps)}
      </span>
    </Link>
  );
}
