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

export const fontStyle = (
  fontSize: string,
  color: string,
  underline: boolean
) => css`
  font-family: ${({ theme }) => theme.sans};
  font-style: normal;
  font-weight: normal;
  font-size: ${fontSize};
  line-height: 12px;
  color: ${color};

  ${underline &&
  css`
    position: relative;
    width: fit-content;

    &:after {
      content: '';
      bottom: 1px;
      left: 0;
      background-color: ${color};
      position: absolute;
      width: 100%;
      height: 1px;
    }
  `}
`;