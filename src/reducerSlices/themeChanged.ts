import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface themeChangedtate {
  themeChanged: boolean;
}
const initialState: themeChangedtate = {
  themeChanged: false,
};

export const themeChangedSlice = createSlice({
  name: 'themeChanged',
  initialState,
  reducers: {
    setthemeChanged: (
      state: themeChangedtate,
      {payload}: PayloadAction<themeChangedtate>,
    ) => {
      state.themeChanged = payload.themeChanged;
    },
  },
});

export const {setthemeChanged} = themeChangedSlice.actions;
export default themeChangedSlice.reducer;
