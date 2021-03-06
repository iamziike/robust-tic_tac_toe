import { createSlice } from '@reduxjs/toolkit';

import {
  Index,
  PositionsPlayed,
  X_O,
  WINNING_POSITIONS_TYPE,
  Difficulty,
} from './../../types/types';
import { GameMode } from '../../types/types';
import LocalStorage from '../../utils/LocalStorage/LocalStorage';
import { isAllNeedlesInHay } from '../../utils/helpers';
import { WINNING_POSITIONS } from '../../constants/constants';

type PlayerName = 'Player 😀' | 'PC 🤖' | 'Player1 😀' | 'Player2 😀';
type UnRegisteredPlayer = { shape: X_O; score: number; name: PlayerName };
type Player = UnRegisteredPlayer & {
  id: number | string;
  positions: Index[];
  isStartingFirst: boolean;
};
type Players = [Player, Player];

type InitialState = {
  positionsPlayed: PositionsPlayed;
  gameMode: GameMode;
  players: Players;
  turn: 0 | 1;
  winner: Player | null;
  isDraw: boolean;
  difficulty: Difficulty;
};

type ActionPayload<T> = {
  payload: T;
};

enum PLAYERS_INDEXES {
  PLAYER_1,
  PLAYER_2,
}

const PLAYER_SHAPE_DB_KEY = 'PLAYER_SHAPE_DB_KEY';
const GAME_MODE_DB_KEY = 'GAME_MODE_DB_KEY';
const DIFFICULTY_DB_KEY = 'DIFFICULTY_DB_KEY';

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
  return [
    { ...player1, id: Math.random(), positions: [], isStartingFirst: true },
    { ...player2, id: Math.random(), positions: [], isStartingFirst: false },
  ];
};

const isWinner = (
  WINNING_POSITIONS: WINNING_POSITIONS_TYPE,
  target: Index[]
) => {
  return WINNING_POSITIONS.some((winningPosition) =>
    isAllNeedlesInHay(target, winningPosition)
  );
};

const getInitialState = (): InitialState => {
  const gameMode = LocalStorage.getItem<GameMode>(GAME_MODE_DB_KEY) || 'PC 🤖';
  const playerShape = LocalStorage.getItem<X_O>(PLAYER_SHAPE_DB_KEY);
  const difficulty =
    LocalStorage.getItem<Difficulty>(DIFFICULTY_DB_KEY) || 'HARD';

  const playersName = getPlayersNamesToUse(gameMode);
  const players = setPlayers(
    setUnRegisteredPlayer(playerShape === 'O' ? 'O' : 'X', playersName[0], 0),
    setUnRegisteredPlayer(playerShape === 'O' ? 'X' : 'O', playersName[1], 0)
  );

  return {
    gameMode,
    players,
    positionsPlayed: {} as PositionsPlayed,
    turn: PLAYERS_INDEXES.PLAYER_1,
    winner: null,
    isDraw: false,
    difficulty,
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

    InnerRefresh(store) {
      if (store.isDraw) store.isDraw = false;
      if (store.winner) store.winner = null;

      store.players = store.players.map((player, index) => {
        if (!player.isStartingFirst) store.turn = index as 0 | 1;
        return {
          ...player,
          positions: [],
          isStartingFirst: player.isStartingFirst ? false : true,
        } as Player;
      }) as Players;
      store.positionsPlayed = {} as PositionsPlayed;
    },

    InnerChangePlayerShape(store) {
      const player1 = store.players[0];
      const player2 = store.players[1];

      [player1.shape, player2.shape] = [player2.shape, player1.shape];

      LocalStorage.setItem(PLAYER_SHAPE_DB_KEY, player1.shape);
    },

    InnerChangeGameMode(store) {
      let { gameMode } = store;
      gameMode = gameMode === 'Human 😀' ? 'PC 🤖' : 'Human 😀';

      LocalStorage.setItem(GAME_MODE_DB_KEY, gameMode);
    },

    InnerAddToPositionsPlayed(
      store,
      { payload }: ActionPayload<{ index: Index; isHuman: boolean }>
    ) {
      const { turn, players, positionsPlayed, gameMode, winner, isDraw } =
        store;
      const { isHuman, index } = payload;

      // check if turn is for pc
      if (gameMode === 'PC 🤖' && turn === PLAYERS_INDEXES.PLAYER_2 && isHuman)
        return store;

      // if cell not empty
      if (positionsPlayed[index]) return;

      // if winnner or draw ie) means game is about to 'self' refresh
      if (winner || isDraw) return;

      const focusedPlayer = players[store.turn];
      positionsPlayed[index] = focusedPlayer.shape;
      focusedPlayer.positions.push(index);

      // notify if Winner is known
      if (isWinner(WINNING_POSITIONS, focusedPlayer.positions)) {
        store.winner = focusedPlayer;
        focusedPlayer.score++;
      }

      // notify if Draw
      if (!winner && Object.values(positionsPlayed).length === 9)
        store.isDraw = true;

      // alternate the turns
      store.turn =
        turn === PLAYERS_INDEXES.PLAYER_1
          ? PLAYERS_INDEXES.PLAYER_2
          : PLAYERS_INDEXES.PLAYER_1;
    },
    InnerChangeGameDifficulty(store) {
      let { difficulty } = store;
      difficulty = difficulty === 'EASY' ? 'HARD' : 'EASY';

      LocalStorage.setItem(DIFFICULTY_DB_KEY, difficulty);
    },
  },
});

export const {
  InnerReset,
  InnerRefresh,
  InnerChangePlayerShape,
  InnerChangeGameMode,
  InnerAddToPositionsPlayed,
  InnerChangeGameDifficulty,
} = boardSlice.actions;

const { reducer: boardReducer } = boardSlice;
export default boardReducer;
