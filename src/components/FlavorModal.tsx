import { useEffect } from 'react';
import {
  FLAVOR_CATEGORY_LABELS,
  type Flavor,
} from '../games/flavor/types';
import styles from './FlavorModal.module.css';

interface FlavorModalProps {
  target: string;
  flavor: Flavor;
  subtitle?: string;
  onClose: () => void;
}

export function FlavorModal({ target, flavor, subtitle, onClose }: FlavorModalProps) {
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

  return (
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="flavor-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <p className={styles.eyebrow}>Found it!</p>
          <h2 id="flavor-title" className={styles.target}>
            {target}
          </h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          <span className={styles.badge}>
            {FLAVOR_CATEGORY_LABELS[flavor.category]}
          </span>
        </header>

        <div className={styles.body}>
          <p className={styles.quote}>&ldquo;{flavor.text}&rdquo;</p>
          {flavor.source && (
            <p className={styles.source}>— {flavor.source}</p>
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
