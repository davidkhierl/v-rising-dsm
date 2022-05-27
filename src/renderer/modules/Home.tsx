import { Button, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import { IoGameController } from 'react-icons/io5';
import { HiServer } from 'react-icons/hi';
import { AiFillSetting } from 'react-icons/ai';
import { useAppStore } from 'renderer/store/appStore';
import GameSettingsDrawer from 'renderer/components/GameSettings/GameSettingsDrawer';
import { useRef } from 'react';
import PathConfigDrawer from 'renderer/components/PathConfig/PathConfigDrawer';

const Home = () => {
  const toggleGameSettingsModal = useAppStore(
    (state) => state.toggleGameSettingsModal
  );

  const togglePathConfigModal = useAppStore(
    (state) => state.togglePathConfigModal
  );

  const gameSettingsButtonRef = useRef<HTMLButtonElement>(null);
  const pathConfigButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Flex w="full" justifyContent="center" alignItems="center">
        <HStack spacing={8}>
          <Button
            ref={gameSettingsButtonRef}
            flexDirection="column"
            h="150px"
            w="150px"
            justifyContent="center"
            alignItems="center"
            rounded="2xl"
            onClick={() => toggleGameSettingsModal()}
          >
            <Icon as={IoGameController} w={20} h={20} color="green.500" />
            <Text>Game Settings</Text>
          </Button>
          {/* <Button
            flexDirection="column"
            h="150px"
            w="150px"
            justifyContent="center"
            alignItems="center"
            rounded="2xl"
          >
            <Icon as={HiServer} w={20} h={20} color="green.500" />
            <Text>Server Settings</Text>
          </Button> */}
          <Button
            ref={pathConfigButtonRef}
            flexDirection="column"
            h="150px"
            w="150px"
            justifyContent="center"
            alignItems="center"
            rounded="2xl"
            onClick={() => togglePathConfigModal()}
          >
            <Icon as={AiFillSetting} w={20} h={20} color="green.500" />
            <Text>Path Configs</Text>
          </Button>
        </HStack>
      </Flex>
      <GameSettingsDrawer finalFocusRef={gameSettingsButtonRef} />
      <PathConfigDrawer finalFocusRef={pathConfigButtonRef} />
    </>
  );
};
export default Home;
