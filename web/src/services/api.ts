import { Films } from '../context';
import { axiosConfig } from './config';

class APIService {
  async getTopRated(page: number): Promise<Films[] | []> {
    const { data } = await axiosConfig.get(`/movie/top_rated?page=${page}`);

    const formatData = data.results as Films[];

    return formatData;
  }

  async searchFilms(search: string): Promise<Films[] | []> {
    const { data } = await axiosConfig.get('/search/movie/', {
      params: {
        query: search,
      },
    });

    const formatData = data.results as Films[];

    return formatData;
  }
}

export default new APIService();
