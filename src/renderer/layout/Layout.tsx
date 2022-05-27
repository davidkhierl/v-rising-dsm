import { Flex } from '@chakra-ui/react';

import { ReactNode, useEffect, useState } from 'react';
import InitialPathConfig from 'renderer/components/PathConfig/InitialPathConfig';
import ServerHeader from 'renderer/components/ServerHeader/ServerHeader';

export interface LayoutProps {
  children?: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const [isInitialConfigFinish, setIsInitialConfigFinish] = useState(
    window.electron.config.isInitialConfigFinish()
  );

  useEffect(() => {
    const isInitialConfigFinishListener = window.electron.ipcRenderer.on(
      'set-path-config-success',
      (isInitial) => {
        if (isInitial) setIsInitialConfigFinish(isInitial as boolean);
      }
    );
    return () => {
      if (isInitialConfigFinishListener) isInitialConfigFinishListener();
    };
  }, []);

  return (
    <Flex direction="column" w="full" minH="100vh">
      {isInitialConfigFinish ? (
        <>
          <ServerHeader />
          <Flex flex={1}>{props?.children}</Flex>
        </>
      ) : (
        <InitialPathConfig />
      )}
    </Flex>
  );
};

export default Layout;
