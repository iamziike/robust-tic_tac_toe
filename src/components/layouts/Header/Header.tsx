import styled from 'styled-components';

import Icon from '../../ui/Icon/Icon';
import { ReactComponent as BoardIcon } from '/src/assets/solid_chess-board.svg';
import { ReactComponent as SettingIcon } from '/src/assets/settings.svg';
import ThemeChangerControl from '../../game-configs/ThemeChangerControl/ThemeChangerControl';

type HeaderProps = {
  onSettingClick: VoidFunction;
};

const StyledHeader = styled.div`
  position: relative;
  z-index: 100;
  padding: ${({ theme }) => `${theme.spacing.xsm} ${theme.spacing.df}`};
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.boxShadow.default};

  &,
  & > h1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & > h1 {
    gap: ${({ theme }) => theme.spacing.sm};

    & svg {
      animation: rotate 2s linear infinite both;

      @keyframes rotate {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
`;

const Header = ({ onSettingClick }: HeaderProps) => {
  return (
    <StyledHeader>
      <Icon
        item={<SettingIcon />}
        onClick={onSettingClick}
        description='Settings'
      />
      <h1>
        <span>Tic Tac Toe</span>
        <BoardIcon />
      </h1>
      <ThemeChangerControl shouldShowDescription={false} />
    </StyledHeader>
  );
};

export default Header;
