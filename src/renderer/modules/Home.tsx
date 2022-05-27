import { Button, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import { IoGameController } from 'react-icons/io5';
// import { HiServer } from 'react-icons/hi';
// import { AiFillSetting } from 'react-icons/ai';
import { useAppStore } from 'renderer/store/appStore';
import GameSettings from 'renderer/components/GameSettings/GameSettings';
import { useRef } from 'react';

const Home = () => {
  const toggleGameSettingsModal = useAppStore(
    (state) => state.toggleGameSettingsModal
  );

  const gameSettingsButtonRef = useRef<HTMLButtonElement>(null);
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

          {/* <Flex
            as={Button}
            flexDirection="column"
            h="150px"
            w="150px"
            justifyContent="center"
            alignItems="center"
            rounded="2xl"
          >
            <Icon as={HiServer} w={20} h={20} color="green.500" />
            <Text>Server Settings</Text>
          </Flex>

          <Flex
            as={Button}
            flexDirection="column"
            h="150px"
            w="150px"
            justifyContent="center"
            alignItems="center"
            rounded="2xl"
          >
            <Icon as={AiFillSetting} w={20} h={20} color="green.500" />
            <Text>Path Configs</Text>
          </Flex> */}
        </HStack>
      </Flex>
      <GameSettings finalFocusRef={gameSettingsButtonRef} />
    </>
  );
};
export default Home;
