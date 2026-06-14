import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { FoundItForm } from '../components/FoundItForm';
import { ElementTargetDisplay } from '../components/ElementTargetDisplay';
import { PiProgressDisplay } from '../components/PiProgressDisplay';
import { FlavorModal } from '../components/FlavorModal';
import { LearnMoreLink } from '../components/LearnMoreLink';
import { ProgressHistory } from '../components/ProgressHistory';
import { SetStartingPosition } from '../components/SetStartingPosition';
import { useProgress } from '../context/useProgress';
import { getClassicFlavor } from '../games/flavor/classic';
import type { ClassicFlavor } from '../games/flavor/types';
import { formatTrackedSummary, formatTargetDisplay } from '../games/format';
import { getLearnMoreLink } from '../games/links';
import { getProgressIndex } from '../games/progress';
import { getNextTarget, getVariant } from '../games/registry';
import { isValidVariantId } from '../storage/progressStore';
import styles from './VariantDetail.module.css';

interface FlavorReveal {
  target: string;
  flavor: ClassicFlavor;
}

export function VariantDetail() {
  const { variantId: variantIdParam } = useParams();
  const { state, recordFind, undoLast, setPosition } = useProgress();
  const [flavorReveal, setFlavorReveal] = useState<FlavorReveal | null>(null);

  if (!isValidVariantId(variantIdParam)) {
    return <Navigate to="/" replace />;
  }

  const variantId = variantIdParam;
  const variant = getVariant(variantId);
  const progress = state.variants[variantId];
  const { priorCount, entries } = progress;
  const progressIndex = getProgressIndex(progress);
  const isComplete = variant.isComplete(progressIndex);
  const nextTarget = getNextTarget(variantId, progressIndex);
  const currentLearnMore =
    nextTarget !== null ? getLearnMoreLink(variantId, nextTarget) : null;

  function handleFound(note?: string) {
    if (!nextTarget) {
      return;
    }

    const foundTarget = nextTarget;
    const flavor =
      variantId === 'classic' ? getClassicFlavor(foundTarget) : null;
    const success = recordFind(variantId, note);

    if (success && flavor) {
      setFlavorReveal({ target: foundTarget, flavor });
    }
  }

  return (
    <div
      className={`${styles.detail} ${!isComplete ? styles.detailWithStickyActions : ''}`}
    >
      <Link to="/" className={styles.back}>
        ← Back to dashboard
      </Link>

      <header className={styles.header}>
        <h1 className={styles.title}>{variant.name}</h1>
        <p className={styles.description}>{variant.shortDescription}</p>
        <p className={styles.progress}>
          {formatTrackedSummary(
            variantId,
            priorCount,
            entries.length,
            variant.totalSteps,
          )}
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
            {variantId === 'elements' && nextTarget ? (
              <div className={styles.elementTarget}>
                <ElementTargetDisplay symbol={nextTarget} size="large" />
              </div>
            ) : (
              <p className={styles.target}>
                {nextTarget && formatTargetDisplay(variantId, nextTarget)}
              </p>
            )}
            {variantId === 'pi' && (
              <PiProgressDisplay progressIndex={progressIndex} />
            )}
            {currentLearnMore && <LearnMoreLink link={currentLearnMore} />}
            <p className={styles.hint}>{variant.matchRuleHint}</p>
            {variantId === 'elements' && (
              <p className={styles.elementHint}>
                Tap the atomic number to view the periodic table.
              </p>
            )}
          </>
        )}
      </section>

      {!isComplete && (
        <section className={styles.actions}>
          <FoundItForm onSubmit={handleFound} collapsibleNote />
          {entries.length > 0 && (
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

      <div className={styles.setPosition}>
        <SetStartingPosition
          variantId={variantId}
          hasTrackedEntries={entries.length > 0}
          onSetPosition={(index) => setPosition(variantId, index)}
        />
      </div>

      <section className={styles.historySection}>
        <h2 className={styles.historyTitle}>History</h2>
        <ProgressHistory
          variantId={variantId}
          priorCount={priorCount}
          entries={entries}
        />
      </section>

      {flavorReveal && (
        <FlavorModal
          target={flavorReveal.target}
          flavor={flavorReveal.flavor}
          onClose={() => setFlavorReveal(null)}
        />
      )}
    </div>
  );
}
