import { Empty, Tooltip } from 'antd';
import { useContext } from 'react';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext, Films } from '../../context';
import colors from '../../global/colors';
import {
  formatCurrency,
  getTotalCurrency,
  LocalStorageProps,
} from '../../utils/functions';
import { Button } from '../Button';
import { Container, Content, Footer, List } from './styles';

type ListProps = {
  data: Films[];
  visibleCart: boolean;
  isDivider?: boolean;
  isDrawer?: boolean;
  footer?: boolean;
};

export const ListUserActions = ({
  data,
  visibleCart,
  isDivider,
  isDrawer,
  footer,
}: ListProps) => {
  const { saveLocalStorage, removeLocalStorage, onCloseDrawer } =
    useContext(AppContext);
  const navigate = useNavigate();
  const route = useLocation();

  const handleNavigate = () => {
    if (route.pathname === '/checkout') return;
    navigate('/checkout');
    onCloseDrawer();
  };
  return (
    <Container isDrawer={isDrawer}>
      <Content>
        {data.length === 0 ? (
          <Empty />
        ) : (
          data.map((item, index) => (
            <List key={index} isDivider={isDivider}>
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                  alt={item.title}
                  loading='lazy'
                />
                <span>{item.title}</span>
              </div>

              <div>
                <strong>{formatCurrency(item.price)}</strong>
              </div>

              <div>
                {visibleCart && (
                  <Tooltip title='Adicionar ao carrinho'>
                    <FaShoppingCart
                      color={colors.primary}
                      onClick={() =>
                        saveLocalStorage(LocalStorageProps.cart, item)
                      }
                    />
                  </Tooltip>
                )}

                <Tooltip
                  title={
                    visibleCart
                      ? 'Remover dos favoritos'
                      : 'Remover do carrinho'
                  }
                  placement='topRight'
                  arrowPointAtCenter
                >
                  <FaTrash
                    color={colors.red}
                    onClick={() =>
                      removeLocalStorage(
                        !visibleCart
                          ? LocalStorageProps.cart
                          : LocalStorageProps.favorites,
                        item
                      )
                    }
                  />
                </Tooltip>
              </div>
            </List>
          ))
        )}
      </Content>

      {footer && (
        <Footer>
          <div>
            <span>Total:</span>
            <strong>{formatCurrency(getTotalCurrency())}</strong>
          </div>
          <Button
            block
            type='default'
            htmlType='submit'
            onClick={handleNavigate}
            disabled={data.length > 0 ? false : true}
          >
            Finalizar compra
          </Button>
        </Footer>
      )}
    </Container>
  );
};
