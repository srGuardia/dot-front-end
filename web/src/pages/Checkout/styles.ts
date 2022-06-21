import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem 5rem;
  display: flex;
  gap: 2rem;

  div {
    flex: 1;

    &:first-child {
      flex: 2;
    }
  }
`;
