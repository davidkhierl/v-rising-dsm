import create from 'zustand';

export interface AppStore {
  isGameSettingsModalOpen: boolean;
  toggleGameSettingsModal: (isOpen?: boolean) => void;
  isPathConfigModalOpen: boolean;
  togglePathConfigModal: (isOpen?: boolean) => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  isGameSettingsModalOpen: false,
  toggleGameSettingsModal: (isOpen) =>
    set({
      isGameSettingsModalOpen:
        isOpen !== undefined ? isOpen : !get().isGameSettingsModalOpen,
    }),
  isPathConfigModalOpen: false,
  togglePathConfigModal: (isOpen) =>
    set({
      isPathConfigModalOpen:
        isOpen !== undefined ? isOpen : !get().isPathConfigModalOpen,
    }),
}));
