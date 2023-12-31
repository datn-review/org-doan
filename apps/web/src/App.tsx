// import { extendBaseTheme } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { ProviderI18n, useTranslation } from '@org/i18n';
import { AntdProvider, ComponentInject, GlobalStyle } from '@org/ui';
import { StoreProvider } from '@org/store';
import { MessageProvider, PortalProvider } from '@org/core';
import { useEffect } from 'react';

// const theme = extendBaseTheme({
//   styles: {
//     color: '2F2B3DC7',
//   },
//   components: {
//     // Button,
//     // Popover,
//   },
// });
const Router = () => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t('document.title');
  }, [t]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

const App = ComponentInject({
  providers: [StoreProvider, PortalProvider, MessageProvider, ProviderI18n, AntdProvider],
  template: [GlobalStyle],
  bootstrap: Router,
});

export default App;
