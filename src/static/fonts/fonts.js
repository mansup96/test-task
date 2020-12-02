import { css } from 'styled-components';

import ptSansLatinCyrillicRegularWoff2 from './pt-sans-v12-regular.woff2';
import ptSansLatinCyrillicRegularWoff from './pt-sans-v12-regular.woff';
import ptSansLatinCyrillic700Woff2 from './pt-sans-v12-700.woff2';
import ptSansLatinCyrillic700Woff from './pt-sans-v12-700.woff';

import ptSansCaption700Woff from './pt-sans-caption-v13-700.woff';
import ptSansCaption700Woff2 from './pt-sans-caption-v13-700.woff2';
import ptSansCaptionRegularWoff from './pt-sans-caption-v13-regular.woff';
import ptSansCaptionRegularWoff2 from './pt-sans-caption-v13-regular.woff2';

export const fonts = css`
  @font-face {
    font-family: 'PT Sans';
    font-style: normal;
    font-weight: normal;
    src: url(${ptSansLatinCyrillicRegularWoff2}) format('woff2'),
      url(${ptSansLatinCyrillicRegularWoff}) format('woff');
  }

  @font-face {
    font-family: 'PT Sans';
    font-style: normal;
    font-weight: 700;
    src: url(${ptSansLatinCyrillic700Woff2}) format('woff2'),
      url(${ptSansLatinCyrillic700Woff}) format('woff');
  }

  /* pt-sans-caption-700 - latin */
  @font-face {
    font-family: 'PT Sans Caption';
    font-style: normal;
    font-weight: normal;
    src: url(${ptSansCaptionRegularWoff2}) format('woff2'),
      url(${ptSansCaptionRegularWoff}) format('woff');
  }
  /* pt-sans-caption-regular - latin */
  @font-face {
    font-family: 'PT Sans Caption';
    font-style: normal;
    font-weight: 700;
    src: url(${ptSansCaption700Woff2}) format('woff2'),
      url(${ptSansCaption700Woff}) format('woff');
  }
`;
