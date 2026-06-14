import { useEffect } from 'react';
import { PERIODIC_TABLE_CELLS } from '../games/periodicTable';
import { getElementName } from '../games/sequences/elements';
import styles from './PeriodicTableModal.module.css';

interface PeriodicTableModalProps {
  atomicNumber: number;
  onClose: () => void;
}

export function PeriodicTableModal({
  atomicNumber,
  onClose,
}: PeriodicTableModalProps) {
  const highlight = PERIODIC_TABLE_CELLS.find(
    (cell) => cell.atomicNumber === atomicNumber,
  );
  const highlightName = highlight
    ? getElementName(highlight.symbol)
    : null;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="periodic-table-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <div>
            <h2 id="periodic-table-title" className={styles.title}>
              Periodic table
            </h2>
            {highlight && (
              <p className={styles.subtitle}>
                Highlighted: {highlight.symbol}
                {highlightName ? ` — ${highlightName}` : ''} ({atomicNumber})
              </p>
            )}
          </div>
          <button type="button" className={styles.close} onClick={onClose}>
            Close
          </button>
        </header>

        <div className={styles.tableWrap}>
          <div className={styles.table}>
            {PERIODIC_TABLE_CELLS.map((cell) => (
              <div
                key={cell.atomicNumber}
                className={`${styles.cell} ${
                  cell.atomicNumber === atomicNumber ? styles.highlighted : ''
                }`}
                style={{
                  gridRow: cell.row,
                  gridColumn: cell.col,
                }}
                title={`${cell.name} (${cell.atomicNumber})`}
              >
                <span className={styles.cellNumber}>{cell.atomicNumber}</span>
                <span className={styles.cellSymbol}>{cell.symbol}</span>
              </div>
            ))}
          </div>
        </div>

        <p className={styles.note}>
          Atomic numbers are for reference only — the game uses element symbols
          in order.
        </p>
      </div>
    </div>
  );
}
