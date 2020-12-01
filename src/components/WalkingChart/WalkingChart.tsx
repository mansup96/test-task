import React from 'react';
import styled from 'styled-components';
import ChartHeader from './ChartHeader/ChartHeader';

const StyledChart = styled.div`
  width: 100%;
  max-width: 809px;
  align-self: stretch;
  margin-left: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.35);;
  position: relative;
`;

const WalkingChart = () => {
  return (
    <StyledChart>
      <ChartHeader />
    </StyledChart>
  );
};

export default WalkingChart;
