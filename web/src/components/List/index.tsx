import { Empty, Tooltip } from 'antd';
import { useContext } from 'react';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { AppContext, Films } from '../../context';
import colors from '../../global/colors';
import { LocalStorageProps } from '../../utils/functions';
import { Container } from './styles';

type ListProps = {
  data: Films[];
  visibleCart: boolean;
};

export const ListUserActions = ({ data, visibleCart }: ListProps) => {
  const { saveLocalStorage, removeLocalStorage } = useContext(AppContext);
  return (
    <>
      {data.length === 0 ? (
        <Empty />
      ) : (
        data.map((item, index) => (
          <Container key={index}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                alt={item.title}
                loading='lazy'
              />
              <span>{item.title}</span>
            </div>

            <div>
              <strong>R${item.price}</strong>
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
                  visibleCart ? 'Remover dos favoritos' : 'Remover do carrinho'
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
          </Container>
        ))
      )}
    </>
  );
};
