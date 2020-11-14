import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { scrollBarStyle } from '../../../styles';

const fontStyle = (fontSize, color) => css`
  font-family: ${({ theme }) => theme.sans};
  font-style: normal;
  font-weight: normal;
  font-size: ${fontSize};
  line-height: 12px;
  color: ${color};
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
`;

const StyledTable = styled.ul`
  height: 480px;
  overflow: auto;
  list-style-type: none;
  margin: 0;
  padding: 0;

  & > li {
    cursor: pointer;
    width: 100%;
    padding: 0 16px;
    display: flex;
    align-items: center;
    height: 40px;
    background-color: ${({ theme }) => theme.white};
    transition: background-color ${({ theme }) => theme.defaultTransition};

    &:hover {
      background-color: #f7f7f7;
    }
  }

  & > li:nth-child(even) {
    background-color: ${({ theme }) => theme.gray};

    &:hover {
      background-color: #f7f7f7;
    }
  }

  .dateWrapper {
    width: 50%;
    span {
      display: block;
    }

    .day {
      ${({ theme }) => fontStyle('9px', theme.fontGray)}
    }

    .date {
      ${({ theme }) => fontStyle('12px', theme.main)}
    }
  }

  .distance {
    ${({ theme }) => fontStyle('12px', theme.main)}
  }

  ${scrollBarStyle()}
`;

const Table = ({ walks, getWalks, isFetching, openWindow, ...props }) => {
  useEffect(() => {
    getWalks();
  }, []);

  return (
    <StyledTable {...props}>
      {isFetching
        ? 'Подождите...'
        : walks.map((walk, i) => (
            <li key={walk.id} onClick={() => props.handleBadge(true, walk.id)}>
              <div className="dateWrapper">
                <span className="day">{walk.dateObject.day}</span>
                <span className="date">{walk.dateObject.date}</span>
              </div>
              <span className="distance">{walk.transformedDistance}</span>
            </li>
          ))}
    </StyledTable>
  );
};

export default Table;
