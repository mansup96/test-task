import React, { useState } from 'react';
import styled from 'styled-components';
import CustomDatePicker from '../../common/CustomDatePicker/CustomDatePicker';
import { ChartRangeType } from '../../../store/walkingManager/types';

type ChartHeaderProps = {
  range: ChartRangeType;
  onChangeRange: (range: [Date | null, Date | null]) => void;
};

const StyledHeader = styled.div`
  font-family: ${({ theme }) => theme.sansCaption};
  width: 100%;
  display: flex;

  .pickersWrapper {
    display: flex;
    .rangePicker {
      width: 100px;
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
  const [storeStartDate, storeEndDate] = range;

  const [startDate, setStartDate] = useState(storeStartDate);
  const [endDate, setEndDate] = useState(storeEndDate);

  const onChange = (date: Date, type: 'start' | 'end') => {
    if (type === 'start') {
      setStartDate(date);
      onChangeRange([date, endDate]);
    }
    if (type === 'end') {
      setEndDate(date);
      onChangeRange([startDate, date]);
    }
  };

  return (
    <StyledHeader>
      <h2>Суммарная активность</h2>
      <div className={'pickersWrapper'}>
        <CustomDatePicker
          className={'rangePicker'}
          label={'Начало периода'}
          labelColor={'main'}
          selected={startDate}
          onChange={(date: Date) => onChange(date, 'start')}
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
          onChange={(date: Date) => onChange(date, 'end')}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat={'dd.MM.yyyy'}
          tillToday
        />
      </div>
    </StyledHeader>
  );
};

export default ChartHeader;
