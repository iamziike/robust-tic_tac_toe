import { useSelector, useDispatch } from 'react-redux';

import {
  innerChangeIsFlip,
  innerChangeIsMusicOn,
  innerChangeTheme,
} from '../slices/functionalitySlice';
import { ThemeMode } from './../../types/types';
import { RootState } from './../store';

const useFunctionalityStore = () => {
  const store = useSelector((state: RootState) => state.functionalityReducer);
  const dispatch = useDispatch();

  const getStore = () => store;

  const changeIsFlip = (isFlip: boolean) => {
    dispatch(innerChangeIsFlip(isFlip));
  };

  const changeIsMusicOn = (isMusicOn: boolean) => {
    dispatch(innerChangeIsMusicOn(isMusicOn));
  };

  const changeTheme = (theme: ThemeMode) => {
    dispatch(innerChangeTheme(theme));
  };

  return { getStore, changeIsFlip, changeTheme, changeIsMusicOn };
};

export default useFunctionalityStore;
