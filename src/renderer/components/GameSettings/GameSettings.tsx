import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import GameSettingsItems from 'renderer/components/GameSettings/GameSettingsItems';
import { useAppStore } from 'renderer/store/appStore';
import { GameSettingsObject } from 'renderer/types/game-settings';

export type GameSettingsProps = Pick<DrawerProps, 'finalFocusRef'>;

const GameSettings = (props: GameSettingsProps) => {
  const isGameSettingsModalOpen = useAppStore(
    (state) => state.isGameSettingsModalOpen
  );
  const toggleGameSettingsModal = useAppStore(
    (state) => state.toggleGameSettingsModal
  );

  const [gameSettingsData, setGameSettingsData] =
    useState<Partial<GameSettingsObject>>();

  useEffect(() => {
    if (isGameSettingsModalOpen) {
      window.electron
        .loadGameSettingsData()
        .then((data) => {
          setGameSettingsData(data);
          return data;
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [isGameSettingsModalOpen]);

  useEffect(() => {
    window.electron.ipcRenderer.on('save-game-settings-config-success', () => {
      toggleGameSettingsModal(false);
      window.electron
        .loadGameSettingsData()
        .then((data) => {
          setGameSettingsData(data);
          return data;
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }, [toggleGameSettingsModal]);

  return (
    <Drawer
      isOpen={isGameSettingsModalOpen}
      onClose={() => toggleGameSettingsModal(false)}
      finalFocusRef={props.finalFocusRef}
      size="full"
      placement="bottom"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Game Settings</DrawerHeader>
        <DrawerBody>
          <GameSettingsItems
            gameSettingsData={gameSettingsData}
            setGameSettingsData={setGameSettingsData}
          />
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px">
          <Button mr={3} onClick={() => toggleGameSettingsModal()}>
            Cancel
          </Button>
          <Button
            colorScheme="green"
            onClick={() => {
              if (gameSettingsData)
                window.electron.saveGameSettingsConfig(gameSettingsData);
            }}
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default GameSettings;
