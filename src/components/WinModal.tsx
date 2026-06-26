import { useEffect } from 'react';
import styles from './WinModal.module.css';

interface WinModalProps {
  target: string;
  message: string;
  onClose: () => void;
}

export function WinModal({ target, message, onClose }: WinModalProps) {
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
        aria-labelledby="win-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <p className={styles.eyebrow}>You did it!</p>
          <h2 id="win-title" className={styles.target}>
            {target}
          </h2>
        </header>

        <div className={styles.body}>
          <p className={styles.message}>{message}</p>
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
