import axios from 'axios';

export const axiosConfig = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: import.meta.env.VITE_APP_API_KEY,
    language: 'pt-BR',
  },
});
