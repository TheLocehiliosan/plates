import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', mobileLabel: 'Games', end: true },
  { to: '/rules', label: 'How to Play', mobileLabel: 'Rules', end: false },
  { to: '/backup', label: 'Backup', mobileLabel: 'Save', end: false },
] as const;

const REPO_URL = 'https://github.com/TheLocehiliosan/plates';

export function Layout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <NavLink to="/" className={styles.logo} end>
            Plate Pursuit
          </NavLink>

          <nav className={styles.nav} aria-label="Main">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                }
              >
                <span className={styles.navLabelFull}>{item.label}</span>
                <span className={styles.navLabelShort}>{item.mobileLabel}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <a
          className={styles.attribution}
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Vibe-coded by Tim Byrne w/Cursor
        </a>
      </footer>
    </div>
  );
}
