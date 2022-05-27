import { GameSettingsObject } from 'renderer/types/game-settings';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
      isVRisingServerRunning: (cb: (isRunning: boolean) => void) => void;
      config: {
        getServerBatPath: () => string | undefined;
        setServerBatPath: () => void;
        getServerSettingsDir: () => string | undefined;
        setServerSettingsDir: () => void;
        setPathConfig: (options?: {
          initial?: boolean;
          batPath: string;
          settingsDir: string;
        }) => void;
        isInitialConfigFinish: () => boolean;
      };
      startServer: () => void;
      stopServer: () => void;
      loadGameSettingsData: () => Promise<Partial<GameSettingsObject>>;
      saveGameSettingsConfig: (data: Partial<GameSettingsObject>) => void;
    };
  }
}

export {};
