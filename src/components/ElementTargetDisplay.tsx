import { useState, type MouseEvent } from 'react';
import { formatTargetDisplay } from '../games/format';
import { getElementAtomicNumber, getElementName } from '../games/sequences/elements';
import { PeriodicTableModal } from './PeriodicTableModal';
import styles from './ElementTargetDisplay.module.css';

interface ElementTargetDisplayProps {
  symbol: string;
  size?: 'large' | 'medium' | 'small';
  /** Stop click from bubbling (e.g. inside a link card). */
  stopPropagation?: boolean;
}

export function ElementTargetDisplay({
  symbol,
  size = 'medium',
  stopPropagation = false,
}: ElementTargetDisplayProps) {
  const [showTable, setShowTable] = useState(false);
  const displaySymbol = formatTargetDisplay('elements', symbol);
  const atomicNumber = getElementAtomicNumber(symbol);
  const name = getElementName(symbol);

  function openTable(event?: MouseEvent) {
    if (stopPropagation && event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (atomicNumber !== null) {
      setShowTable(true);
    }
  }

  return (
    <>
      <span
        className={`${styles.display} ${styles[size]}`}
        title={name ?? undefined}
      >
        <span className={styles.symbol}>{displaySymbol}</span>
        {atomicNumber !== null && (
          <button
            type="button"
            className={styles.atomicButton}
            onClick={openTable}
            aria-label={`Atomic number ${atomicNumber}${name ? `, ${name}` : ''}. Show periodic table.`}
            title="Show on periodic table"
          >
            {atomicNumber}
          </button>
        )}
      </span>

      {showTable && atomicNumber !== null && (
        <PeriodicTableModal
          atomicNumber={atomicNumber}
          onClose={() => setShowTable(false)}
        />
      )}
    </>
  );
}
