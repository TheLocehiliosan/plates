import { useState, type FormEvent } from 'react';
import styles from './FoundItForm.module.css';

interface FoundItFormProps {
  onSubmit: (note?: string) => void;
  disabled?: boolean;
}

export function FoundItForm({ onSubmit, disabled }: FoundItFormProps) {
  const [note, setNote] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit(note);
    setNote('');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
      <button className={styles.button} type="submit" disabled={disabled}>
        Found it!
      </button>
    </form>
  );
}
