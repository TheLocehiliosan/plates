import { formatDate } from '../games/format';
import type { ProgressEntry } from '../games/types';
import styles from './ProgressHistory.module.css';

interface ProgressHistoryProps {
  entries: ProgressEntry[];
}

export function ProgressHistory({ entries }: ProgressHistoryProps) {
  if (entries.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No finds recorded yet.</p>
        <p className={styles.hint}>
          When you spot the current target on a plate, tap Found it! to log your
          progress.
        </p>
      </div>
    );
  }

  const reversed = [...entries].reverse();

  return (
    <ul className={styles.list}>
      {reversed.map((entry, index) => (
        <li key={`${entry.foundAt}-${entries.length - index}`} className={styles.item}>
          <div className={styles.row}>
            <span className={styles.target}>{entry.target}</span>
            <span className={styles.date}>{formatDate(entry.foundAt)}</span>
          </div>
          {entry.note && <p className={styles.note}>{entry.note}</p>}
        </li>
      ))}
    </ul>
  );
}
