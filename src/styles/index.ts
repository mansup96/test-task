import { createGlobalStyle, css } from 'styled-components';
import { normalize } from 'styled-normalize';

export const theme = {
  main: '#1C2025',
  accent: '#EC174F',
  accentHover: '#d4295b',
  gray: '#EFEFF0',
  white: '#FFFFFF',
  fontGray: '#A4A6A8',
  sans: 'PT Sans, sans-serif',
  sansCaption: 'PT Sans Caption, sans-serif',
  defaultTransition: '0.2s ease',
};

export const GlobalStyle = createGlobalStyle`
${normalize}

*, *:before, *:after {
  box-sizing: border-box;
  outline: none;
  font-family: ${() => theme.sans} ;
},
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

export const fontStyle = (fontSize: string, color: string) => css`
  font-family: ${({ theme }) => theme.sans};
  font-style: normal;
  font-weight: normal;
  font-size: ${fontSize};
  line-height: 12px;
  color: ${color};
`;

export const labelStyle = (color?: string) => css`
  display: block;
  ${({ theme }) => fontStyle('12px', theme[color || 'white'])}
`;
