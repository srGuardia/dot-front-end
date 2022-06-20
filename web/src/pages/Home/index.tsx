import { Button, Card, Col, Row } from 'antd';
import { useContext, useEffect, useState } from 'react';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { AppContext, Films } from '../../context';
import colors from '../../global/colors';
import api from '../../services/api';
import { isFavorite, LocalStorageProps } from '../../utils/functions';
import { Container } from './styles';

const { Meta } = Card;

const Home = () => {
  const [films, setFilms] = useState<Films[] | []>([]);
  let [page, setPage] = useState(1);
  const { searchFilms, saveLocalStorage, removeLocalStorage } =
    useContext(AppContext);

  const getFilms = async () => {
    const result = await api.getTopRated(page);
    setFilms((prevState) => [...prevState, ...result]);
  };

  const handleFetchMore = () => {
    setPage((page += 1));
    getFilms();
  };

  useEffect(() => {
    getFilms();
  }, []);

  return (
    <Container>
      <Row gutter={[10, 10]}>
        {searchFilms
          ? searchFilms.map((item, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Row justify='space-evenly'>
                  <Card
                    style={{ width: 240 }}
                    cover={
                      <img
                        src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                        alt={item.title}
                        loading='lazy'
                      />
                    }
                    actions={[
                      isFavorite(item.id, LocalStorageProps.favorites) ? (
                        <AiFillHeart
                          color={colors.red}
                          onClick={() =>
                            removeLocalStorage(
                              LocalStorageProps.favorites,
                              item
                            )
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
                        onClick={() =>
                          saveLocalStorage(LocalStorageProps.cart, item)
                        }
                      />,
                    ]}
                  >
                    <Meta
                      title={item.title}
                      description={
                        item.overview ? item.overview : 'Sem decrição...'
                      }
                    />
                  </Card>
                </Row>
              </Col>
            ))
          : films.map((item, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Row justify='space-evenly'>
                  <Card
                    style={{ width: 240 }}
                    cover={
                      <img
                        src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                        alt={item.title}
                        loading='lazy'
                      />
                    }
                    actions={[
                      isFavorite(item.id, LocalStorageProps.favorites) ? (
                        <AiFillHeart
                          color={colors.red}
                          onClick={() =>
                            removeLocalStorage(
                              LocalStorageProps.favorites,
                              item
                            )
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
                        onClick={() =>
                          saveLocalStorage(LocalStorageProps.cart, item)
                        }
                      />,
                    ]}
                  >
                    <Meta
                      title={item.title}
                      description={
                        item.overview ? item.overview : 'Sem decrição...'
                      }
                    />
                  </Card>
                </Row>
              </Col>
            ))}
      </Row>

      <Row justify='center' style={{ paddingTop: 10 }}>
        <Button type='primary' onClick={handleFetchMore}>
          Carregar mais
        </Button>
      </Row>
    </Container>
  );
};

export default Home;
