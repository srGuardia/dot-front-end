import { Col, Empty, Row, Tooltip } from 'antd';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Films } from '../../context';

type ListProps = {
  data: Films[];
  visibleCart: boolean;
};

export const ListUserActions = ({ data, visibleCart }: ListProps) => {
  console.log(data);
  return (
    <>
      {data.length === 0 ? (
        <Empty />
      ) : (
        data.map((item, index) => (
          <Row key={index} justify='space-evenly'>
            <Col>
              <img
                src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                alt={item.title}
                loading='lazy'
              />
              <span>{item.title}</span>
            </Col>
            <Col>
              <strong>R${item.price}</strong>
            </Col>
            <Col>
              <Tooltip title='Adicionar ao carrinho'>
                <AiOutlineShoppingCart onClick={() => {}} />
              </Tooltip>
            </Col>
          </Row>
        ))
      )}
    </>
  );
};
