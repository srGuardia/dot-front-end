import { Col, Form, Input, InputProps, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useContext,
  useState,
} from 'react';
import { ViaCEP } from '../../@types/cep';
import { Button } from '../../components/Button';
import { ListUserActions } from '../../components/List';
import { AppContext } from '../../context';
import api from '../../services/api';
import { Container } from './styles';

const Checkout = () => {
  const { cart, removeLocalStorage } = useContext(AppContext);

  const [form] = Form.useForm();

  const handleChangeCEP = async (value: string) => {
    try {
      const result = await api.getCEP(Number(value));

      form.setFieldsValue({
        address: result.logradouro,
        city: result.localidade,
        uf: result.uf,
      });
    } catch (error) {}
  };

  const onFinish = () => {
    alert('click');
  };

  return (
    <Container>
      <div>
        <h1>Finalizar Compra</h1>

        <Form form={form}>
          <Row>
            <Col span={24}>
              <Form.Item
                name='name'
                rules={[{ required: true, message: 'Campo obrigatório!' }]}
              >
                <Input placeholder='Nome Completo' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={12}>
              <Form.Item name='cpf'>
                <Input placeholder='CPF' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='phone'>
                <Input placeholder='Celular' />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item name='email'>
                <Input placeholder='E-mail' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={8}>
              <Form.Item name='cep'>
                <Input
                  placeholder='CEP'
                  onBlur={(e) => handleChangeCEP(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item name='address'>
                <Input placeholder='Endereço' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={20}>
              <Form.Item name='city'>
                <Input disabled placeholder='Cidade' />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name='uf'>
                <Input disabled placeholder='UF' />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>

      <div>
        <ListUserActions data={cart} visibleCart={false} />

        <Button block htmlType='submit' onClick={onFinish}>
          Finalizar
        </Button>
      </div>
    </Container>
  );
};

export default Checkout;
