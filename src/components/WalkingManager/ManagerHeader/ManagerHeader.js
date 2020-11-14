import React from 'react';
import styled from 'styled-components';
import SortElement from '../../common/SortElement/SortElement';

const ManagerHeaderWrapper = styled.div`
  background-color: ${({ theme }) => theme.main};
  padding: 16px 11px;
  display: flex;
`;

const ManagerHeader = ({ sortParams, onChange, ...props }) => {
  const setSortBy = value => {
    onChange({ ...sortParams, sortBy: value });
  };

  const setSortOrder = value => {
    onChange({ ...sortParams, sortOrder: value });
  };

  return (
    <ManagerHeaderWrapper {...props}>
      <SortElement
        label="Дата"
        isActive={sortParams.sortBy === 'date'}
        sortOrder={sortParams.sortOrder}
        setAsActive={() => setSortBy('date')}
        onOrderChange={setSortOrder}
      />
      <SortElement
        label="Дистанция"
        isActive={sortParams.sortBy === 'distance'}
        sortOrder={sortParams.sortOrder}
        setAsActive={() => setSortBy('distance')}
        onOrderChange={setSortOrder}
      />
    </ManagerHeaderWrapper>
  );
};

export default ManagerHeader;
