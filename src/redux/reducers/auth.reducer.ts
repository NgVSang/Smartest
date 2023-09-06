import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser, LoginResponse} from '../../types';
import {RootState} from '../store';

export type AuthState = {
  access_token?: string;
  loggedin: boolean;
  info?: IUser;
};

const initialState: AuthState = {
  loggedin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredential: (state, action: PayloadAction<LoginResponse>) => {
      state.loggedin = true;
      state.info = action.payload.info;
      state.access_token = action.payload.access_token;
    },
    updateCredential: (
      state,
      action: PayloadAction<{
        name?: string;
        email?: string;
        avatar?: string;
      }>,
    ) => {
      if (state.info) {
        if (action.payload.name) {
          state.info.name = action.payload.name;
        }
        if (action.payload.email) {
          state.info.email = action.payload.email;
        }
        if (action.payload.avatar) {
          state.info.avatar = action.payload.avatar;
        }
      }
    },
    logout: (state, action: PayloadAction) => {
      state.loggedin = false;
      state.access_token = undefined;
      state.info = undefined;
    },
  },
});

export const authSelector = (state: RootState) => state.auth;

export const {setCredential, logout, updateCredential} = authSlice.actions;
export default authSlice.reducer;
