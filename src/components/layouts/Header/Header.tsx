import styled from 'styled-components';

import Icon from '../../ui/Icon/Icon';
import { ReactComponent as BoardIcon } from '/src/assets/solid_chess-board.svg';
import { ReactComponent as SettingIcon } from '/src/assets/settings.svg';
import { ReactComponent as MusicOn } from '/src/assets/on-sound.svg';

const StyledHeader = styled.div`
  padding: ${({ theme }) => `${theme.spacing.xsm} ${theme.spacing.df}`};
  box-shadow: ${({ theme }) => theme.boxShadow.default};

  &,
  & .header-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & .header-title {
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

const Header = () => {
  return (
    <StyledHeader>
      <Icon item={<SettingIcon />} />
      <h1 className='header-title'>
        <span>Tic Tac Toe</span>
        <BoardIcon />
      </h1>
      <Icon item={<MusicOn />} />
    </StyledHeader>
  );
};

export default Header;
