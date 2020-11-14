import React from 'react';
import styled from 'styled-components';
import SortElement from '../../common/SortElement/SortElement';

const ManagerHeaderWrapper = styled.div`
  background-color: ${({ theme }) => theme.main};
  padding: 11px 16px;
  display: flex;
`;

const ManagerHeader = ({ sortParams, onChange, ...props }) => {
  const setSortBy = value => {
    onChange({ ...sortParams, _sort: value });
  };

  const setSortOrder = value => {
    onChange({ ...sortParams, _order: value });
  };

  return (
    <ManagerHeaderWrapper {...props}>
      <SortElement
        label="Дата"
        isActive={sortParams._sort === 'date'}
        _order={sortParams._order}
        setAsActive={() => setSortBy('date')}
        onOrderChange={setSortOrder}
      />
      <SortElement
        label="Дистанция"
        isActive={sortParams._sort === 'distance'}
        _order={sortParams._order}
        setAsActive={() => setSortBy('distance')}
        onOrderChange={setSortOrder}
      />
    </ManagerHeaderWrapper>
  );
};

export default ManagerHeader;
