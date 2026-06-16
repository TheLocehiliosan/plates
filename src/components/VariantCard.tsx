import { Link } from 'react-router-dom';
import { ElementTargetDisplay } from './ElementTargetDisplay';
import { RoadSign } from './RoadSign';
import { formatProgressCount, formatTargetDisplay } from '../games/format';
import { getTotalFoundCount } from '../games/progress';
import { getPiDigitsFound } from '../games/sequences/pi';
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
    <Link to={`/variant/${variantId}`} className={styles.cardLink}>
      <RoadSign
        label={SHORT_NAMES[variantId]}
        footer={formatProgressCount(
          variantId,
          variantId === 'pi' ? getPiDigitsFound(foundCount) : foundCount,
          variant.totalSteps,
        )}
        complete={isComplete}
      >
        {isComplete && <span className={styles.completeTarget}>✓</span>}
        {!isComplete && variantId === 'elements' && nextTarget && (
          <ElementTargetDisplay
            symbol={nextTarget}
            size="small"
            onSign
            stopPropagation
          />
        )}
        {!isComplete && variantId !== 'elements' && nextTarget && (
          <span
            className={`${styles.target} ${isLongTarget ? styles.targetLong : ''}`}
          >
            {formatTargetDisplay(variantId, nextTarget)}
          </span>
        )}
      </RoadSign>
    </Link>
  );
}
