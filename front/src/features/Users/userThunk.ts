import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../axiosApi';
import type { IUser, ISigninMutation, RegisterResponse, ValidationError, IGlobalError } from '../../types';
import { isAxiosError } from 'axios';

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
