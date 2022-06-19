import styled from 'styled-components';
import colors from '../../global/colors';

export const Container = styled.header`
  background-color: ${colors.primary};
  padding: 1rem 2rem;

  h1,
  svg {
    color: ${colors.white};
    font-size: 2rem;
    margin: 0;
  }
`;
