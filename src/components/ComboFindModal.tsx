import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  COMBO_GAME_SHORT_NAMES,
  type ComboFind,
} from '../games/combos';
import { formatTargetDisplay } from '../games/format';
import type { VariantId } from '../games/types';
import styles from './ComboFindModal.module.css';

interface ComboFindModalProps {
  primaryTarget: string;
  sourceVariantId: VariantId;
  recorded: ComboFind[];
  onClose: () => void;
}

function formatTargetList(variantId: VariantId, targets: string[]): string {
  return targets
    .map((target) => formatTargetDisplay(variantId, target))
    .join(', ');
}

export function ComboFindModal({
  primaryTarget,
  sourceVariantId,
  recorded,
  onClose,
}: ComboFindModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const sourceFind = recorded.find((find) => find.variantId === sourceVariantId);
  const otherFinds = recorded.filter(
    (find) => find.variantId !== sourceVariantId && find.targets.length > 0,
  );
  const thisGameExtras =
    sourceFind && sourceFind.targets.length > 1
      ? sourceFind.targets.slice(1)
      : [];

  return (
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="combo-find-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <p className={styles.eyebrow}>Found it!</p>
          <h2 id="combo-find-title" className={styles.target}>
            {formatTargetDisplay(sourceVariantId, primaryTarget)}
          </h2>
        </header>

        <div className={styles.body}>
          {thisGameExtras.length > 0 && (
            <div className={styles.section}>
              <p className={styles.sectionTitle}>Also logged in this game</p>
              <p className={styles.targets}>
                {formatTargetList(sourceVariantId, thisGameExtras)}
              </p>
            </div>
          )}

          {otherFinds.length > 0 && (
            <div className={styles.section}>
              <p className={styles.sectionTitle}>Also logged in other games</p>
              <ul className={styles.list}>
                {otherFinds.map((find) => (
                  <li key={find.variantId} className={styles.item}>
                    <Link
                      to={`/variant/${find.variantId}`}
                      className={styles.gameLink}
                    >
                      {COMBO_GAME_SHORT_NAMES[find.variantId]}
                    </Link>
                    <span className={styles.targets}>
                      {formatTargetList(find.variantId, find.targets)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.continue} onClick={onClose}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
