import { Films } from '../context';

type ActionsProps = {
  type: 'cart' | 'favorites';
  data: Films;
};

export const getFilms = async ({
  type,
}: ActionsProps): Promise<Films[] | []> => {
  const data = await localStorage.getItem(`@WEB:${type}`);

  const dataFilms = data ? (JSON.parse(data) as Films[]) : [];

  return dataFilms;
};

export const saveFilms = ({ type, data }: ActionsProps) => {};

export const removeFilms = ({ type, data }: ActionsProps) => {};

export const removeAll = ({ type }: ActionsProps) => {
  localStorage.removeItem(`@WEB:${type}`);
};
