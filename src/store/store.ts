import { configureStore } from '@reduxjs/toolkit';

import boardReducer from './slices/boardSlice';
import functionalityReducer from './slices/functionalitySlice';

const store = configureStore({
  reducer: {
    boardReducer: boardReducer,
    functionalityReducer: functionalityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
