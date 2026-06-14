import { useRef, useState } from 'react';
import { useProgress } from '../context/useProgress';
import { canShareBackupFiles, exportBackup, readBackupFile } from '../storage/backup';
import styles from './Backup.module.css';

export function Backup() {
  const { state, restoreBackup } = useProgress();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleExport() {
    setMessage(null);
    setError(null);
    setBusy(true);
    try {
      const result = await exportBackup(state);
      setMessage(
        result === 'shared'
          ? 'Backup shared. Save the file somewhere safe (Files, Drive, email, etc.).'
          : 'Backup downloaded. Keep the JSON file somewhere safe.',
      );
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      setError('Could not export backup. Try again.');
    } finally {
      setBusy(false);
    }
  }

  function handleImportClick() {
    setMessage(null);
    setError(null);
    fileInputRef.current?.click();
  }

  async function handleFileChange(file: File | undefined) {
    if (!file) {
      return;
    }

    setBusy(true);
    setMessage(null);
    setError(null);

    try {
      const backup = await readBackupFile(file);
      const confirmed = window.confirm(
        'Replace all progress on this device with the backup? This cannot be undone.',
      );
      if (!confirmed) {
        return;
      }
      restoreBackup(backup);
      setMessage('Backup restored successfully.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not import backup.');
    } finally {
      setBusy(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }

  const shareHint = canShareBackupFiles()
    ? 'On this device, export opens the share sheet so you can save to Files or cloud storage.'
    : 'Export downloads a JSON file. Save it somewhere safe (cloud storage, email, etc.).';

  return (
    <div className={styles.backup}>
      <header className={styles.header}>
        <h1 className={styles.title}>Backup &amp; restore</h1>
        <p className={styles.intro}>
          Progress is stored only in this browser. Export a backup before switching
          devices, clearing site data, or reinstalling.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Export backup</h2>
        <p className={styles.sectionText}>{shareHint}</p>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={handleExport}
          disabled={busy}
        >
          Save backup
        </button>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Import backup</h2>
        <p className={styles.sectionText}>
          Choose a previously exported <code>.json</code> file. This replaces all
          progress on this device.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          className={styles.fileInput}
          onChange={(event) => void handleFileChange(event.target.files?.[0])}
        />
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={handleImportClick}
          disabled={busy}
        >
          Choose backup file
        </button>
      </section>

      {message && <p className={styles.message}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
