import { Button, Card, Col, Row } from 'antd';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineSearch,
} from 'react-icons/ai';
import { Container } from './styles';

const { Meta } = Card;

const _DATA = [1, 2, 3, 4, 5, 6];

const Home = () => {
  return (
    <Container>
      <Row gutter={[10, 10]}>
        {_DATA.map((item, index) => (
          <Col span={8} xs={24} sm={12} md={8} lg={8}>
            <Row justify='space-evenly'>
              <Card
                style={{ width: 240 }}
                loading={false}
                cover={
                  <img
                    src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                    alt='Image'
                  />
                }
                actions={[<AiOutlineHeart />, <AiOutlineShoppingCart />]}
              >
                <Meta title='Filme 1' description='Description 1' />
              </Card>
            </Row>
          </Col>
        ))}
      </Row>

      <Row justify='center' style={{ paddingTop: 10 }}>
        <Button type='primary'>Carregar mais</Button>
      </Row>
    </Container>
  );
};

export default Home;
