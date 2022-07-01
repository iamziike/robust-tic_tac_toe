import styled from 'styled-components';

import { X_O } from '../../../types/types';

type PlayerProps = {
  player: { score: number; name: string; shape: X_O };
  shouldPlay: boolean;
  className?: string;
};

const StyledPlayer = styled.div<{ shouldPlay: boolean }>`
  position: relative;
  text-align: center;
  padding: 30px 20px;

  box-shadow: ${({ theme, shouldPlay }) =>
    shouldPlay
      ? `${theme.boxShadow.default}, ${theme.boxShadow.default}, ${theme.boxShadow.default}`
      : ''};
  border-radius: 10px;

  transition: box-shadow 0.5s;

  & > * {
    position: relative;
    font-size: 20px;
  }

  & .name {
    font-size: 20px;
    white-space: nowrap;
    width: 100px;
  }

  & .shape {
    font-size: 50px;
  }
`;

const Player = ({ player, className, shouldPlay }: PlayerProps) => {
  const { name, score, shape } = player;

  return (
    <StyledPlayer className={className} shouldPlay={shouldPlay}>
      <p className='name'>{name}</p>
      <p className='shape'>{shape}</p>
      <p className='score'>{score}</p>
    </StyledPlayer>
  );
};

export default Player;
