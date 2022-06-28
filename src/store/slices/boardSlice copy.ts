import { createSlice } from '@reduxjs/toolkit';

import { Cell, Index, PositionsPlayed, X_O } from './../../types/types';
import { GameMode } from '../../types/types';
import LocalStorage from '../../utils/LocalStorage/LocalStorage';

type PlayerName = 'Player 😀' | 'PC 🤖' | 'Player1 😀' | 'Player2 😀';
type UnRegisteredPlayer = { shape: X_O; score: number; name: PlayerName };
type Player = UnRegisteredPlayer & { id: number | string };
type Players = {
  Player1: Player;
  Player2: Player;
};

type InitialState = {
  positionsPlayed: PositionsPlayed;
  gameMode: GameMode;
  players: {
    Player1: Player;
    Player2: Player;
  };
  turn: Player;
};

type ActionPayload<T> = {
  payload: T;
};

const PLAYER_DB_KEY = 'PLAYER_DB_KEY';
const GAME_MODE_DB_KEY = 'GAME_MODE_DB_KEY';
const POSITION_PLAYED_DB_KEY = 'POSITION_PLAYED_DB_KEY';

const getPlayersNamesToUse = (gameMode: GameMode): [PlayerName, PlayerName] => {
  return gameMode === 'Human 😀'
    ? ['Player1 😀', 'Player2 😀']
    : ['Player 😀', 'PC 🤖'];
};

const setUnRegisteredPlayer = (shape: X_O, name: PlayerName, score: number) => {
  return {
    shape,
    name,
    score,
  };
};

const setPlayers = (
  player1: UnRegisteredPlayer,
  player2: UnRegisteredPlayer
): Players => {
  return {
    Player1: { ...player1, id: Math.random() },
    Player2: { ...player2, id: Math.random() },
  };
};

const getInitialState = (): InitialState => {
  const gameMode = LocalStorage.getItem<GameMode>(GAME_MODE_DB_KEY) || 'PC 🤖';

  const playersName = getPlayersNamesToUse(gameMode);
  const players =
    LocalStorage.getItem<Players>(PLAYER_DB_KEY) ||
    setPlayers(
      setUnRegisteredPlayer('O', playersName[0], 0),
      setUnRegisteredPlayer('X', playersName[1], 0)
    );

  const positionsPlayed = (LocalStorage.getItem(POSITION_PLAYED_DB_KEY) ||
    {}) as PositionsPlayed;

  return {
    gameMode,
    players,
    positionsPlayed,
    turn: players.Player1,
  };
};

const initialState = getInitialState();

const boardSlice = createSlice({
  name: 'boardSlice',
  initialState,
  reducers: {
    // Inner is used sorely as a 'namespace'

    InnerReset() {
      return getInitialState();
    },
    InnerChangePlayerShape(store) {
      const player1 = store.players.Player1;
      const player2 = store.players.Player2;

      [player1.shape, player2.shape] = [player2.shape, player1.shape];

      const players: Players = {
        Player1: { ...player1 },
        Player2: { ...player2 },
      };

      LocalStorage.setItem(PLAYER_DB_KEY, players);
    },
    InnerChangeGameMode(store) {
      let { gameMode, players } = store;
      gameMode = gameMode === 'Human 😀' ? 'PC 🤖' : 'Human 😀';

      const player1 = players.Player1;
      const player2 = players.Player2;

      players = {
        Player1: { ...player1, name: getPlayersNamesToUse(gameMode)[0] },
        Player2: { ...player2, name: getPlayersNamesToUse(gameMode)[1] },
      };

      LocalStorage.setItem(GAME_MODE_DB_KEY, gameMode);
      LocalStorage.setItem(PLAYER_DB_KEY, players);
    },
    InnerAddToPositionsPlayed(
      store,
      { payload }: ActionPayload<{ value: Index; by: PlayerName }>
    ) {
      // check if turn is for pc
      if (store.turn.name === 'PC 🤖' && payload.by !== 'PC 🤖') return store;
      Object.values(store.players).forEach((player) => {
        // if(player.id === turn)
      });
    },
  },
});

export const {
  InnerReset,
  InnerChangePlayerShape,
  InnerChangeGameMode,
  InnerAddToPositionsPlayed,
} = boardSlice.actions;

const { reducer: boardReducer } = boardSlice;
export default boardReducer;
