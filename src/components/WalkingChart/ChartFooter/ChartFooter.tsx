import React from 'react';
import { MappedWalk } from '../../../store/walkingManager/actionTypes';
import styled, { css } from 'styled-components';

type ChartFooterProps = {
  walks: MappedWalk[];
};

const footerSpanStyle = css`
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.sansCaption};
  color: ${({ theme }) => theme.white};
  font-weight: bold;
  font-size: 18px;
`;

const StyledChartFooter = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.main};
  padding: 0 20px;
  min-height: 60px;
  width: 100%;
  
  .extremumWrapper {
    display: flex;
  }

  .extremum {
    ${footerSpanStyle};
    margin-right: 20px;
  }

  .sum {
    ${footerSpanStyle};
    margin-left: auto;
    width: 210px;
  }
`;

export const ChartFooter = ({ walks }: ChartFooterProps) => {
  return (
    <StyledChartFooter>
      <div className="extremumWrapper">
        <span className="extremum">Минимум: 200м</span>
        <span className="extremum">Максимум: 500м</span>
      </div>
      <span className="sum">За весь период: 2000м</span>
    </StyledChartFooter>
  );
};
