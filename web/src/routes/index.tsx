import { Col, Drawer, Row, Tooltip } from 'antd';
import { lazy, Suspense, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppContext } from '../context';

const Home = lazy(() => import('../pages/Home'));
const Checkout = lazy(() => import('../pages/Checkout'));

import { ListUserActions } from '../components/List';

export const AppRoutes = () => {
  const { visible, onCloseDrawer, titleDrawer, favorites, cart } =
    useContext(AppContext);
  return (
    <>
      <Drawer
        title={titleDrawer}
        placement='right'
        onClose={() => onCloseDrawer()}
        visible={visible}
      >
        <ListUserActions
          data={titleDrawer === 'Meu Carrinho' ? cart : favorites}
          visibleCart={titleDrawer === 'Meu Carrinho' ? true : false}
        />
      </Drawer>
      <BrowserRouter>
        <Suspense fallback='Carregando...'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/checkout' element={<Checkout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};
