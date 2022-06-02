/* eslint-disable no-console */
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Code,
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
import { useGameSettingsStore } from 'renderer/store/gameSettingsStore';
import { GameSettingsObject } from 'renderer/types/game-settings';

export type GameSettingsProps = Pick<DrawerProps, 'finalFocusRef'>;

const GameSettingsDrawer = (props: GameSettingsProps) => {
  const isGameSettingsModalOpen = useAppStore(
    (state) => state.isGameSettingsModalOpen
  );
  const toggleGameSettingsModal = useAppStore(
    (state) => state.toggleGameSettingsModal
  );

  const gameSettings = useGameSettingsStore((state) => state.gameSettings);

  const setGameSettings = useGameSettingsStore(
    (state) => state.setGameSettings
  );

  const [errorLoadingGameSettingsData, setErrorLoadingGameSettingsData] =
    useState(false);

  useEffect(() => {
    let gameSettingsCopy: Partial<GameSettingsObject> | undefined;
    if (isGameSettingsModalOpen) {
      setErrorLoadingGameSettingsData(false);
      window.electron
        .loadGameSettingsData()
        .then((data) => {
          setGameSettings(data);
          gameSettingsCopy = data;
          return data;
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (gameSettingsCopy) setGameSettings(gameSettingsCopy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameSettingsModalOpen]);

  useEffect(() => {
    window.electron.ipcRenderer.on('save-game-settings-config-success', () => {
      toggleGameSettingsModal(false);
      window.electron
        .loadGameSettingsData()
        .then((data) => {
          setGameSettings(data);
          return data;
        })
        .catch((err) => {
          console.log(err);
        });
    });
    window.electron.ipcRenderer.on('error-load-game-settings-data', (err) => {
      if (err instanceof Error) setErrorLoadingGameSettingsData(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleGameSettingsModal]);

  return (
    <Drawer
      isOpen={isGameSettingsModalOpen}
      onClose={() => toggleGameSettingsModal(false)}
      finalFocusRef={props.finalFocusRef}
      size="full"
      // placement="bottom"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Game Settings</DrawerHeader>
        <DrawerBody>
          {errorLoadingGameSettingsData && (
            <Alert status="error">
              <AlertIcon />
              Missing{' '}
              <Box as="span" mx={2}>
                <Code>ServerGameSettings.json</Code>
              </Box>
              Make sure you have the correct Settings directory.
            </Alert>
          )}
          <GameSettingsItems />
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px">
          <Button mr={3} onClick={() => toggleGameSettingsModal()}>
            Cancel
          </Button>
          <Button
            colorScheme="green"
            isDisabled={errorLoadingGameSettingsData}
            onClick={() => {
              if (gameSettings)
                window.electron.saveGameSettingsConfig(gameSettings);
            }}
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default GameSettingsDrawer;
