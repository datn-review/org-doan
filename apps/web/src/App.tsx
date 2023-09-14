import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import { GrammarForWriting } from './modules/GrammarForWriting';
import { useObserverHeight } from '@hooks/useObserverHeight';
import { PostMessage } from '@utils/PostMessage/PostMessage';
import { GFW } from '@contants/post-message-action';
import { ModalProvider } from '@contexts/ModalContext';

const { Button, Popover } = chakraTheme.components;

const theme = extendBaseTheme({
  styles: {
    global: {
      'html, body': {
        fontSize: '16px',
        color: '#000',
        lineHeight: 'auto',
        padding: 0,
        fontFamily: 'HelveticaNeue',
      },
      a: {
        color: 'teal.500',
      },
    },
  },
  components: {
    Button,
    Popover,
  },
});
function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <ModalProvider>
        <GrammarForWriting />
      </ModalProvider>
    </ChakraBaseProvider>
  );
}

export default App;
