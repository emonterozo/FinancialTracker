import {extendTheme} from 'native-base';

interface IStyle {
  colorScheme: string;
}

export const theme = extendTheme({
  colors: {
    primary: {
      '50': '#ffe0d7',
      '100': '#ffc1af',
      '200': '#ffa288',
      '300': '#ff8260',
      '400': '#ff653a',
      '500': '#f85527',
      '600': '#f04718',
      '700': '#db4016',
      '800': '#bf3e1a',
      '900': '#a43a1d',
    },
    secondary: {
      '50': '#e1cdff',
      '100': '#c9a5ff',
      '200': '#b17dff',
      '300': '#9a5bfa',
      '400': '#8032f9',
      '500': '#7624f1',
      '600': '#6a17e7',
      '700': '#621ccb',
      '800': '#591fb0',
      '900': '#502196',
    },
    tertiary: {
      '50': '#5f63b5',
      '100': '#52559b',
      '200': '#4a4c7b',
      '300': '#40415d',
      '400': '#2f3045',
      '500': '#292935',
      '600': '#212126',
      '700': '#171718',
      '800': '#0c0c0b',
      '900': '#000000',
    },
  },
  components: {
    Input: {
      defaultProps: {
        _focus: {
          borderColor: 'primary.400',
        },
      },
    },
    ModalHeader: {
      baseStyle: {
        borderColor: '#FAFAFA',
      },
    },
    ModalFooter: {
      baseStyle: {
        borderColor: '#FAFAFA',
      },
    },
    Button: {
      variants: {
        link: {
          _text: {
            color: 'primary.400',
            fontWeight: 'bold',
          },
          _pressed: {
            _text: {
              color: 'secondary.400',
              fontWeight: 'bold',
            },
          },
        },
        solid: {
          bg: 'primary.400',
          _pressed: {
            bg: 'secondary.400',
          },
          _text: {
            color: 'white',
            fontWeight: 'bold',
          },
        },
        outline: ({colorScheme}: IStyle) => {
          return {
            borderColor: `${colorScheme}.400`,
            _text: {
              color: `${colorScheme}.400`,
              fontWeight: 'bold',
            },
            _pressed: {
              bg: `${colorScheme}.400`,
              _text: {
                color: 'white',
                fontWeight: 'bold',
              },
            },
          };
        },
      },
    },
  },
  fontConfig: {
    Nunito: {
      100: {
        normal: 'Nunito-ExtraLight',
        italic: 'Nunito-ExtraLightItalic',
      },
      200: {
        normal: 'Nunito-ExtraLight',
        italic: 'Nunito-ExtraLightItalic',
      },
      300: {
        normal: 'Nunito-Light',
        italic: 'Nunito-LightItalic',
      },
      400: {
        normal: 'Nunito-Regular',
        italic: 'Nunito-Italic',
      },
      500: {
        italic: 'Nunito-MediumItalic',
      },
      600: {
        normal: 'Nunito-SemiBold',
        italic: 'Nunito-SemiBoldItalic',
      },
      700: {
        normal: 'Nunito-Bold',
        italic: 'Nunito-BoldItalic',
      },
      800: {
        normal: 'Nunito-ExtraBold',
      },
      900: {
        normal: 'Nunito-Black',
        italic: 'Nunito-BlackItalic',
      },
    },
  },
  fonts: {
    heading: 'Nunito',
    body: 'Nunito',
    mono: 'Nunito',
  },
});
