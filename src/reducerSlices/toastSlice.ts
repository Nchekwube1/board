import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {apiNotifications} from '../constants/types/types';

const initialState: apiNotifications = {
  status: 0,
  message: '',
};

export const apiToastSlice = createSlice({
  name: 'apiToast',
  initialState,
  reducers: {
    showToast(state, {payload}: PayloadAction<apiNotifications>) {
      state.status = payload.status;
      state.message = payload.message;
    },
    hideToast(state) {
      state.status = 0;
      state.message = '';
    },
  },
});

export const {showToast, hideToast} = apiToastSlice.actions;
export default apiToastSlice.reducer;
