import React from 'react';
import { MappedWalk } from '../../../store/walkingManager/types';
import styled, { css } from 'styled-components';

type ChartFooterProps = {
  extremums: string[];
  sum: string;
};

const footerSpanStyle = css`
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
    align-items: center;
  }

  .extremum {
    ${footerSpanStyle};
    margin-right: 20px;
  }

  .sum {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: auto;
    width: 210px;

    span {
      display: block;
      text-align: right;
      ${footerSpanStyle};
    }
  }
`;

export const ChartFooter = ({ extremums, sum }: ChartFooterProps) => {
  return (
    <StyledChartFooter>
      <div className="extremumWrapper">
        <span className="extremum">Минимум: {extremums[0]}</span>
        <span className="extremum">Максимум: {extremums[1]}</span>
      </div>
      <div className="sum">
        <span>За весь период:</span>
        <span>{sum}</span>
      </div>
    </StyledChartFooter>
  );
};

export default ChartFooter;
