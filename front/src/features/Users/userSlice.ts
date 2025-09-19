import { createSlice } from '@reduxjs/toolkit';
import type { IUser, ValidationError } from '../../types';
import { signinThunk } from './userThunk';

interface userInitialState {
  user: IUser | null;
  userSigninLoading: boolean;
  userSigninError: ValidationError | null;
  userLoginLoading: boolean;
  userLoginError: boolean;
}

const initialState: userInitialState = {
  user: null,
  userSigninLoading: false,
  userSigninError: null,
  userLoginLoading: false,
  userLoginError: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signinThunk.pending, (state) => {
        state.userSigninLoading = true;
        state.userSigninError = null;
      })
      .addCase(signinThunk.fulfilled, (state, { payload: userResponse }) => {
        state.userSigninLoading = false;
        state.user = userResponse.user;
      })
      .addCase(signinThunk.rejected, (state, { payload: error }) => {
        state.userSigninLoading = false;
        state.userSigninError = error || null;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectUserSigninLoading: (state) => state.userSigninLoading,
    selectUserSigninError: (state) => state.userSigninError,
    selectUserLoginLoading: (state) => state.userLoginLoading,
    selectUserLoginError: (state) => state.userLoginError,
  },
});

export const userReducer = userSlice.reducer;
export const {
  selectUser,
  selectUserLoginError,
  selectUserLoginLoading,
  selectUserSigninError,
  selectUserSigninLoading,
} = userSlice.selectors;
