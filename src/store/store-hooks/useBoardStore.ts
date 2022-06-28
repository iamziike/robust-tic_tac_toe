import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store';
import {
  InnerChangePlayerShape,
  InnerReset,
  InnerChangeGameMode,
  InnerAddToPositionsPlayed,
  InnerRefresh,
} from '../slices/boardSlice';
import { Index } from '../../types/types';

// have a function to all the store values not the store ie) the values
// planning to use a different state management for v2
// and I don't want to change any internal code
// don't know if I have achieved my intentions but i'll see after I have published the code

const useBoardStore = () => {
  const store = useSelector((state: RootState) => state.boardReducer);
  const dispatch = useDispatch();

  const getStore = () => store;

  const getPlayers = () => [store.players[0], store.players[1]];

  const getGameMode = () => Object.values(store.gameMode);

  const getPositionsPlayed = () => store.positionsPlayed;

  const getFocusedPlayer = () => store.players[store.turn];

  // change actions

  const resetBoard = () => {
    dispatch(InnerReset());
  };

  const refreshBoard = () => {
    dispatch(InnerRefresh());
  };

  const changePlayerShape = () => {
    dispatch(InnerChangePlayerShape());
    resetBoard();
  };

  const changeGameMode = () => {
    dispatch(InnerChangeGameMode());
    resetBoard();
  };

  const addToPlayerPositions = (index: Index, isHuman: boolean) => {
    dispatch(InnerAddToPositionsPlayed({ isHuman, index }));
  };

  return {
    getStore,
    getPlayers,
    getPositionsPlayed,
    getGameMode,
    getFocusedPlayer,
    resetBoard,
    refreshBoard,
    changePlayerShape,
    changeGameMode,
    addToPlayerPositions,
  };
};

export default useBoardStore;
