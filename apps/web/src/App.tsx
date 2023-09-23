// import { extendBaseTheme } from '@chakra-ui/react';

import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { ProviderI18n } from '@org/i18n';
import { GlobalStyle } from '@org/ui';
import { StoreProvider } from '@org/store';

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
    <StoreProvider>
      <ProviderI18n>
        <GlobalStyle>
          <RouterProvider router={router} />
        </GlobalStyle>
      </ProviderI18n>
    </StoreProvider>
  );
}

export default App;
