import { createSlice } from '@reduxjs/toolkit';

import { ThemeMode } from './../../types/types';

type InitialState = {
  themeMode: ThemeMode;
  isFlip: boolean;
  isMusicOn: boolean;
};

const initialState: InitialState = {
  themeMode: 'DARK',
  isFlip: false,
  isMusicOn: true,
};

const functionalitySlice = createSlice({
  initialState,
  name: 'functionalitySlice',
  reducers: {
    innerChangeTheme(store, { payload }: { payload: ThemeMode }) {
      if (payload !== store.themeMode) store.themeMode = payload;
    },
    innerChangeIsFlip(store, { payload }: { payload: boolean }) {
      if (payload !== store.isFlip) store.isFlip = payload;
    },
    innerChangeIsMusicOn(store, { payload }: { payload: boolean }) {
      if (payload !== store.isMusicOn) store.isMusicOn = payload;
    },
  },
});

const functionalityReducer = functionalitySlice.reducer;
export default functionalityReducer;

export const { innerChangeIsFlip, innerChangeIsMusicOn, innerChangeTheme } =
  functionalitySlice.actions;
