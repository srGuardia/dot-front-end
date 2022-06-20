import { Films } from '../context';

export enum LocalStorageProps {
  cart = 'cart',
  favorites = 'favorites',
}

export const getFilms = async (
  type: LocalStorageProps
): Promise<Films[] | []> => {
  const data = await localStorage.getItem(`@WEB:${type}`);

  const dataFilms = data ? (JSON.parse(data) as Films[]) : [];

  return dataFilms;
};

export const saveFilms = async (type: LocalStorageProps, data: Films) => {
  const result = await getFilms(type);
  const obj = [...result, data];

  await localStorage.setItem(`@WEB:${type}`, JSON.stringify(obj));
};

export const removeFilms = async (type: LocalStorageProps, data: Films) => {
  const result = localStorage.getItem(`@WEB:${type}`);

  const dataFilms = result ? (JSON.parse(result) as Films[]) : [];

  const isFiltered = dataFilms.filter((item) => item.id !== data.id);

  await localStorage.setItem(`@WEB:${type}`, JSON.stringify(isFiltered));
};

export const removeAll = (type: LocalStorageProps) => {
  localStorage.removeItem(`@WEB:${type}`);
};

export const isFavorite = (id: number, type: LocalStorageProps) => {
  const data = localStorage.getItem(`@WEB:${type}`);

  const dataFilms = data ? (JSON.parse(data) as Films[]) : [];

  const isFiltered = dataFilms.find((item) => item.id === id);

  if (isFiltered) return true;

  return false;
};
