import { Flex, Box, Heading, Button, Text } from '@chakra-ui/react';
import useVRisingServerStatus from 'renderer/hooks/useVRisingServerStatus';
import VRisingImage from '../../../../assets/images/v-rising-art.jpg';

const ServerHeader = () => {
  const { status } = useVRisingServerStatus();

  const handleServerToggle = () => {
    if (status === 'offline') window.electron.startServer();
    if (status === 'online') window.electron.stopServer();
  };
  return (
    <Flex
      h="200px"
      flexShrink={0}
      alignItems="flex-end"
      p={4}
      bgImage={`linear-gradient(
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5)
        ),url(${VRisingImage})`}
      bgSize="cover"
      bgPosition="center"
      shadow="lg"
    >
      <Box flex={1}>
        <Heading as="h4" color="white" size="sm">
          Server status
        </Heading>
        <Text
          color={status === 'online' ? 'green.500' : 'red.500'}
          fontWeight="bold"
        >
          {status === 'online' ? 'Online' : 'Offline'}
        </Text>
      </Box>
      <Flex alignSelf="flex-start">
        <Button
          variant="outline"
          colorScheme={status === 'online' ? 'red' : 'green'}
          mr="auto"
          onClick={handleServerToggle}
        >
          {status === 'online' ? 'Stop Server' : 'Start'}
        </Button>
      </Flex>
    </Flex>
  );
};

export default ServerHeader;
