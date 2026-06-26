import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ComboFindModal } from '../components/ComboFindModal';
import { FoundItForm } from '../components/FoundItForm';
import { ElementTargetDisplay } from '../components/ElementTargetDisplay';
import { PiProgressDisplay } from '../components/PiProgressDisplay';
import { FlavorModal } from '../components/FlavorModal';
import { LearnMoreLink } from '../components/LearnMoreLink';
import { ProgressHistory } from '../components/ProgressHistory';
import { RoadSign } from '../components/RoadSign';
import { SetStartingPosition } from '../components/SetStartingPosition';
import { WinModal } from '../components/WinModal';
import { useProgress } from '../context/useProgress';
import {
  countVariantsInComboGroup,
  hasCrossVariantComboFinds,
} from '../games/combos';
import type { ComboFind } from '../games/combos';
import { getClassicFlavor } from '../games/flavor/classic';
import { getCountingWinCopy, isCountingWinVariant } from '../games/flavor/counting';
import { getElementFlavorWithName } from '../games/flavor/elements';
import type { Flavor } from '../games/flavor/types';
import { formatDate, formatTrackedSummary, formatTargetDisplay } from '../games/format';
import { getLearnMoreLink } from '../games/links';
import { getProgressIndex } from '../games/progress';
import { getNextTarget, getVariant } from '../games/registry';
import type { VariantId } from '../games/types';
import { isValidVariantId } from '../storage/progressStore';
import styles from './VariantDetail.module.css';

interface FlavorReveal {
  target: string;
  flavor: Flavor;
  subtitle?: string;
}

interface ComboReveal {
  primaryTarget: string;
  recorded: ComboFind[];
}

function buildFlavorQueue(
  variantId: VariantId,
  recorded: ComboFind[],
): FlavorReveal[] {
  const sourceFind = recorded.find((find) => find.variantId === variantId);
  if (!sourceFind) {
    return [];
  }

  const reveals: FlavorReveal[] = [];

  for (const target of sourceFind.targets) {
    if (variantId === 'classic') {
      const flavor = getClassicFlavor(target);
      if (flavor) {
        reveals.push({ target, flavor });
      }
    } else if (variantId === 'elements') {
      const elementFlavor = getElementFlavorWithName(target);
      if (elementFlavor) {
        reveals.push({
          target: formatTargetDisplay(variantId, target),
          flavor: elementFlavor.flavor,
          subtitle: elementFlavor.name,
        });
      }
    }
  }

  return reveals;
}

export function VariantDetail() {
  const { variantId: variantIdParam } = useParams();
  const { state, recordFind, undoLast, setPosition, markWinCelebrated } =
    useProgress();
  const [flavorQueue, setFlavorQueue] = useState<FlavorReveal[]>([]);
  const [comboReveal, setComboReveal] = useState<ComboReveal | null>(null);
  const [winQueue, setWinQueue] = useState<VariantId[]>([]);
  const activeFlavor = flavorQueue[0];

  const isValid = isValidVariantId(variantIdParam);
  const variantId: VariantId = isValid ? variantIdParam : 'classic';
  const variant = getVariant(variantId);
  const progress = state.variants[variantId];
  const { priorCount, entries, completedAt, winCelebrated } = progress;
  const progressIndex = getProgressIndex(progress);
  const isComplete = variant.isComplete(progressIndex);
  const nextTarget = getNextTarget(variantId, progressIndex);
  const winCopy = getCountingWinCopy(variantId);
  const activeWinVariant = winQueue[0];
  const activeWinCopy = activeWinVariant
    ? getCountingWinCopy(activeWinVariant)
    : null;
  const shouldShowReturnWinModal =
    isValid &&
    isComplete &&
    !!completedAt &&
    !winCelebrated &&
    !!winCopy &&
    winQueue.length === 0 &&
    !comboReveal &&
    flavorQueue.length === 0;

  const lastEntry = entries[entries.length - 1];
  const comboUndoCount = lastEntry?.comboGroupId
    ? countVariantsInComboGroup(state, lastEntry.comboGroupId)
    : 0;

  if (!isValid) {
    return <Navigate to="/" replace />;
  }

  const currentLearnMore =
    nextTarget !== null ? getLearnMoreLink(variantId, nextTarget) : null;
  const progressOptions = {
    totalSteps: variant.totalSteps,
    showTotalSteps: variant.showTotalSteps,
    isComplete,
  };

  function enqueueWinModals(newlyCompleted: VariantId[]) {
    const countingWins = newlyCompleted.filter(isCountingWinVariant);
    if (countingWins.length > 0) {
      setWinQueue((queue) => [...queue, ...countingWins]);
    }
  }

  function handleWinModalClose() {
    if (activeWinVariant) {
      markWinCelebrated(activeWinVariant);
      setWinQueue((queue) => queue.slice(1));
      return;
    }
    markWinCelebrated(variantId);
  }

  function handleComboClose() {
    setComboReveal(null);
  }

  function handleFlavorClose() {
    setFlavorQueue((queue) => queue.slice(1));
  }

  function handleFound(note?: string) {
    if (!nextTarget) {
      return;
    }

    const foundTarget = nextTarget;
    const result = recordFind(variantId, note);

    if (!result.success) {
      return;
    }

    if (hasCrossVariantComboFinds(variantId, result.recorded)) {
      setComboReveal({
        primaryTarget: foundTarget,
        recorded: result.recorded,
      });
    }

    setFlavorQueue(buildFlavorQueue(variantId, result.recorded));

    enqueueWinModals(result.newlyCompleted);
  }

  const showComboModal = comboReveal !== null;
  const showFlavorModal = activeFlavor !== undefined && !showComboModal;
  const showQueuedWinModal =
    activeWinVariant !== undefined && activeWinCopy !== null && !showComboModal && !showFlavorModal;

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
            progressOptions,
          )}
        </p>
        {completedAt && (
          <p className={styles.completedAt}>Completed {formatDate(completedAt)}</p>
        )}
      </header>

      <section className={styles.current}>
        {isComplete ? (
          <RoadSign label="Complete" size="large" complete className={styles.detailSign}>
            <div className={styles.completeSignBody}>
              <span className={styles.completeIcon}>✓</span>
              <p className={styles.completeTitle}>
                {variant.completeTitle ?? 'Maximum plate reached'}
              </p>
            </div>
          </RoadSign>
        ) : (
          <>
            <RoadSign label="Looking for" size="large" className={styles.detailSign}>
              {variantId === 'elements' && nextTarget ? (
                <ElementTargetDisplay symbol={nextTarget} size="large" onSign />
              ) : (
                <p className={styles.target}>
                  {nextTarget && formatTargetDisplay(variantId, nextTarget)}
                </p>
              )}
            </RoadSign>
            <div className={styles.belowSign}>
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
            </div>
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
              {comboUndoCount > 1
                ? `Undo last find (${comboUndoCount} games)`
                : 'Undo last find'}
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

      {showComboModal && comboReveal && (
        <ComboFindModal
          primaryTarget={comboReveal.primaryTarget}
          sourceVariantId={variantId}
          recorded={comboReveal.recorded}
          onClose={handleComboClose}
        />
      )}

      {showFlavorModal && activeFlavor && (
        <FlavorModal
          target={activeFlavor.target}
          flavor={activeFlavor.flavor}
          subtitle={activeFlavor.subtitle}
          onClose={handleFlavorClose}
        />
      )}

      {showQueuedWinModal && activeWinCopy && (
        <WinModal
          target={activeWinCopy.target}
          message={activeWinCopy.message}
          onClose={handleWinModalClose}
        />
      )}

      {shouldShowReturnWinModal && winCopy && (
        <WinModal
          target={winCopy.target}
          message={winCopy.message}
          onClose={handleWinModalClose}
        />
      )}
    </div>
  );
}
