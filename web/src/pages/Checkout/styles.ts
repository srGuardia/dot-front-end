import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 2rem;
  margin: 0 auto;
  margin-top: 2rem;
  width: 70%;
  height: 40%;

  div {
    flex: 1;

    &:first-child {
      flex: 2;
    }
  }
`;
