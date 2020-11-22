import React, { useEffect, useState } from 'react';
import DatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.module.css';
import styled from 'styled-components';
import { labelStyle } from '../../../styles';
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru);

type CustomDatePickerProps = {
  date: string | Date | number;
  label: string;
  onChange: (date: any) => void;
  className?: string;
};

const StyledDatepicker = styled.div`
  label {
    ${labelStyle()}
  }
  
  
`;

const CustomDatePicker = ({
  date,
  label,
  onChange,
  className,
  ...props
}: CustomDatePickerProps & ReactDatePickerProps) => {
  const [curDate, setCurDate] = useState(
    new Date(props.selected || Date.now())
  );
  useEffect(() => {
    setCurDate(new Date(date || Date.now()));
  }, [date]);

  return (
    <StyledDatepicker className={className}>
      <label>{label}</label>
      <DatePicker
        selected={curDate}
        onChange={onChange}
        {...props}
        locale="ru"
      />
    </StyledDatepicker>
  );
};

export default CustomDatePicker;
