import { Drawer } from 'antd';
import { lazy, Suspense, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppContext } from '../context';

const Home = lazy(() => import('../pages/Home'));
const Checkout = lazy(() => import('../pages/Checkout'));

export const AppRoutes = () => {
  const { visible, onCloseDrawer, titleDrawer } = useContext(AppContext);
  return (
    <>
      <Drawer
        title={titleDrawer}
        placement='right'
        onClose={() => onCloseDrawer()}
        visible={visible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
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
