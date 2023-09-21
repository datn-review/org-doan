// import { extendBaseTheme } from '@chakra-ui/react';

import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { ProviderI18n } from '@org/i18n';
import { GlobalStyle } from '@org/ui';

// const theme = extendBaseTheme({
//   styles: {
//     color: '2F2B3DC7',
//   },
//   components: {
//     // Button,
//     // Popover,
//   },
// });

function App() {
  return (
    <ProviderI18n>
      {/* <ChakraBaseProvider theme={theme}> */}
      <GlobalStyle>
        <RouterProvider router={router} />
      </GlobalStyle>
      {/* </ChakraBaseProvider> */}
    </ProviderI18n>
  );
}

export default App;
