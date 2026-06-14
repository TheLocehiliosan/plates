import { useState, type FormEvent } from 'react';
import {
  getPositionInputHint,
  getPositionInputPlaceholder,
  resolveProgressIndex,
} from '../games/position';
import { getNextTarget, getVariant } from '../games/registry';
import type { SetPositionMode, VariantId } from '../games/types';
import styles from './SetStartingPosition.module.css';

interface SetStartingPositionProps {
  variantId: VariantId;
  hasTrackedEntries: boolean;
  onSetPosition: (progressIndex: number) => boolean;
}

const MODES: { id: SetPositionMode; label: string }[] = [
  { id: 'nextTarget', label: "I'm looking for" },
  { id: 'lastFound', label: 'Last I found' },
];

export function SetStartingPosition({
  variantId,
  hasTrackedEntries,
  onSetPosition,
}: SetStartingPositionProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<SetPositionMode>('nextTarget');
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');

    const progressIndex = resolveProgressIndex(variantId, mode, value);
    if (progressIndex === null) {
      setError('Could not match that value. Check the format and try again.');
      return;
    }

    const variant = getVariant(variantId);
    if (variant.totalSteps !== undefined && progressIndex > variant.totalSteps) {
      setError(`This variant only has ${variant.totalSteps} steps.`);
      return;
    }

    const preview = getNextTarget(variantId, progressIndex);
    const confirmMessage = hasTrackedEntries
      ? 'Set starting position here? Your logged find history will be cleared.'
      : preview
        ? `Set your starting position? You'll be looking for ${preview} next.`
        : 'Mark this variant as complete?';

    if (!window.confirm(confirmMessage)) {
      return;
    }

    if (onSetPosition(progressIndex)) {
      setValue('');
      setOpen(false);
    } else {
      setError('Could not save that position.');
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setOpen(true)}
      >
        Already playing? Set starting position
      </button>
    );
  }

  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>Set starting position</h2>
        <button
          type="button"
          className={styles.close}
          onClick={() => {
            setOpen(false);
            setError('');
          }}
        >
          Cancel
        </button>
      </div>
      <p className={styles.intro}>
        Use this if you were already playing before using the app. Prior progress
        won&apos;t appear as dated history — only finds you log from here on.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset className={styles.modes}>
          {MODES.map((option) => (
            <label key={option.id} className={styles.modeLabel}>
              <input
                type="radio"
                name="position-mode"
                value={option.id}
                checked={mode === option.id}
                onChange={() => {
                  setMode(option.id);
                  setError('');
                }}
              />
              {option.label}
            </label>
          ))}
        </fieldset>

        <label className={styles.inputLabel} htmlFor="position-value">
          {getPositionInputHint(variantId, mode)}
        </label>
        <input
          id="position-value"
          className={styles.input}
          type="text"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setError('');
          }}
          placeholder={getPositionInputPlaceholder(variantId, mode)}
          autoComplete="off"
        />

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submit}>
          Set position
        </button>
      </form>
    </section>
  );
}
