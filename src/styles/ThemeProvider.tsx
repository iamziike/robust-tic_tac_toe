import { ThemeProvider as Provider } from 'styled-components';

import theme from './theme';

type ThemeProviderType = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderType) => {
  return <Provider theme={theme}>{children}</Provider>;
};

export default ThemeProvider;
