import styled from 'styled-components';

import Board from '../../game/Board/Board';
import Player from '../../game/Player/Player';
import AlternateGameShapeControl from '../../game-configs/AlternateGameShapeControl/AlternateGameShapeControl';
import AlternateGameModeControl from '../../game-configs/AlternateGameModeControl/AlternateGameModeControl';
import ResetControl from '../../game-configs/ResetControl/ResetControl';
import { Cells, Index, X_O } from '../../../types/types';
import useBoardStore from '../../../store/store-hooks/useBoardStore';
import useFunctionalityStore from '../../../store/store-hooks/userFunctionalityStore';
import Toast from '../../ui/Toast/Toast';
import { useEffect } from 'react';
import getAIPosition from '../../../utils/getAIPosition';
import { WINNING_POSITIONS } from '../../../constants/constants';

const StyledMain = styled.main`
  display: flex;
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
  const {
    getPlayers,
    getPositionsPlayed,
    addToPlayerPositions,
    getStore: getBoardStore,
    refreshBoard,
  } = useBoardStore();
  const { isDraw, winner, turn, players, gameMode, positionsPlayed } =
    getBoardStore();
  const { isFlip } = useFunctionalityStore().getStore();

  const handleBoardClickHandler = (index: Index) => {
    addToPlayerPositions(index, true);
  };

  useEffect(() => {
    if (gameMode !== 'PC 🤖') return;
    if (players[turn].name === 'PC 🤖')
      setTimeout(
        () =>
          addToPlayerPositions(
            getAIPosition(
              WINNING_POSITIONS,
              players[+!turn].positions,
              players[+turn].positions
            ),
            false
          ),
        Object.values(positionsPlayed).length > 6 ? 500 : Math.random() * 4000
      );
  }, [positionsPlayed]);

  return (
    <StyledMain>
      <Toast
        isOpen={isDraw}
        message='Game ended in a Draw 😞'
        onClose={refreshBoard}
      />
      <Toast
        isOpen={winner ? true : false}
        message={`${winner && winner.name}  just won 😻`}
        onClose={refreshBoard}
      />
      <StyledBoard
        isFlip={isFlip}
        onClick={handleBoardClickHandler}
        positionsPlayed={getPositionsPlayed()}
      />
      <Players>
        {getPlayers().map(({ id, name, score, shape }) => (
          <Player key={id} player={{ name, score, shape }} />
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
