import React from 'react';
import styled from 'styled-components';
import preloader from '../../../static/icons/preloader.svg';

const StyledPreloader = styled.div`
  img {
    display: block;
    margin: 0 auto;
  }
`;

const Preloader = () => {
  return (
    <StyledPreloader>
      <img src={preloader} alt="preloader" />
    </StyledPreloader>
  );
};

export default Preloader;
