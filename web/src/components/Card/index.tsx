import { Card, Col, Row, Spin } from 'antd';
import { useContext } from 'react';
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { Films } from '../../@types/films';
import { LocalStorageProps } from '../../@types/storage';
import { AppContext } from '../../context';
import colors from '../../global/colors';
import { formatCurrency, isFavorite } from '../../utils/functions';
import { Price, RateContainer } from './styles';

type CardProps = {
  data: Films[];
  removeLocalStorage: (type: LocalStorageProps, data: Films) => void;
  saveLocalStorage: (type: LocalStorageProps, data: Films) => void;
};

const { Meta } = Card;

export const CardFilms = ({
  data,
  removeLocalStorage,
  saveLocalStorage,
}: CardProps) => {
  const { loading } = useContext(AppContext);
  return (
    <Row gutter={[10, 10]}>
      {data.map((item, index) => (
        <Col key={index} xs={24} sm={12} md={8} lg={6}>
          <Row justify='space-evenly'>
            <Card
              style={{ width: 240 }}
              loading={loading}
              cover={
                <Spin spinning={loading}>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                    alt={item.title}
                    loading='lazy'
                    style={{ height: 360 }}
                  />
                </Spin>
              }
              actions={[
                <RateContainer>
                  <AiFillStar />
                  <span>{item.vote_average}</span>
                </RateContainer>,
                isFavorite(item.id, LocalStorageProps.favorites) ? (
                  <AiFillHeart
                    color={colors.red}
                    onClick={() =>
                      removeLocalStorage(LocalStorageProps.favorites, item)
                    }
                  />
                ) : (
                  <AiOutlineHeart
                    onClick={() =>
                      saveLocalStorage(LocalStorageProps.favorites, item)
                    }
                  />
                ),
                <AiOutlineShoppingCart
                  onClick={() => saveLocalStorage(LocalStorageProps.cart, item)}
                />,
              ]}
            >
              <Meta
                title={item.title}
                description={item.overview ? item.overview : 'Sem decrição...'}
              />
              <Price>
                <strong>{formatCurrency(item.price)}</strong>
              </Price>
            </Card>
          </Row>
        </Col>
      ))}
    </Row>
  );
};
