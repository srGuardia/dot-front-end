import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  gap: 1rem;
  margin-top: 1rem;

  &:first-child {
    margin-top: 0;
  }

  img {
    width: 3rem;
  }

  div {
    display: flex;
    gap: 2rem;
    align-items: center;

    &:first-child {
      flex: 1;
    }

    &:nth-child(2) {
      flex: 1;
      justify-content: center;
    }
  }

  svg {
    cursor: pointer;
  }
`;
