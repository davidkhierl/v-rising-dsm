import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { exec } from 'child_process';
import { getServerBatPath, getServerSettingsDir } from 'main/util';
import store from 'main/store';
import { GameSettingsObject } from 'renderer/types/game-settings';

export type Channels = 'set-server-bat-path' | 'set-server-bat-path-success';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  isVRisingServerRunning: (cb: (isRunning: boolean) => void) => {
    exec(
      `tasklist /fi "imagename eq VRisingServer.exe" /fo csv`,
      (_err, stdout) => {
        cb(stdout.includes('VRisingServer.exe'));
        ipcRenderer.send('get-child-process', stdout);
      }
    );
  },
  config: {
    getServerBatPath: () => {
      return getServerBatPath();
    },
    setServerBatPath: () => {
      ipcRenderer.send('set-server-bat-path');
    },
    getServerSettingsDir: () => {
      return getServerSettingsDir();
    },
    setServerSettingsDir: () => {
      ipcRenderer.send('set-server-settings-dir');
    },
    initialConfigFinish: () => {
      ipcRenderer.send('set-initial-config-finish');
    },
    isInitialConfigFinish: () => {
      const isFinish = store.get('initialConfigFinish');
      if (typeof isFinish === 'boolean') return isFinish;
      return false;
    },
  },
  startServer: () => {
    ipcRenderer.send('start-server');
  },
  stopServer: () => {
    ipcRenderer.send('stop-server');
  },
  loadGameSettingsData: async () => {
    const gamesSettingsData = await ipcRenderer.invoke(
      'load-game-settings-data'
    );
    return gamesSettingsData;
  },
  saveGameSettingsConfig: (data: Partial<GameSettingsObject>) => {
    ipcRenderer.send('save-game-settings-config', data);
  },
});
