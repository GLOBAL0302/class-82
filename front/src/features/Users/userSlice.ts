import { createSlice } from '@reduxjs/toolkit';
import type { IGlobalError, IUser, ValidationError } from '../../types';
import { loginThunk, signinThunk } from './userThunk';

interface userInitialState {
  user: IUser | null;
  userSigninLoading: boolean;
  userSigninError: ValidationError | null;
  userLoginLoading: boolean;
  userLoginError: IGlobalError | null;
}

const initialState: userInitialState = {
  user: null,
  userSigninLoading: false,
  userSigninError: null,
  userLoginLoading: false,
  userLoginError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    unsetUser:(state)=>{
      state.user =  null
    }
  },
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
    builder
      .addCase(loginThunk.pending, (state) => {
        state.userSigninLoading = true;
        state.userSigninError = null;
      })
      .addCase(loginThunk.fulfilled, (state, { payload: user }) => {
        state.userSigninLoading = false;
        state.user = user;
      })
      .addCase(loginThunk.rejected, (state, { payload: error }) => {
        state.userSigninLoading = false;
        state.userLoginError = error || null;
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
export const {unsetUser} = userSlice.actions
export const {
  selectUser,
  selectUserLoginError,
  selectUserLoginLoading,
  selectUserSigninError,
  selectUserSigninLoading,
} = userSlice.selectors;
