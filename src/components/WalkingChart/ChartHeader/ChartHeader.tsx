import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import CustomDatePicker from '../../common/CustomDatePicker/CustomDatePicker';
import { ChartRangeType } from '../../../store/walkingManager/actionTypes';

type ChartHeaderProps = {
  range: ChartRangeType;
  onChangeRange: (range: ChartRangeType) => void;
};

const StyledHeader = styled.div`
  font-family: ${({ theme }) => theme.sansCaption};
  width: 100%;
  display: flex;

  .pickersWrapper {
    display: flex;
    .rangePicker {
      width: 150px;
    }
    .rangePicker:last-child {
      margin-left: 16px;
    }
  }

  h2 {
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 47px;
    margin: 0 auto 0 0;
  }
`;

const ChartHeader = ({ range, onChangeRange }: ChartHeaderProps) => {
  const [storeStartDate, storeEndDate] = useMemo(() => range, [range]);

  const [startDate, setStartDate] = useState(storeStartDate);
  const [endDate, setEndDate] = useState(storeEndDate);

  useEffect(() => {
    if (startDate && endDate) {
      onChangeRange([startDate, endDate]);
    }
  }, [startDate, endDate, onChangeRange]);

  return (
    <StyledHeader>
      <h2>Суммарная активность</h2>
      <div className={'pickersWrapper'}>
        <CustomDatePicker
          className={'rangePicker'}
          label={'Начало периода'}
          labelColor={'main'}
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat={'dd.MM.yyyy'}
        />
        <CustomDatePicker
          className={'rangePicker'}
          labelColor={'main'}
          label={'Конец периода'}
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat={'dd.MM.yyyy'}
        />
      </div>
    </StyledHeader>
  );
};

export default ChartHeader;
