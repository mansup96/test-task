import React, { useEffect } from 'react';
import styled from 'styled-components';
import { fontStyle, scrollBarStyle } from '../../../styles';
import { MappedWalk } from '../../../store/walkingManager/actionTypes';

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

type TableProps= {
  walks: MappedWalk[];
  getWalks: () => void;
  handleBadge: (isOpen: boolean, id?: number | null) => void;
  isFetching: boolean;
  error?: string | null;
};

const Table = ({ walks, getWalks, isFetching, handleBadge }: TableProps) => {
  useEffect(() => {
    getWalks();
  }, [getWalks]);

  return (
    <StyledTable>
      {isFetching
        ? 'Подождите...'
        : walks.map((walk, i) => (
            <li key={walk.id} onClick={() => handleBadge(true, walk.id)}>
              <div className="dateWrapper">
                <span className="day">{walk.localeDay}</span>
                <span className="date">{walk.localeDate}</span>
              </div>
              <span className="distance">{walk.transformedDistance}</span>
            </li>
          ))}
    </StyledTable>
  );
};

export default Table;
