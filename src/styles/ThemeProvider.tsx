import { ThemeProvider as Provider } from 'styled-components';

import GlobalStyles from './GlobalStyles';
import theme, { colors } from './theme';
import useFunctionalityStore from '../store/store-hooks/userFunctionalityStore';
import { ThemeColors } from '../types/styled-components';

type ThemeProviderType = {
  children: React.ReactNode;
};

const darkMode: ThemeColors = {
  primary: colors.white,
  secondary: colors.black,
  tertiary: colors['opacified-black'],
};

const lightMode: ThemeColors = {
  primary: colors.black,
  secondary: colors.white,
  tertiary: colors['opacified-white'],
};

const ThemeProvider = ({ children }: ThemeProviderType) => {
  const { themeMode } = useFunctionalityStore().getStore();

  return (
    <Provider
      theme={{ ...theme, colors: themeMode === 'DARK' ? darkMode : lightMode }}
    >
      <GlobalStyles />
      {children}
    </Provider>
  );
};

export default ThemeProvider;
