import type { ReactNode } from 'react';
import styles from './RoadSign.module.css';

interface RoadSignProps {
  label: string;
  footer?: ReactNode;
  children: ReactNode;
  complete?: boolean;
  size?: 'compact' | 'large';
  className?: string;
}

export function RoadSign({
  label,
  footer,
  children,
  complete = false,
  size = 'compact',
  className,
}: RoadSignProps) {
  return (
    <div
      className={`${styles.mount} ${size === 'large' ? styles.large : ''} ${complete ? styles.complete : ''} ${className ?? ''}`}
    >
      <div className={styles.signPanel}>
        <span className={styles.signLabel}>{label}</span>
        <div className={styles.signBody}>{children}</div>
        {footer !== undefined && footer !== null && footer !== '' && (
          <span className={styles.signFooter}>{footer}</span>
        )}
      </div>
      <div className={styles.posts} aria-hidden="true">
        <span className={styles.post} />
        <span className={styles.post} />
      </div>
    </div>
  );
}
