import styled from 'styled-components';

import ThemeProvider from './styles/ThemeProvider';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/layouts/Header/Header';

const StyledGlobalWrapper = styled.div`
  ${({ theme }) => theme.color.black}:red;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.black};
  color: ${({ theme }) => theme.color.white};
  height: 100vh;

  *::selection {
    background-color: ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.black};
  }

  & > * {
    flex-grow: 0;

    &:nth-child(2) {
      flex-grow: 100;
    }
  }
`;

const App = () => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <StyledGlobalWrapper>
        <Header />
        <main>Main</main>
      </StyledGlobalWrapper>
    </ThemeProvider>
  );
};

export default App;
