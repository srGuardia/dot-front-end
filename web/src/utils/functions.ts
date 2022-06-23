import { Films } from '../@types/films';
import { LocalStorageProps } from '../@types/storage';

export const getFilms = async (
  type: LocalStorageProps
): Promise<Films[] | []> => {
  const data = await localStorage.getItem(`@WEB:${type}`);

  const dataFilms = data ? (JSON.parse(data) as Films[]) : [];

  return dataFilms;
};

export const saveFilms = async (type: LocalStorageProps, data: Films) => {
  const result = await getFilms(type);

  let obj = [];

  const filterData = result.find((item) => item.id === data.id);
  const indexData = result.findIndex((item) => item.id === data.id);

  if (filterData) {
    const newData = result[indexData];
    newData.the_amount++;
    newData.price = data.price * newData.the_amount;

    const newResult = result.slice(indexData, indexData);

    obj = [...result, ...newResult];
  } else {
    data.the_amount = +1;
    obj = [...result, data];
  }

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

export const getTotalCurrency = (): number => {
  const data = localStorage.getItem(`@WEB:${LocalStorageProps.cart}`);

  const dataFilms = data ? (JSON.parse(data) as Films[]) : [];

  let currency: number = 0;

  dataFilms.forEach((item, index) => {
    currency += dataFilms[index].price;
  });

  return dataFilms.length === 0 ? 0.0 : Number(currency);
};

export const formatCurrency = (value: number) => {
  const newValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value);

  return newValue;
};

export const getTotalItems = () => {
  const data = localStorage.getItem(`@WEB:${LocalStorageProps.cart}`);

  const dataFilms = data ? (JSON.parse(data) as Films[]) : [];

  let totalItems = 0;

  dataFilms.forEach((item) => {
    totalItems += item.the_amount;
  });

  return totalItems;
};
