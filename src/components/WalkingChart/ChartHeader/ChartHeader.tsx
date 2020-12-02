import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CustomDatePicker from '../../common/CustomDatePicker/CustomDatePicker';
import { ChartRangeType } from '../../../store/walkingManager/actionTypes';
import { subDays } from 'date-fns';
import { checkServerIdentity } from 'tls';

type ChartHeaderProps = {
  range: ChartRangeType;
  onChangeRange: (range: ChartRangeType) => void;
};

const StyledHeader = styled.div`
  font-family: ${({ theme }) => theme.sansCaption};
  width: 100%;
  display: flex;

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

  const [startDate, setStartDate] = useState(storeStartDate || null);
  const [endDate, setEndDate] = useState(storeEndDate || null);
  const onChange = (dates: ChartRangeType) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    if (startDate && endDate) {
      onChangeRange([startDate, endDate]);
    }
  }, [startDate, endDate, onChangeRange]);

  return (
    <StyledHeader>
      <h2>Суммарная активность</h2>
      <div>
        <CustomDatePicker
          label="Выберите период"
          dateFormat="dd.MM.yyyy"
          inline
          startDate={startDate}
          endDate={endDate}
          selectsRange
          maxDate={new Date()}
          onChange={onChange}
        />
      </div>
    </StyledHeader>
  );
};

export default ChartHeader;
