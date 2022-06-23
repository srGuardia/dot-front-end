import { axiosConfig } from './config';
import axios from 'axios';
import { ViaCEP } from '../@types/cep';
import { Films } from '../@types/films';

class APIService {
  async getTopRated(page: number): Promise<Films[] | []> {
    const { data } = await axiosConfig.get(`/movie/top_rated?page=${page}`);

    const formatData = data.results as Films[];

    let newData: Films[] = [];

    formatData.forEach((item) => {
      const obj = {
        ...item,
        price: 79.99,
        the_amount: 0,
      };

      newData.push(obj);
    });

    return newData;
  }

  async searchFilms(search: string): Promise<Films[] | []> {
    const { data } = await axiosConfig.get('/search/movie/', {
      params: {
        query: search,
      },
    });

    const formatData = data.results as Films[];

    let newData: Films[] = [];

    formatData.forEach((item) => {
      const obj = {
        ...item,
        price: 79.99,
      };

      newData.push(obj);
    });

    return newData;
  }

  async getCEP(value: number): Promise<ViaCEP> {
    const { data } = await axios.get(`https://viacep.com.br/ws/${value}/json/`);

    return data;
  }
}

export default new APIService();
