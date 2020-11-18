import React from 'react';
import styled from 'styled-components';
import SortElement from '../../common/SortElement/SortElement';
import {
  ActiveParamType,
  SortOrderType,
  SortParamsType,
  StateSortParams,
} from '../../../store/walkingManager/actionTypes';

const ManagerHeaderWrapper = styled.div`
  background-color: ${({ theme }) => theme.main};
  padding: 11px 16px;
  display: flex;
`;

type ManagerHeaderProps = {
  activeParam: ActiveParamType;
  sortParams: StateSortParams;
  onChangeWalksOrder: ({ param, order }: SortParamsType) => void;
  onChangeWalksSort: (param: string) => void;
};

const ManagerHeader = ({
  activeParam,
  sortParams,
  onChangeWalksOrder,
  onChangeWalksSort,
}: ManagerHeaderProps) => {
  const setSortParam = (param: string) => {
    onChangeWalksSort(param);
  };

  return (
    <ManagerHeaderWrapper>
      <SortElement
        label="Дата"
        order={sortParams.date.order}
        isActive={activeParam === 'date'}
        setAsActive={() => setSortParam('date')}
        onChangeWalksOrder={(order: SortOrderType) =>
          onChangeWalksOrder({ param: 'date', order })
        }
      />
      <SortElement
        label="Дистанция"
        order={sortParams.distance.order}
        isActive={activeParam === 'distance'}
        setAsActive={() => setSortParam('distance')}
        onChangeWalksOrder={(order: SortOrderType) =>
          onChangeWalksOrder({ param: 'distance', order })
        }
      />
    </ManagerHeaderWrapper>
  );
};

export default ManagerHeader;
