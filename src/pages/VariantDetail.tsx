import { Link, Navigate, useParams } from 'react-router-dom';
import { FoundItForm } from '../components/FoundItForm';
import { ProgressHistory } from '../components/ProgressHistory';
import { useProgress } from '../context/useProgress';
import { formatMatchRule, formatProgressCount } from '../games/format';
import { getNextTarget, getVariant } from '../games/registry';
import { isValidVariantId } from '../storage/progressStore';
import styles from './VariantDetail.module.css';

export function VariantDetail() {
  const { variantId: variantIdParam } = useParams();
  const { state, recordFind, undoLast } = useProgress();

  if (!isValidVariantId(variantIdParam)) {
    return <Navigate to="/" replace />;
  }

  const variantId = variantIdParam;
  const variant = getVariant(variantId);
  const entries = state.variants[variantId].entries;
  const foundCount = entries.length;
  const isComplete = variant.isComplete(foundCount);
  const nextTarget = getNextTarget(variantId, foundCount);

  return (
    <div className={styles.detail}>
      <Link to="/" className={styles.back}>
        ← Back to dashboard
      </Link>

      <header className={styles.header}>
        <h1 className={styles.title}>{variant.name}</h1>
        <p className={styles.description}>{variant.shortDescription}</p>
        <p className={styles.progress}>
          {formatProgressCount(foundCount, variant.totalSteps)}
        </p>
      </header>

      <section className={styles.current}>
        {isComplete ? (
          <div className={styles.complete}>
            <span className={styles.completeIcon}>✓</span>
            <h2 className={styles.completeTitle}>Complete!</h2>
            <p className={styles.completeText}>
              {variantId === 'classic'
                ? 'You reached 999. A lifetime achievement.'
                : 'You completed the full periodic table.'}
            </p>
          </div>
        ) : (
          <>
            <p className={styles.lookingLabel}>Looking for</p>
            <p className={styles.target}>{nextTarget}</p>
            <p className={styles.hint}>{variant.matchRuleHint}</p>
            <p className={styles.rule}>{formatMatchRule(variant)}</p>
          </>
        )}
      </section>

      {!isComplete && (
        <section className={styles.actions}>
          <FoundItForm onSubmit={(note) => recordFind(variantId, note)} />
          {foundCount > 0 && (
            <button
              type="button"
              className={styles.undoButton}
              onClick={() => undoLast(variantId)}
            >
              Undo last find
            </button>
          )}
        </section>
      )}

      <section className={styles.historySection}>
        <h2 className={styles.historyTitle}>History</h2>
        <ProgressHistory entries={entries} />
      </section>
    </div>
  );
}
