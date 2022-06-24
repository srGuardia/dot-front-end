import { Container, InputContainer } from './styles';
import {
  AiFillHeart,
  AiOutlineShoppingCart,
  AiOutlineSearch,
} from 'react-icons/ai';
import { Badge, Col, Row } from 'antd';
import { AppContext } from '../../context';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import colors from '../../global/colors';
import { getTotalItems } from '../../utils/functions';

export const Header = () => {
  const { onCloseDrawer, handleSearchFilms, handleLoading } =
    useContext(AppContext);

  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  const handleNavigate = () => {
    handleLoading();
    navigate('/');
  };

  return (
    <Container>
      <Row>
        <Col span={12}>
          <Row justify='space-between' align='middle'>
            <h1 onClick={handleNavigate}>LOGO</h1>
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
            <Badge
              count={Number(getTotalItems())}
              color={colors.yellow}
              style={{ color: colors.black }}
            >
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
