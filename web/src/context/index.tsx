import {
  Children,
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useState,
} from 'react';

type UserProps = {
  name: string;
};

export type Films = {
  id: number;
  title: string;
  vote: number;
  avatar: string;
  the_amount: number;
};

type ContextProps = {
  user: UserProps;
  favorites?: Films[];
  cart?: Films[];
  visible: boolean;
  titleDrawer?: string;
  onCloseDrawer: (title?: string) => void;
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

  const handleClickDrawer = useCallback((title?: string) => {
    setVisible((prevState) => !prevState);

    if (title) setTitleDrawer(title);
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        visible,
        titleDrawer,
        onCloseDrawer: handleClickDrawer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
