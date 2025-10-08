import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../axiosApi';
import type { IUser, ISigninMutation, RegisterResponse, ValidationError, IGlobalError } from '../../types';
import { isAxiosError } from 'axios';
import type { RootState } from '../../app/store';
import { unsetUser } from './userSlice';

export const signinThunk = createAsyncThunk<RegisterResponse, ISigninMutation, { rejectValue: ValidationError }>(
  'user/signin',
  async (userMutation, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.post('/users', userMutation);
      return data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);

export const loginThunk = createAsyncThunk<IUser, ISigninMutation, { rejectValue: IGlobalError }>(
  'user/login',
  async (userMutation, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.post('/users/sessions', userMutation);
      return data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);

export const logOutThunk = createAsyncThunk<void, void>('users/logOutThunk', async (_, { dispatch }) => {
  await axiosApi.delete('/users/sessions');
  await dispatch(unsetUser());
});

export const loginGoogleThunk = createAsyncThunk<IUser, string, { rejectValue: IGlobalError }>(
  'user/loginGoogle',
  async (credential, { rejectWithValue }) => {
    try {
      const { data: user } = await axiosApi.post<IUser>('/users/google', { credential });
      return user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);
