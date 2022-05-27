import AppRoutes from 'renderer/AppRoutes';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'renderer/theme/theme';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppRoutes />
    </ChakraProvider>
  );
}
