import { Form } from 'antd';
import styled from 'styled-components';

export const FormWrapper = styled(Form)`
  display: flex;
  gap: 2rem;
  margin: 0 auto;
  margin-top: 2rem;
  width: 70%;
  height: 40%;

  @media (max-width: 768px) {
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 0 2rem;
    overflow: scroll;
  }
  @media (max-width: 425px) {
    margin: 0;
  }
`;
