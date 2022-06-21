import { DrawerProps } from 'antd';
import { ReactNode } from 'react';
import { Container } from './styles';

type DrawerComponentProps = {
  children: ReactNode;
} & DrawerProps;

export const Drawer = ({ children, ...rest }: DrawerComponentProps) => (
  <Container {...rest}>{children}</Container>
);
