import { ButtonProps } from 'antd';
import { ReactNode } from 'react';
import { Container } from './styles';

type ComponentProps = ButtonProps & {
  children: ReactNode;
};

export const Button = ({ children, ...rest }: ComponentProps) => (
  <Container {...rest}>{children}</Container>
);
