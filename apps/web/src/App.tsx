import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react';

import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { ProviderI18n } from '@org/i18n';

const theme = extendBaseTheme({
  styles: {
    global: {
      'html, body': {
        fontSize: '16px',
        color: '#000',
        lineHeight: 'auto',
        padding: 0,
      },
      a: {
        color: 'teal.500',
      },
    },
  },
  components: {
    // Button,
    // Popover,
  },
});
function App() {
  return (
    <ProviderI18n>
      <ChakraBaseProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraBaseProvider>
    </ProviderI18n>
  );
}

export default App;
