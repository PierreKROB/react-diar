// chakra-theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false,
    },
    styles: {
        global: (props) => ({
            body: {
                color: props.colorMode === 'dark' ? 'gray.200' : 'gray.800',
                bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.200',
            },
        }),
    },
});

export default theme;
