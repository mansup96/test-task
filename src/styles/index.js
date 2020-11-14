import { createGlobalStyle, css } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
${normalize}
*, *:before, *:after {
  box-sizing: border-box;
}
`;

export const scrollBarStyle = () => css`
  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.main};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.accent};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.accentHover};
  }
`;
