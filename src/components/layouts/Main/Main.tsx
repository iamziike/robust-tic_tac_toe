import styled from 'styled-components';
import { useEffect, useRef } from 'react';

import Board from '../../game/Board/Board';
import Player from '../../game/Player/Player';
import AlternateGameShapeControl from '../../game-configs/AlternateGameShapeControl/AlternateGameShapeControl';
import AlternateGameModeControl from '../../game-configs/AlternateGameModeControl/AlternateGameModeControl';
import ResetControl from '../../game-configs/ResetControl/ResetControl';
import useBoardStore from '../../../store/store-hooks/useBoardStore';
import useFunctionalityStore from '../../../store/store-hooks/userFunctionalityStore';
import Toast from '../../ui/Toast/Toast';
import getAIPosition from '../../../utils/getAIPosition';
import { Index } from '../../../types/types';
import { WINNING_POSITIONS } from '../../../constants/constants';
import {
  clearTimeoutIDs,
  executeTillReturnRandomNumber,
} from '../../../utils/helpers';

const StyledMain = styled.main`
  display: flex;
  gap: 20px;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
`;

const Players = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 0 auto;

  @media screen and (max-width: 600px) {
    width: 80%;
  }

  @media screen and (max-width: 350px) {
    width: 100%;
  }
`;

const StyledSetting = styled.div`
  background-color: ${({ theme }) => theme.colors.tertiary};
  width: max-content;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  gap: ${({ theme }) => theme.spacing.df};
  border-radius: 100px;

  &,
  & > * {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledBoard = styled(Board)<{ isFlip: boolean }>`
  width: 80%;
  margin: 30px auto;
  transition: transform 1s;
  transform: ${({ isFlip }) => (isFlip ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`;

const Main = () => {
  const AIActionTImer = useRef<number>();
  const {
    getPlayers,
    getPositionsPlayed,
    addToPlayerPositions,
    getStore: getBoardStore,
    refreshBoard,
  } = useBoardStore();
  const {
    isDraw,
    winner,
    turn,
    players,
    gameMode,
    positionsPlayed,
    difficulty,
  } = getBoardStore();
  const { isFlip } = useFunctionalityStore().getStore();

  const handleBoardClickHandler = (index: Index) => {
    addToPlayerPositions(index, true);
  };

  useEffect(() => {
    if (gameMode !== 'PC 🤖') return;
    AIActionTImer.current && clearTimeoutIDs([AIActionTImer.current]);
    if (players[turn].name !== 'PC 🤖') return;

    AIActionTImer.current = setTimeout(
      () =>
        addToPlayerPositions(
          getAIPosition(
            WINNING_POSITIONS,
            difficulty,
            players[+!turn].positions,
            players[+turn].positions
          ),
          false
        ),
      Object.values(positionsPlayed).length > 6
        ? 500
        : executeTillReturnRandomNumber(1000, 4000)
    );
  }, [positionsPlayed]);

  let toastMessage = '';
  if (isDraw) toastMessage = 'Game ended in a Draw 😞';
  else if (winner) toastMessage = `${winner && winner.name}  just won 😻`;

  return (
    <StyledMain>
      <Toast
        message={toastMessage}
        onClose={refreshBoard}
        isOpen={(winner || isDraw) as boolean}
      />
      <StyledBoard
        isFlip={isFlip}
        onClick={handleBoardClickHandler}
        positionsPlayed={getPositionsPlayed()}
      />
      <Players>
        {getPlayers().map(({ id, name, score, shape }, index) => (
          <Player
            key={id}
            player={{ name, score, shape }}
            shouldPlay={turn === index}
          />
        ))}
      </Players>
      <StyledSetting>
        <AlternateGameShapeControl />
        <AlternateGameModeControl />
        <ResetControl />
      </StyledSetting>
    </StyledMain>
  );
};

export default Main;
