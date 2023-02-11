import axios, { AxiosRequestConfig } from 'axios';
import errorHandler from './errorHandler';

export const baseURL = process.env.REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL,
  timeout: 2000,
});

const client = (options: AxiosRequestConfig<any>, handleError = true) => {
  const onSuccess = (response: { data: any }) => response.data;
  const onError = (error: any) => errorHandler(error, handleError);
  return instance(options).then(onSuccess).catch(onError);
};

export default client;
