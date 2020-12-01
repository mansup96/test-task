import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  font-family: ${({ theme }) => theme.sansCaption};
  font-family: ${({ theme }) => theme.sansCaption};
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 47px;
`;

const ChartHeader = () => {
  return (
    <StyledHeader>
      <h2>Суммарная активность</h2>
    </StyledHeader>
  );
};

export default ChartHeader;
