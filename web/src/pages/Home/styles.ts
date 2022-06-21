import styled from 'styled-components';

export const Container = styled.main`
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100vh;
  padding-top: 2rem;
  padding-bottom: 7rem;

  .ant-card-meta-description {
    height: 11rem;
    max-height: 11rem;
    text-overflow: ellipsis;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }

  @media (max-width: 425px) {
    padding-bottom: 9rem;
  }
`;
