import styled from 'styled-components';
import colors from '../../global/colors';

export const Container = styled.header`
  background-color: ${colors.primary};
  padding: 1rem 2rem;

  h1,
  svg {
    cursor: pointer;
    color: ${colors.white};
    font-size: 2rem;
    margin: 0;
  }

  @media (max-width: 425px) {
    h1 {
      display: none;
    }
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;

  input {
    position: relative;
    border: none;
    border-radius: 0.3rem;
    padding: 0.5rem 1rem;

    &::placeholder {
      color: ${colors.gray};
    }
  }

  svg {
    position: absolute;
    color: ${colors.gray};
    right: 0.1rem;
    font-size: 1.3rem;
    cursor: pointer;
  }
`;
