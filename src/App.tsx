import { useState } from 'react';
import styled from 'styled-components';

import ThemeProvider from './styles/ThemeProvider';
import Header from './components/layouts/Header/Header';
import Main from './components/layouts/Main/Main';
import SideBar from './components/layouts/SideBar/SideBar';

const StyledGlobalWrapper = styled.div`
  ${({ theme }) => theme.colors.secondary}:red;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  height: 100vh;
  overflow: hidden;

  *::selection {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};
  }

  & > * {
    flex-grow: 0;

    &:nth-child(2) {
      flex-grow: 100;
    }
  }
`;

const StyledSideBar = styled(SideBar)<{ isOpen: boolean }>`
  position: fixed;
  bottom: ${({ isOpen }) => (isOpen ? '0vh' : '100vh')};
  transition: bottom 0.5s ${({ theme }) => theme.transition.bouncy};
`;

const App = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const handleSideBarVisibility = () => setIsSideBarOpen((prev) => !prev);

  return (
    <ThemeProvider>
      <StyledGlobalWrapper>
        <Header onSettingClick={handleSideBarVisibility} />
        <Main />
        <StyledSideBar isOpen={isSideBarOpen} />
      </StyledGlobalWrapper>
    </ThemeProvider>
  );
};

export default App;
