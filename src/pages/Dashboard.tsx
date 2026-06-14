import { VARIANTS } from '../games/registry';
import { VariantCard } from '../components/VariantCard';
import styles from './Dashboard.module.css';

export function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Your Games</h1>
      <div className={styles.grid}>
        {VARIANTS.map((variant) => (
          <VariantCard key={variant.id} variantId={variant.id} />
        ))}
      </div>
    </div>
  );
}
