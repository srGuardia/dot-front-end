import { Button, ButtonProps } from 'antd';
import styled, { css } from 'styled-components';
import colors from '../../global/colors';

export const Container = styled(Button)<ButtonProps>`
  ${({ type }) =>
    type !== 'link' &&
    type !== 'text' &&
    css`
      background-color: ${colors.secondary};
      color: ${colors.white};
    `}
`;
