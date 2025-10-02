import axios, { AxiosHeaders } from 'axios';
import type { RootState } from './app/store';
import type { Store } from '@reduxjs/toolkit';

export const axiosApi = axios.create({
  baseURL: 'http://localhost:8000',
});


export const addInterceptors = (store:Store<RootState>)=>{
  axiosApi.interceptors.request.use((config)=>{
    const token = store.getState().user.user?.token;
    const headers = config.headers as AxiosHeaders;
    headers.set("Authorization", token)
    return config
  })
}