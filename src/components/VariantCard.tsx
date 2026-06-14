import { Link } from 'react-router-dom';
import { formatMatchRule, formatProgressCount } from '../games/format';
import { getNextTarget, getVariant } from '../games/registry';
import type { VariantId } from '../games/types';
import { useProgress } from '../context/useProgress';
import styles from './VariantCard.module.css';

interface VariantCardProps {
  variantId: VariantId;
}

export function VariantCard({ variantId }: VariantCardProps) {
  const { state } = useProgress();
  const variant = getVariant(variantId);
  const foundCount = state.variants[variantId].entries.length;
  const isComplete = variant.isComplete(foundCount);
  const nextTarget = getNextTarget(variantId, foundCount);

  return (
    <Link to={`/variant/${variantId}`} className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{variant.name}</h2>
        {isComplete && <span className={styles.badge}>Complete</span>}
      </div>
      <p className={styles.description}>{variant.shortDescription}</p>
      <div className={styles.targetBlock}>
        <span className={styles.targetLabel}>
          {isComplete ? 'Finished' : 'Looking for'}
        </span>
        <span className={styles.target}>{isComplete ? '✓' : nextTarget}</span>
      </div>
      <div className={styles.footer}>
        <span>{formatProgressCount(foundCount, variant.totalSteps)}</span>
        <span className={styles.rule}>{formatMatchRule(variant)}</span>
      </div>
    </Link>
  );
}
