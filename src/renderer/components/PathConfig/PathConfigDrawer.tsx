import {
  Button,
  Code,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAppStore } from 'renderer/store/appStore';

export type GameSettingsProps = Pick<DrawerProps, 'finalFocusRef'>;

const PathConfigDrawer = (props: GameSettingsProps) => {
  const [serverBatPath, setServerBatPath] = useState(
    window.electron.config.getServerBatPath()
  );

  const [serverSettingsDir, setServerSettingsDir] = useState(
    window.electron.config.getServerSettingsDir()
  );

  const isPathConfigModalOpen = useAppStore(
    (state) => state.isPathConfigModalOpen
  );

  const togglePathConfigModal = useAppStore(
    (state) => state.togglePathConfigModal
  );

  useEffect(() => {
    if (isPathConfigModalOpen) {
      setServerBatPath(window.electron.config.getServerBatPath());
      setServerSettingsDir(window.electron.config.getServerSettingsDir());
    }
  }, [isPathConfigModalOpen]);

  useEffect(() => {
    const setServerBatPathSuccess = window.electron.ipcRenderer.on(
      'set-server-bat-path',
      (path) => {
        setServerBatPath(path as string);
      }
    );

    const setServerSettingsDirSuccess = window.electron.ipcRenderer.on(
      'set-server-settings-dir',
      (path) => {
        setServerSettingsDir(path as string);
      }
    );

    const setPathConfigSuccess = window.electron.ipcRenderer.on(
      'set-path-config-success',
      () => {
        togglePathConfigModal();
      }
    );

    return () => {
      if (setServerBatPathSuccess) setServerBatPathSuccess();
      if (setServerSettingsDirSuccess) setServerSettingsDirSuccess();
      if (setPathConfigSuccess) setPathConfigSuccess();
    };
  }, [togglePathConfigModal]);

  return (
    <Drawer
      isOpen={isPathConfigModalOpen}
      onClose={() => togglePathConfigModal(false)}
      finalFocusRef={props.finalFocusRef}
      size="full"
      placement="bottom"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Path Config</DrawerHeader>
        <DrawerBody>
          <Container h="full" py={8}>
            <Stack spacing={8}>
              <Stack>
                {serverBatPath && (
                  <Text p={2} bgColor="blue.800" rounded="md">
                    {serverBatPath}
                  </Text>
                )}
                <Button
                  onClick={() => window.electron.config.setServerBatPath()}
                >
                  Server <Code mx={2}>.bat</Code> file
                </Button>
              </Stack>
              <Stack>
                {serverSettingsDir && (
                  <Text p={2} bgColor="blue.800" rounded="md">
                    {serverSettingsDir}
                  </Text>
                )}
                <Button
                  onClick={() => window.electron.config.setServerSettingsDir()}
                >
                  Server settings folder
                </Button>
              </Stack>
            </Stack>
          </Container>
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px">
          <Button mr={3} onClick={() => togglePathConfigModal()}>
            Cancel
          </Button>
          <Button
            colorScheme="green"
            onClick={() => {
              if (serverBatPath && serverSettingsDir)
                window.electron.config.setPathConfig({
                  batPath: serverBatPath,
                  settingsDir: serverSettingsDir,
                });
            }}
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default PathConfigDrawer;
