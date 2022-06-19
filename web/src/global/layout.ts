import { createGlobalStyle } from 'styled-components';
import colors from './colors';

export const GlobalLayout = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}

html, body, #root {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background-color: ${colors.white}
}
`;
