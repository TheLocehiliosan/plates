import { VARIANTS } from '../games/registry';
import { VariantCard } from '../components/VariantCard';
import { useProgress } from '../context/useProgress';
import { getTotalFindsAcrossGames } from '../games/progress';
import styles from './Dashboard.module.css';

function formatTotalFinds(count: number): string {
  if (count === 1) {
    return '1 find across all games';
  }
  return `${count} finds across all games`;
}

export function Dashboard() {
  const { state } = useProgress();
  const totalFinds = getTotalFindsAcrossGames(state);

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Your Games</h1>
      <div className={styles.grid}>
        {VARIANTS.map((variant) => (
          <VariantCard key={variant.id} variantId={variant.id} />
        ))}
      </div>
      <p className={styles.summary}>{formatTotalFinds(totalFinds)}</p>
    </div>
  );
}
