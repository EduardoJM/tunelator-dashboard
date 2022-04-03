import { extendTheme } from '@chakra-ui/react'

const colors = {
    brand: '#004D40',
    brandColor: '#FFFFFF',
    paper: '#EEEEEE',
    paperColor: '#222222',
    paperColorMuted: '#888888',
}

const styles = {
    global: {
        fontFamily: '\'Roboto\', sans-serif',
    }
} 

  const theme = extendTheme({ colors, styles })

  export default theme;
