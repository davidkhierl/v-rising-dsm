/* eslint import/prefer-default-export: off, import/no-mutable-exports: off */
import { URL } from 'url';
import path from 'path';
import { exec } from 'child_process';
import store from './store';

export let resolveHtmlPath: (htmlFileName: string) => string;

if (process.env.NODE_ENV === 'development') {
  const port = process.env.PORT || 1212;
  resolveHtmlPath = (htmlFileName: string) => {
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  };
} else {
  resolveHtmlPath = (htmlFileName: string) => {
    return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
  };
}

export const isVRisingServerRunning = (cb: (isRunning: boolean) => void) => {
  exec(
    `tasklist /fi "imagename eq VRisingServer.exe" /fo csv`,
    (_err, stdout) => {
      cb(stdout.includes('VRisingServer.exe'));
    }
  );
};

export function getServerBatPath(): string | undefined {
  const batPath = store.get('serverBatPath');
  if (typeof batPath === 'string') return batPath;
  return undefined;
}

export function getServerSettingsDir(): string | undefined {
  const settingsDir = store.get('serverSettingsDir');
  if (typeof settingsDir === 'string') return settingsDir;
  return undefined;
}
