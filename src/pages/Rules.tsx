import { VARIANTS } from '../games/registry';
import styles from './Rules.module.css';

export function Rules() {
  return (
    <div className={styles.rules}>
      <header className={styles.header}>
        <h1 className={styles.title}>How to Play</h1>
        <p className={styles.intro}>
          Plate Pursuit is a passive game you play throughout your life whenever
          you see a car license plate. The app helps you remember what to look
          for next and logs your progress.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The basics</h2>
        <ul className={styles.list}>
          <li>
            You play in real life whenever you notice a license plate — no need
            to be actively hunting.
          </li>
          <li>
            Each variant defines an ordered sequence of targets. Find the current
            target, then move on to the next.
          </li>
          <li>
            When you believe you have spotted the right plate, tap{' '}
            <strong>Found it!</strong> in the app. This is an honor system — the
            app does not validate plate text.
          </li>
          <li>
            Optionally add a note (e.g. the plate characters) for your personal
            history.
          </li>
          <li>
            All variants track progress independently. Your data stays on this
            device in your browser.
          </li>
        </ul>
      </section>

      {VARIANTS.map((variant) => (
        <section key={variant.id} className={styles.section}>
          <h2 className={styles.sectionTitle}>{variant.name}</h2>
          <p className={styles.description}>{variant.shortDescription}</p>
          <dl className={styles.meta}>
            <div>
              <dt>Match rule</dt>
              <dd>{variant.matchRuleHint}</dd>
            </div>
            <div>
              <dt>Sequence</dt>
              <dd>{getSequenceDescription(variant.id)}</dd>
            </div>
            <div>
              <dt>Goal</dt>
              <dd>{getGoalDescription(variant.id)}</dd>
            </div>
          </dl>
          <p className={styles.example}>
            <strong>Example:</strong> {getExample(variant.id)}
          </p>
        </section>
      ))}
    </div>
  );
}

function getSequenceDescription(id: string): string {
  switch (id) {
    case 'classic':
      return '001, 002, 003, … up to 999';
    case 'decimal':
      return '1, 2, 3, 4, … 10, 11, 12, …';
    case 'hex':
      return '1–9, A–F, 10, 11, 12, …';
    case 'binary':
      return '1, 10, 11, 100, 101, 110, 111, 1000, …';
    case 'elements':
      return 'H, HE, LI, BE, B, C, … through OG (118 elements)';
    case 'pi':
      return '314, 141, 415, 159, 592, … (sliding 3-digit windows of π)';
    default:
      return '';
  }
}

function getGoalDescription(id: string): string {
  switch (id) {
    case 'classic':
      return 'Reach 999 (a lifetime achievement). Roughly 1 in 3 finds shows a pop-culture surprise when you log it.';
    case 'elements':
      return 'Complete all 118 elements. Every find shows a fun fact about that element.';
    default:
      return 'Get as far as you can';
  }
}

function getExample(id: string): string {
  switch (id) {
    case 'classic':
      return 'Plate ABC-042 qualifies for 042 only if 042 is the last three characters.';
    case 'decimal':
      return 'When seeking 23, plate XYZ-123 contains 23 anywhere on the plate.';
    case 'hex':
      return 'When seeking A, plate 4A7B contains A. When seeking 10, look for the digits 1 and 0 together.';
    case 'binary':
      return 'When seeking 101, plate X101Y qualifies because 101 appears as a substring.';
    case 'elements':
      return 'When seeking HE, plate THE-999 qualifies (symbols match case-insensitively).';
    case 'pi':
      return 'When seeking 415, plate ABC-4157 contains 415 as a substring.';
    default:
      return '';
  }
}
