import { css } from 'styled-components';

import ptSansLatinCyrillicRegularWoff2 from './pt-sans-v12-regular.woff2';
import ptSansLatinCyrillicRegularWoff from './pt-sans-v12-regular.woff';
import ptSansLatinCyrillic700Woff2 from './pt-sans-v12-700.woff2';
import ptSansLatinCyrillic700Woff from './pt-sans-v12-700.woff';

import ptSansCaption700Woff from "./pt-sans-caption-v13-700.woff"
import ptSansCaption700Woff2 from "./pt-sans-caption-v13-700.woff2"
import ptSansCaptionRegularWoff from "./pt-sans-caption-v13-700.woff"
import ptSansCaptionRegularWoff2 from "./pt-sans-caption-v13-700.woff2"

export const fonts = css`
  @font-face {
    font-family: 'PT Sans';
    font-style: normal;
    font-weight: normal;
    src: local(''), url(${ptSansLatinCyrillicRegularWoff2}) format('woff2'),
      url(${ptSansLatinCyrillicRegularWoff}) format('woff');
  }

  @font-face {
    font-family: 'PT Sans';
    font-style: normal;
    font-weight: bold;
    src: url(${ptSansLatinCyrillic700Woff2}) format('woff2'),
      url(${ptSansLatinCyrillic700Woff}) format('woff');
  }
  
/* pt-sans-caption-700 - latin */
@font-face {
  font-family: 'PT Sans Caption';
  font-style: normal;
  font-weight: normal;
  src: local(''),
       url(${ptSansCaptionRegularWoff2}) format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url(${ptSansCaptionRegularWoff}) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* pt-sans-caption-regular - latin */
@font-face {
  font-family: 'PT Sans Caption';
  font-style: normal;
  font-weight: bold;
  src: local(''),
       url(${ptSansCaption700Woff2}) format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url(${ptSansCaption700Woff}) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
`;
