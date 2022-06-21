import { Drawer } from 'antd';
import styled from 'styled-components';

export const Container = styled(Drawer)`
  .ant-drawer-content-wrapper {
    width: 30rem !important;

    @media (max-width: 425px) {
      width: 100% !important;
    }
  }
`;
