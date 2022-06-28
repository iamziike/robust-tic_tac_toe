import theme from '../styles/theme';

type ThemeColors = {
  primary: string;
  secondary: string;
  tertiary: string;
};

type CustomTheme = typeof theme & {
  colors: ThemeColors;
};

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {}
}
