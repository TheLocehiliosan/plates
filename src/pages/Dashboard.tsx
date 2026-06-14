import { VARIANTS } from '../games/registry';
import { VariantCard } from '../components/VariantCard';
import styles from './Dashboard.module.css';

export function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Your Games</h1>
        <p className={styles.subtitle}>
          Track progress across all Plate Pursuit variants. Each game remembers
          what you need to find next.
        </p>
      </header>
      <div className={styles.grid}>
        {VARIANTS.map((variant) => (
          <VariantCard key={variant.id} variantId={variant.id} />
        ))}
      </div>
    </div>
  );
}
