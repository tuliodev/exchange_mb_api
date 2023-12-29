import axios, { AxiosInstance } from 'axios';

const baseURL = 'https://www.mercadobitcoin.net/api';

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
