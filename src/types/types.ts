import { WINNING_POSITIONS } from './../constants/constants';
export type X_O = 'X' | 'O';

export type Index = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Cell = null | X_O;

export type Cells = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];

export type GameMode = 'Human 😀' | 'PC 🤖';

export type ThemeMode = 'DARK' | 'LIGHT';

export type PositionsPlayed = Record<Index, Cell>;

export type WINNING_POSITIONS_TYPE = typeof WINNING_POSITIONS;
