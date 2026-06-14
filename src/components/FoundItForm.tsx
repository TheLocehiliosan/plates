import { useState, type FormEvent } from 'react';
import styles from './FoundItForm.module.css';

interface FoundItFormProps {
  onSubmit: (note?: string) => void;
  disabled?: boolean;
  /** Collapse the note field behind a toggle on small screens. */
  collapsibleNote?: boolean;
}

export function FoundItForm({
  onSubmit,
  disabled,
  collapsibleNote = false,
}: FoundItFormProps) {
  const [note, setNote] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit(note);
    setNote('');
  }

  const noteFields = (
    <>
      <label className={styles.label} htmlFor="plate-note">
        Optional note (plate text or memo)
      </label>
      <input
        id="plate-note"
        className={styles.input}
        type="text"
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="e.g. ABC-1234"
        disabled={disabled}
        maxLength={120}
      />
    </>
  );

  return (
    <form
      className={`${styles.form} ${collapsibleNote ? styles.collapsibleNote : ''}`}
      onSubmit={handleSubmit}
    >
      {collapsibleNote ? (
        <details className={styles.noteDetails}>
          <summary className={styles.noteSummary}>Add note (optional)</summary>
          <div className={styles.noteFields}>{noteFields}</div>
        </details>
      ) : (
        noteFields
      )}
      <button className={styles.button} type="submit" disabled={disabled}>
        Found it!
      </button>
    </form>
  );
}
