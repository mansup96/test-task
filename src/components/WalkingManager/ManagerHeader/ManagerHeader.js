import React from 'react';
import styled from 'styled-components';
import SortElement from '../../common/SortElement/SortElement';

const ManagerHeaderWrapper = styled.div`
  background-color: ${({ theme }) => theme.main};
  padding: 11px 16px;
  display: flex;
`;

const ManagerHeader = ({
  sortParams,
  onChangeWalksOrder,
  onChangeWalksSort,
}) => {
  const setSortParam = param => {
    onChangeWalksSort(param);
  };

  return (
    <ManagerHeaderWrapper>
      <SortElement
        label="Дата"
        order={sortParams.date.order}
        isActive={sortParams.activeParam === 'date'}
        setAsActive={() => setSortParam('date')}
        onChangeWalksOrder={order =>
          onChangeWalksOrder({ param: 'date', order })
        }
      />
      <SortElement
        label="Дистанция"
        order={sortParams.distance.order}
        isActive={sortParams.activeParam === 'distance'}
        setAsActive={() => setSortParam('distance')}
        onChangeWalksOrder={order =>
          onChangeWalksOrder({ param: 'distance', order })
        }
      />
    </ManagerHeaderWrapper>
  );
};

export default ManagerHeader;
