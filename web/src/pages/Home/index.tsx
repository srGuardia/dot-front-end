import { Button, Card, Row } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { Films } from '../../@types/films';

import { CardFilms } from '../../components/Card';
import { AppContext } from '../../context';
import api from '../../services/api';
import { Container } from './styles';

const Home = () => {
  const [films, setFilms] = useState<Films[] | []>([]);
  let [page, setPage] = useState(1);
  const { searchFilms, saveLocalStorage, removeLocalStorage, handleLoading } =
    useContext(AppContext);

  const getFilms = async () => {
    const result = await api.getTopRated(page);
    setFilms((prevState) => [...prevState, ...result]);
    handleLoading();
  };

  const handleFetchMore = () => {
    handleLoading();
    setPage((page += 1));
    getFilms();
  };

  useEffect(() => {
    getFilms();
  }, []);

  return (
    <Container>
      <CardFilms
        data={searchFilms ? searchFilms : films}
        removeLocalStorage={removeLocalStorage}
        saveLocalStorage={saveLocalStorage}
      />

      <Row justify='center' style={{ marginTop: '2.5rem' }}>
        <Button type='primary' onClick={handleFetchMore}>
          Carregar mais
        </Button>
      </Row>
    </Container>
  );
};

export default Home;
