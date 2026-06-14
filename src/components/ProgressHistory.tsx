import { formatDate, formatPriorCount, formatTargetDisplay } from '../games/format';
import { getLearnMoreLink } from '../games/links';
import type { ProgressEntry, VariantId } from '../games/types';
import { ElementTargetDisplay } from './ElementTargetDisplay';
import { LearnMoreLink } from './LearnMoreLink';
import styles from './ProgressHistory.module.css';

interface ProgressHistoryProps {
  variantId: VariantId;
  priorCount: number;
  entries: ProgressEntry[];
}

export function ProgressHistory({
  variantId,
  priorCount,
  entries,
}: ProgressHistoryProps) {
  const hasPrior = priorCount > 0;
  const hasTracked = entries.length > 0;

  if (!hasPrior && !hasTracked) {
    return (
      <div className={styles.empty}>
        <p>No finds recorded yet.</p>
        <p className={styles.hint}>
          When you spot the current target on a plate, tap Found it! to log your
          progress. Already playing? Set your starting position above.
        </p>
      </div>
    );
  }

  const reversed = [...entries].reverse();

  return (
    <div className={styles.history}>
      {hasPrior && (
        <div className={styles.priorSummary}>
          <span className={styles.priorLabel}>Before tracking</span>
          <span className={styles.priorText}>{formatPriorCount(priorCount)}</span>
        </div>
      )}

      {hasTracked && (
        <>
          {hasPrior && <h3 className={styles.subheading}>Tracked finds</h3>}
          <ul className={styles.list}>
            {reversed.map((entry, index) => {
              const learnMore = getLearnMoreLink(variantId, entry.target);
              return (
                <li
                  key={`${entry.foundAt}-${entries.length - index}`}
                  className={styles.item}
                >
                  <div className={styles.row}>
                  {variantId === 'elements' ? (
                    <ElementTargetDisplay symbol={entry.target} size="medium" />
                  ) : (
                    <span className={styles.target}>
                      {formatTargetDisplay(variantId, entry.target)}
                    </span>
                  )}
                    <span className={styles.date}>{formatDate(entry.foundAt)}</span>
                  </div>
                  {learnMore && <LearnMoreLink link={learnMore} />}
                  {entry.note && <p className={styles.note}>{entry.note}</p>}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
