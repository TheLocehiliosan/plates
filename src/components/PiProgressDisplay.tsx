import {
  formatPiConfirmed,
  formatPiStreamTarget,
  getPiProgressView,
} from '../games/sequences/pi';
import styles from './PiProgressDisplay.module.css';

interface PiProgressDisplayProps {
  progressIndex: number;
}

export function PiProgressDisplay({ progressIndex }: PiProgressDisplayProps) {
  const view = getPiProgressView(progressIndex);

  if (!view) {
    return null;
  }

  const { confirmed, target, peek, hasMore, windowNumber } = view;
  const confirmedDisplay = formatPiConfirmed(confirmed);
  const targetDisplay = formatPiStreamTarget(target, progressIndex);

  return (
    <div className={styles.wrap}>
      <p className={styles.label}>Your progress through π</p>
      <p className={styles.position}>
        Window {windowNumber}
        {confirmed.length > 0 && (
          <>
            {' '}
            · {confirmed.length} digit{confirmed.length === 1 ? '' : 's'} found
          </>
        )}
      </p>
      <p
        className={styles.stream}
        aria-label={`Pi progress through digit ${progressIndex}, looking for ${target}`}
      >
        {confirmedDisplay && (
          <span className={styles.confirmed}>{confirmedDisplay}</span>
        )}
        <span className={styles.target}>{targetDisplay}</span>
        {peek.length > 0 && <span className={styles.peek}>{peek}</span>}
        {hasMore && <span className={styles.ellipsis}>…</span>}
      </p>
    </div>
  );
}
