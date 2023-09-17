import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react';
import { Button } from '@org/ui';

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
    // Button,
    // Popover,
  },
});
function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <Button />
    </ChakraBaseProvider>
  );
}

export default App;
