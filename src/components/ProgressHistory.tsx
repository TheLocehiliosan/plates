import { formatDate, formatPriorCount } from '../games/format';
import type { ProgressEntry } from '../games/types';
import styles from './ProgressHistory.module.css';

interface ProgressHistoryProps {
  priorCount: number;
  entries: ProgressEntry[];
}

export function ProgressHistory({ priorCount, entries }: ProgressHistoryProps) {
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
            {reversed.map((entry, index) => (
              <li
                key={`${entry.foundAt}-${entries.length - index}`}
                className={styles.item}
              >
                <div className={styles.row}>
                  <span className={styles.target}>{entry.target}</span>
                  <span className={styles.date}>{formatDate(entry.foundAt)}</span>
                </div>
                {entry.note && <p className={styles.note}>{entry.note}</p>}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
