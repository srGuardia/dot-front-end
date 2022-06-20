import { Container, InputContainer } from './styles';
import {
  AiFillHeart,
  AiOutlineShoppingCart,
  AiOutlineSearch,
} from 'react-icons/ai';
import { Badge, Col, Row } from 'antd';
import { AppContext } from '../../context';
import { useContext, useEffect, useState } from 'react';

export const Header = () => {
  const { onCloseDrawer, handleSearchFilms, cart } = useContext(AppContext);

  const [search, setSearch] = useState('');

  return (
    <Container>
      <Row>
        <Col span={12}>
          <Row justify='space-between' align='middle'>
            <h1>LOGO</h1>
            <InputContainer>
              <input
                type='text'
                placeholder='Pesquisa'
                onChange={(e) => setSearch(e.target.value)}
              />
              <AiOutlineSearch onClick={() => handleSearchFilms(search)} />
            </InputContainer>
          </Row>
        </Col>

        <Col span={12}>
          <Row align='middle' justify='end'>
            <AiFillHeart onClick={() => onCloseDrawer('Meus Favoritos')} />
            <Badge count={cart.length}>
              <AiOutlineShoppingCart
                onClick={() => onCloseDrawer('Meu Carrinho')}
              />
            </Badge>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
