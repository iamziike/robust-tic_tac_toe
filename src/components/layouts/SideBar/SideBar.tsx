import styled from 'styled-components';

import AlternateGameModeConfig from '../../game-configs/AlternateGameModeControl/AlternateGameModeControl';
import AlternateGameShapeConfig from '../../game-configs/AlternateGameShapeControl/AlternateGameShapeControl';
import DifficultyChanger from '../../game-configs/DifficultyChanger/DifficultyChanger';
import FlipConfig from '../../game-configs/FlipControl/FlipControl';
import ResetConfig from '../../game-configs/ResetControl/ResetControl';
import ThemeChangerConfig from '../../game-configs/ThemeChangerControl/ThemeChangerControl';
import Icon from '../../ui/Icon/Icon';
import { ReactComponent as GithubIcon } from '/src/assets/iconmonstr-github-1.svg';

const StyledSideBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: max-content;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.df}`};
`;

type SideBarProps = {
  className?: string;
};

const SideBar = ({ className }: SideBarProps) => {
  return (
    <StyledSideBar className={className}>
      <Icon
        item={<GithubIcon />}
        description='Github'
        link='https://github.com/iamziike'
      />
      <DifficultyChanger />
      <ResetConfig />
      <ThemeChangerConfig />
      <AlternateGameModeConfig />
      <AlternateGameShapeConfig />
      <FlipConfig />
    </StyledSideBar>
  );
};

export default SideBar;
