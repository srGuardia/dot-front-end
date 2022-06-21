import { message } from 'antd';
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import api from '../services/api';
import {
  getFilms,
  LocalStorageProps,
  removeAll,
  removeFilms,
  saveFilms,
} from '../utils/functions';

type UserProps = {
  name: string;
};

export type Films = {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  overview: string;
  the_amount: number;
  price: number;
};

type ContextProps = {
  user: UserProps;
  searchFilms: Films[] | null;
  favorites: Films[];
  cart: Films[];
  visible: boolean;
  titleDrawer?: string;
  onCloseDrawer: (title?: string) => void;
  handleSearchFilms: (search: string) => void;
  saveLocalStorage: (type: LocalStorageProps, data: Films) => void;
  removeLocalStorage: (type: LocalStorageProps, data: Films) => void;
  removeAllLocalStorage: (type: LocalStorageProps) => void;
};

type AppProps = {
  children: ReactNode;
};

export const AppContext = createContext({} as ContextProps);
const user: UserProps = {
  name: 'Uzumaki Naruto',
};

export const AppProvider = ({ children }: AppProps) => {
  const [visible, setVisible] = useState(false);
  const [titleDrawer, setTitleDrawer] = useState('');
  const [favorites, setFavorites] = useState<Films[] | []>([]);
  const [cart, setCart] = useState<Films[] | []>([]);
  const [searchFilms, setSearchFilms] = useState<Films[] | null>(null);

  async function getDataStorage() {
    const resultFavorites = await getFilms(LocalStorageProps.favorites);
    setFavorites(resultFavorites);

    const resultCart = await getFilms(LocalStorageProps.cart);
    setCart(resultCart);
  }

  useEffect(() => {
    getDataStorage();
  }, []);

  const handleClickDrawer = useCallback((title?: string) => {
    setVisible((prevState) => !prevState);

    if (title) setTitleDrawer(title);
  }, []);

  const handleSearchFilms = async (search: string) => {
    if (search) {
      const result = await api.searchFilms(search);
      setSearchFilms(result);
      return;
    }

    setSearchFilms(null);
  };

  const saveLocalStorage = useCallback(
    async (type: LocalStorageProps, data: Films) => {
      await saveFilms(type, data);

      if (type === LocalStorageProps.cart) {
        const result = await getFilms(type);
        setCart(result);
        message.success('Adicionado ao carrinho');
        return;
      }

      if (type === LocalStorageProps.favorites) {
        const result = await getFilms(type);
        setFavorites(result);
        message.success('Adicionado aos favoritos');
        return;
      }
    },
    []
  );

  const removeLocalStorage = useCallback(
    async (type: LocalStorageProps, data: Films) => {
      await removeFilms(type, data);

      if (type === LocalStorageProps.cart) {
        const result = await getFilms(type);
        setCart(result);
        message.warning('Removido do carrinho');
        return;
      }

      if (type === LocalStorageProps.favorites) {
        const result = await getFilms(type);
        setFavorites(result);
        message.warning('Removido dos favoritos');
        return;
      }
    },
    []
  );

  const removeAllLocalStorage = useCallback(async (type: LocalStorageProps) => {
    await removeAll(type);

    if (type === LocalStorageProps.cart) {
      setCart([]);
      message.warning('Carrinho limpo');
      return;
    }

    if (type === LocalStorageProps.favorites) {
      setFavorites([]);
      message.warning('Favoritos limpo');
      return;
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        searchFilms,
        favorites,
        cart,
        visible,
        titleDrawer,
        onCloseDrawer: handleClickDrawer,
        handleSearchFilms,
        saveLocalStorage,
        removeLocalStorage,
        removeAllLocalStorage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
