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
        <p className={styles.tldr}>
          Spot plates in order, in real life, when you are sure — never at the
          expense of safety.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Where this came from</h2>
        <p className={styles.prose}>
          Sequential license-plate spotting — find <strong>001</strong>, then{' '}
          <strong>002</strong>, then <strong>003</strong>, and so on — has been
          around for a long time. Plate Pursuit builds on that idea and adds
          variants we have never seen anyone else play: counting in{' '}
          <strong>hexadecimal</strong> or <strong>binary</strong>, sliding
          windows through the digits of <strong>π</strong>, and spotting element
          symbols in <strong>periodic-table order</strong>.
        </p>
        <p className={styles.prose}>
          Our <strong>Classic</strong> variant is stricter than many
          number-spotting games: the last three characters of the plate must
          match — not just three digits somewhere in the middle.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Safety &amp; honor system</h2>
        <ul className={styles.list}>
          <li>
            <strong>Safety first:</strong> never play in a way that compromises
            the safety of anyone on the road. No craning, chasing, or distracted
            driving to log a find. If you are driving, log the find only when it
            is safe to do so — or let a passenger spot and note it for you.
          </li>
          <li>
            You must spot the plate <strong>in real life</strong> — on an actual
            vehicle around you, moving or parked. Plates seen online, on TV, in
            photos, or in games do not count.
          </li>
          <li>
            You must be sure of what you saw. If you are not 100% certain you
            spotted the current target, it does not count — wait for a plate you
            are confident about.
          </li>
          <li>
            Targets must be spotted <strong>in order</strong> as you play. It is
            not OK to “remember” seeing a sequence from weeks ago and count it
            now — only finds you notice while you are on that target count.
          </li>
          <li>
            If you use <strong>Set starting position</strong>, only count progress
            you had honestly spotted before using the app. The honor system
            applies to imported progress too.
          </li>
          <li>
            One plate may satisfy multiple <em>consecutive</em> targets if it
            contains them all. For decimal, if you need <strong>12</strong> then{' '}
            <strong>13</strong>, plate <strong>XYZ-1213</strong> contains both
            substrings — log each find as you reach that target. For elements, if you need Be then B, plate{' '}
            <strong>BET123</strong> contains both <strong>BE</strong> and{' '}
            <strong>B</strong> — log each find as you reach that target.
          </li>
          <li>
            For <strong>Elements</strong>, symbols must appear as a contiguous
            substring on the plate — you cannot stitch letters together from
            different parts. <strong>HE</strong> in <strong>THE</strong> counts;
            an <strong>H</strong> at one end and an <strong>E</strong> at the
            other does not.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The basics</h2>
        <ul className={styles.list}>
          <li>
            You play in real life whenever you notice a license plate — no need
            to be actively hunting or drive extra miles.
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
          {getWhyPlay(variant.id) && (
            <p className={styles.prose}>{getWhyPlay(variant.id)}</p>
          )}
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

function getWhyPlay(id: string): string | null {
  switch (id) {
    case 'classic':
      return 'The original endurance challenge — how far through 001–999 can you get over years of ordinary driving?';
    case 'decimal':
      return 'The straightforward counting variant — good for long trips and anyone who wants a simple “what number am I on?” hunt.';
    case 'hex':
      return 'For programmers and puzzle fans — plate hunting in base 16.';
    case 'binary':
      return 'Hard mode — targets grow quickly and plates get sparse. How deep can you go?';
    case 'elements':
      return 'Chemistry on the road — two-letter symbols (CA, HE) and one-letter symbols (H, B) mixed in periodic-table order.';
    case 'pi':
      return 'March through the digits of π one sliding 3-digit window at a time — your progress is measured in digits found, not just plate targets.';
    default:
      return null;
  }
}

function getSequenceDescription(id: string): string {
  switch (id) {
    case 'classic':
      return '001, 002, 003, … up to 999 (last three characters only)';
    case 'decimal':
      return '1, 2, 3, 4, … 10, 11, 12, …';
    case 'hex':
      return '1–9, A–F, 10, 11, 12, … (uppercase A–F on plates)';
    case 'binary':
      return '1, 10, 11, 100, 101, 110, 111, 1000, …';
    case 'elements':
      return 'H, HE, LI, BE, B, C, … through OG (118 elements; case-insensitive)';
    case 'pi':
      return '314, 141, 415, 159, 592, … (each find advances one digit into π)';
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
    case 'decimal':
    case 'hex':
    case 'binary':
    case 'pi':
      return 'No finish line — how far you get is the achievement.';
    default:
      return 'Get as far as you can';
  }
}

function getExample(id: string): string {
  switch (id) {
    case 'classic':
      return 'Plate ABC-042 qualifies for 042 only if 042 is the last three characters. Plate 042-XYZ does not count — 042 is not at the end.';
    case 'decimal':
      return 'When seeking 23, plate XYZ-123 contains 23 anywhere on the plate. When seeking 12 then 13, plate XYZ-1213 contains both — log each find separately as you reach that target.';
    case 'hex':
      return 'When seeking A, plate 4A7B contains A. When seeking 10, look for the characters 1 and 0 together as 10 — not a 1 and a 0 separately.';
    case 'binary':
      return 'When seeking 101, plate X101Y qualifies because 101 appears as a substring.';
    case 'elements':
      return 'When seeking HE, plate THE-999 qualifies (symbols match case-insensitively). HE must appear as one substring — not H from one part of the plate and E from another.';
    case 'pi':
      return 'When seeking 415, plate ABC-4157 contains 415 as a substring. One find advances you one window — spotting 314159 does not skip ahead; log each window as you reach it.';
    default:
      return '';
  }
}
