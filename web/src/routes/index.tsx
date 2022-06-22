import { lazy, Suspense, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppContext } from '../context';

const Home = lazy(() => import('../pages/Home'));
const Checkout = lazy(() => import('../pages/Checkout'));

import { ListUserActions } from '../components/List';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Drawer } from '../components/Drawer';
import { LocalStorageProps } from '../@types/storage';

export const AppRoutes = () => {
  const {
    visible,
    onCloseDrawer,
    titleDrawer,
    favorites,
    cart,
    removeAllLocalStorage,
  } = useContext(AppContext);
  return (
    <BrowserRouter>
      <Drawer
        title={titleDrawer}
        placement='right'
        onClose={() => onCloseDrawer()}
        visible={visible}
        extra={
          <Button
            type='link'
            onClick={() =>
              removeAllLocalStorage(
                titleDrawer === 'Meu Carrinho'
                  ? LocalStorageProps.cart
                  : LocalStorageProps.favorites
              )
            }
          >
            Esvaziar
          </Button>
        }
      >
        <ListUserActions
          data={titleDrawer === 'Meu Carrinho' ? cart : favorites}
          visibleCart={titleDrawer === 'Meu Carrinho' ? false : true}
          footer={titleDrawer === 'Meu Carrinho' ? true : false}
          isDrawer
        />
      </Drawer>
      <Suspense fallback='Carregando...'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
