import type { AppState } from '../games/types';
import { parseBackupData, serializeState } from './progressStore';

export const BACKUP_FILE_PREFIX = 'plate-pursuit-backup';

function backupFilename(): string {
  const date = new Date().toISOString().slice(0, 10);
  return `${BACKUP_FILE_PREFIX}-${date}.json`;
}

function createBackupBlob(state: AppState): Blob {
  return new Blob([serializeState(state)], { type: 'application/json' });
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function exportBackup(state: AppState): Promise<'shared' | 'downloaded'> {
  const filename = backupFilename();
  const blob = createBackupBlob(state);
  const file = new File([blob], filename, { type: 'application/json' });

  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: 'Plate Pursuit backup',
    });
    return 'shared';
  }

  downloadBlob(blob, filename);
  return 'downloaded';
}

export function readBackupFile(file: File): Promise<AppState> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result;
        if (typeof text !== 'string') {
          reject(new Error('Could not read the file.'));
          return;
        }
        const parsed: unknown = JSON.parse(text);
        const state = parseBackupData(parsed);
        if (!state) {
          reject(new Error('This file is not a valid Plate Pursuit backup.'));
          return;
        }
        resolve(state);
      } catch {
        reject(new Error('Could not parse the backup file.'));
      }
    };
    reader.onerror = () => reject(new Error('Could not read the file.'));
    reader.readAsText(file);
  });
}

export function canShareBackupFiles(): boolean {
  if (!navigator.canShare) {
    return false;
  }
  const probe = new File(['{}'], 'probe.json', { type: 'application/json' });
  return navigator.canShare({ files: [probe] });
}
