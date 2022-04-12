import { extendTheme } from '@chakra-ui/react'

const colors = {
    brand: {
        50: '#a590e0',
        100: '#8d6fe0',
        200: '#8260e0',
        300: '#6e45e0',
        400: '#6639e2',
        500: '#5F30E2',
        600: '#4c26b5',
        700: '#4925ad',
        800: '#42219c',
        900: '#311974'
    },
    foreground: {
        default: '#000000',
        muted: '#666666'
    }
}

const styles = {
    global: {
        fontFamily: '\'Roboto\', sans-serif',
    }
} 

  const theme = extendTheme({ colors, styles })

  export default theme;
