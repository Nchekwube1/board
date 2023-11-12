import React, {useCallback, useMemo} from 'react';
import {AppDispatch, RootState} from '../../store/store';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import palette from '../colors/pallete';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useDebouncedValue = (value: string, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, value]);

  return debouncedValue;
};

export const usePurpleTextColor = () => {
  const {darkMode} = useAppSelector(state => state.darkMode);
  // const darkMode = true;

  return {
    color: darkMode ? palette.primary30 : palette.primary10,
  };
};
export const useErrorTextColor = () => {
  const {darkMode} = useAppSelector(state => state.darkMode);
  // const darkMode = true;

  return {
    color: darkMode ? palette.red20Dark : palette.toastErrorSide,
  };
};
