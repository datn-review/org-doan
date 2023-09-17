import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react';

import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

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
    <ChakraBaseProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraBaseProvider>
  );
}

export default App;
