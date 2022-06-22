import { Col, Form, Input, message, Modal, Row } from 'antd';
import { useContext, useState } from 'react';
import { ListUserActions } from '../../components/List';
import { AppContext } from '../../context';
import api from '../../services/api';
import { FormWrapper } from './styles';
import { MaskedInput } from 'antd-mask-input';
import { useNavigate } from 'react-router-dom';
import { LocalStorageProps } from '../../utils/functions';

const Checkout = () => {
  const { cart, removeAllLocalStorage } = useContext(AppContext);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const handleChangeCEP = async (value: string) => {
    try {
      const result = await api.getCEP(Number(value.replace('-', '')));

      form.setFieldsValue({
        address: result.logradouro,
        city: result.localidade,
        uf: result.uf,
      });
    } catch (error) {
      message.error('Erro ao autocompletar o CEP');
      setDisabled(false);
    }
  };

  const onFinish = () => {
    openCloseModal();
    removeAllLocalStorage(LocalStorageProps.cart);
  };

  const openCloseModal = () => {
    const name = form.getFieldValue('name');
    const modal = Modal.success({
      title: `Obrigado, ${name}`,
      content: 'Sua compra foi finalizada com sucesso!',
      okText: 'Ir para loja',
      onOk: () => navigate('/'),
      cancelText: 'Fechar',
      onCancel: () => modal.destroy(),
      okCancel: true,
    });

    return modal;
  };

  return (
    <>
      <FormWrapper form={form} onFinish={onFinish}>
        <div>
          <h1>Finalizar Compra</h1>

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
            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                name='cpf'
                rules={[{ required: true, message: 'Campo obrigatório!' }]}
              >
                <MaskedInput placeholder='CPF' mask={'000.000.000-00'} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                name='phone'
                rules={[{ required: true, message: 'Campo obrigatório!' }]}
              >
                <MaskedInput placeholder='Celular' mask={'(00) 00000-0000'} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                name='email'
                rules={[{ required: true, message: 'Campo obrigatório!' }]}
              >
                <Input placeholder='E-mail' type='email' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col xs={24} sm={24} md={8} lg={8}>
              <Form.Item
                name='cep'
                rules={[{ required: true, message: 'Campo obrigatório!' }]}
              >
                <MaskedInput
                  placeholder='CEP'
                  mask={'00000-000'}
                  onBlur={(e) => handleChangeCEP(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={16} lg={16}>
              <Form.Item
                name='address'
                rules={[{ required: true, message: 'Campo obrigatório!' }]}
              >
                <Input placeholder='Endereço' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col xs={24} sm={24} md={20} lg={20}>
              <Form.Item name='city'>
                <Input disabled={disabled} placeholder='Cidade' />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={4} lg={4}>
              <Form.Item name='uf'>
                <Input disabled={disabled} placeholder='UF' />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <ListUserActions data={cart} visibleCart={false} footer />
      </FormWrapper>
    </>
  );
};

export default Checkout;
