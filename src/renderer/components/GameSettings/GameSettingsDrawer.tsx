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
import { GameSettingsObject } from 'renderer/types/game-settings';

export type GameSettingsProps = Pick<DrawerProps, 'finalFocusRef'>;

const GameSettingsDrawer = (props: GameSettingsProps) => {
  const isGameSettingsModalOpen = useAppStore(
    (state) => state.isGameSettingsModalOpen
  );
  const toggleGameSettingsModal = useAppStore(
    (state) => state.toggleGameSettingsModal
  );

  const [gameSettingsData, setGameSettingsData] =
    useState<Partial<GameSettingsObject>>();

  const [errorLoadingGameSettingsData, setErrorLoadingGameSettingsData] =
    useState(false);

  useEffect(() => {
    if (isGameSettingsModalOpen) {
      setErrorLoadingGameSettingsData(false);
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
          console.log(err);
        });
    });
    window.electron.ipcRenderer.on('error-load-game-settings-data', (err) => {
      if (err instanceof Error) setErrorLoadingGameSettingsData(true);
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
            isDisabled={errorLoadingGameSettingsData}
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

export default GameSettingsDrawer;
