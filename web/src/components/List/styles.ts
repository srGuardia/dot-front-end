import styled, { css } from 'styled-components';
import colors from '../../global/colors';

type StyledProps = {
  isDivider?: boolean;
  isDrawer?: boolean;
};

export const Container = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  max-height: 100%;

  ${({ isDrawer }) =>
    !isDrawer &&
    css`
      @media (max-width: 768px) {
        padding-bottom: 7rem;
        justify-content: space-around;
      }
    `}
`;

export const Content = styled.div<StyledProps>`
  overflow-x: hidden;

  ${({ isDrawer }) =>
    !isDrawer &&
    css`
      @media (max-width: 768px) {
        max-height: 70%;
      }
    `}
`;

export const List = styled.div<StyledProps>`
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  gap: 1rem;
  margin-top: 1rem;
  padding-bottom: 1rem;

  ${({ isDivider }) =>
    isDivider &&
    css`
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 0.2rem;
        background-color: ${colors.gray};
      }
    `}

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
    flex: 1;
    justify-content: center;

    &:first-child {
      flex: 2;
    }

    &:last-child {
      flex: 0;
    }
  }

  svg {
    cursor: pointer;
  }
`;

export const Footer = styled.div`
  display: flex;
  margin-top: 3rem;
  flex-direction: column;

  gap: 2rem;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    strong {
      font-size: 1.3rem;
    }
  }
`;
