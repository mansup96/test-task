import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import {fontStyle, scrollBarStyle} from '../../../styles';

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
      ${({ theme }) => fontStyle('9px', theme.fontGray, true)}
    }

    .date {
      ${({ theme }) => fontStyle('12px', theme.main, true)}
    }
  }

  .distance {
    ${({ theme }) => fontStyle('12px', theme.main, true)}
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
