import styled from 'styled-components';

export const Container = styled.main`
  overflow: scroll;
  height: 100vh;
  padding-top: 2rem;
  padding-bottom: 5rem;

  .ant-card-meta-description {
    height: 11rem;
    max-height: 11rem;
    text-overflow: ellipsis;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }
`;
