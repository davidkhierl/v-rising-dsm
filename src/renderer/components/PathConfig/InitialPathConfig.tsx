import {
  Button,
  Code,
  Stack,
  Text,
  Container,
  Heading,
  Link,
  Icon,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';

const InitialPathConfig = () => {
  const [serverBatPath, setServerBatPath] = useState(
    window.electron.config.getServerBatPath()
  );

  const [serverSettingsDir, setServerSettingsDir] = useState(
    window.electron.config.getServerSettingsDir()
  );

  useEffect(() => {
    const setServerBatPathSuccess = window.electron.ipcRenderer.on(
      'set-server-bat-path-success',
      (path) => {
        setServerBatPath(path as string);
      }
    );

    const setServerSettingsDirSuccess = window.electron.ipcRenderer.on(
      'set-server-settings-dir-success',
      (path) => {
        setServerSettingsDir(path as string);
      }
    );

    return () => {
      if (setServerBatPathSuccess) setServerBatPathSuccess();
      if (setServerSettingsDirSuccess) setServerSettingsDirSuccess();
    };
  }, []);

  return (
    <Container h="full" py={8}>
      <Stack spacing={4} mb={8}>
        <Heading>Initial Config</Heading>
        <Text>
          Please make sure you already setup your dedicated server before
          proceeding.
        </Text>
        <Text>Follow these steps if you haven&apos;t setup your server </Text>
        <Text>
          <Link
            href="https://github.com/StunlockStudios/vrising-dedicated-server-instructions"
            isExternal
          >
            V Rising Dedicated Server Instructions <Icon as={FiExternalLink} />
          </Link>
        </Text>
        <Text>
          After you setup your server open your <Code>.bat</Code> file and
          replace <Code>VRisingServer.exe</Code> to an absolute path{' '}
        </Text>
        <Code>
          &quot;C:\Program Files
          (x86)\Steam\steamapps\common\VRisingDedicatedServer\VRisingServer.exe&quot;
        </Code>
      </Stack>
      <Stack spacing={8}>
        <Stack>
          {serverBatPath && (
            <Text p={2} bgColor="blue.800" rounded="md">
              {serverBatPath}
            </Text>
          )}
          <Button onClick={() => window.electron.config.setServerBatPath()}>
            Server <Code mx={2}>.bat</Code> file
          </Button>
        </Stack>
        <Stack>
          {serverSettingsDir && (
            <Text p={2} bgColor="blue.800" rounded="md">
              {serverSettingsDir}
            </Text>
          )}
          <Button onClick={() => window.electron.config.setServerSettingsDir()}>
            Server settings folder
          </Button>
        </Stack>
        <Button
          size="lg"
          colorScheme="green"
          isDisabled={!serverBatPath || !serverSettingsDir}
          onClick={() => {
            if (serverBatPath && serverSettingsDir)
              window.electron.config.setPathConfig({
                initial: true,
                batPath: serverBatPath,
                settingsDir: serverSettingsDir,
              });
          }}
        >
          Save
        </Button>
      </Stack>
    </Container>
  );
};

export default InitialPathConfig;
