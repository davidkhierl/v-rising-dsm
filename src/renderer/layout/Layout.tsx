import { Flex } from '@chakra-ui/react';

import { ReactNode, useEffect, useState } from 'react';
import InitialConfig from 'renderer/components/InitialConfig/InitialConfig';
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
      'initial-config-finish',
      (isFinish) => {
        setIsInitialConfigFinish(isFinish as boolean);
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
        <InitialConfig />
      )}
    </Flex>
  );
};

export default Layout;
