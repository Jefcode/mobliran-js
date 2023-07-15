import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ls from 'localstorage-slim';

import { User } from '../../../../shared/types';
import { RootState } from '../../components/app/store';

// User Data from Localstorage
const userDataFromLocalStorage =
  (ls.get('userData', { decrypt: true }) as User) ?? ({} as User);

interface AuthSliceInitialState {
  modalOpen: boolean;
  user: User;
}

const initialState: AuthSliceInitialState = {
  modalOpen: false,
  user: userDataFromLocalStorage,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openModal(state) {
      state.modalOpen = true;
    },
    closeModal(state) {
      state.modalOpen = false;
    },
    login(state: AuthSliceInitialState, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state: AuthSliceInitialState) {
      state.user = {} as User;
    },
  },
});

export const authActions = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
