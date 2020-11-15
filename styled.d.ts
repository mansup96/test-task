import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    main: string;
    accent: string;
    accentHover: string;
    gray: string;
    white: string;
    fontGray: string;
    sans: string;
    sansCaption: string;
    defaultTransition: string;
  }
}
