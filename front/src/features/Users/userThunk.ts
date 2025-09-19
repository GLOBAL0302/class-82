import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../axiosApi';
import type { IUser, IUserMutation, RegisterResponse, ValidationError } from '../../types';
import { isAxiosError } from 'axios';

export const signinThunk = createAsyncThunk<RegisterResponse, IUserMutation, { rejectValue: ValidationError }>(
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

export const loginThunk = createAsyncThunk<IUser, IUserMutation>('user/login', async (userMutation) => {
  const { data } = await axiosApi.post('/users/sessions', userMutation);
  return data;
});
