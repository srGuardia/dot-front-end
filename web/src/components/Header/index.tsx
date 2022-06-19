import { Container } from './styles';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineSearch,
} from 'react-icons/ai';
import { Badge, Col, Row } from 'antd';
import { AppContext } from '../../context';
import { useContext } from 'react';

export const Header = () => {
  const { onCloseDrawer } = useContext(AppContext);
  return (
    <Container>
      <Row>
        <Col span={12}>
          <Row justify='space-between' align='middle'>
            <h1>LOGO</h1>
            <input type='text' placeholder='Ola' />
          </Row>
        </Col>

        <Col span={12}>
          <Row align='middle' justify='end'>
            <AiFillHeart onClick={() => onCloseDrawer('Meus Favoritos')} />
            <Badge count={5}>
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
