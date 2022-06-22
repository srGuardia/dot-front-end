import { Card, Col, Row } from 'antd';
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { Films } from '../../@types/films';
import { LocalStorageProps } from '../../@types/storage';
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
}: CardProps) => (
  <Row gutter={[10, 10]}>
    {data.map((item, index) => (
      <Col key={index} xs={24} sm={12} md={8} lg={6}>
        <Row justify='space-evenly'>
          <Card
            style={{ width: 240 }}
            cover={
              <img
                src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                alt={item.title}
                loading='lazy'
                style={{ height: 360 }}
              />
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
