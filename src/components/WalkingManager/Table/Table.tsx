import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { fontStyle, scrollBarStyle } from '../../../styles';
import { MappedWalk } from '../../../store/walkingManager/types';
import Preloader from '../../common/Preloader/Preloader';

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

  .info {
    text-align: center;
    display: block;
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

type TableProps = {
  walks: MappedWalk[];
  incrementPage: () => void;
  handleBadgeAction: (id: number | null) => void;
  setBadgeMode: (isOpen: boolean) => void;
  setPage: (page: number) => void;
  isFetching: boolean;
  error?: string | null;
};

const Table = ({
  walks,
  isFetching,
  handleBadgeAction,
  incrementPage,
  setBadgeMode,
}: TableProps) => {
  const lastListItem = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const options = {
      threshold: 1,
    };

    const callback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          incrementPage();
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    if (lastListItem.current) {
      observer.observe(lastListItem.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [walks, incrementPage]);

  const handleClick = (id: number | null /*todo: remove null*/) => {
    handleBadgeAction(id);
    setBadgeMode(true);
  };

  return (
    <StyledTable id="table">
      {walks.length > 0 &&
        walks.map((walk, i) => (
          <li
            key={walk.id}
            onClick={() => handleClick(walk.id)}
            ref={i === walks.length - 1 ? lastListItem : null}
          >
            <div className="dateWrapper">
              <span className="day">{walk.localeDay}</span>
              <span className="date">{walk.localeDate}</span>
            </div>
            <span className="distance">{walk.transformedDistance[0]}</span>
          </li>
        ))}
      {isFetching && <Preloader />}
      {!isFetching && walks.length === 0 && (
        <span className={'info'}>Список пуст</span>
      )}
    </StyledTable>
  );
};

export default Table;
