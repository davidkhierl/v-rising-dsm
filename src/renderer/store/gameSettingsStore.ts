import { GameSettingsObject } from 'renderer/types/game-settings';
import create from 'zustand';

export interface GameSettingsStore {
  gameSettings?: Partial<GameSettingsObject>;
  setGameSettings: (gameSettings: Partial<GameSettingsObject>) => void;
}

export const useGameSettingsStore = create<GameSettingsStore>((set) => ({
  setGameSettings: (gameSettings) =>
    set((prev) => ({
      gameSettings: { ...prev.gameSettings, ...gameSettings },
    })),
}));
