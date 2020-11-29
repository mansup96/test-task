import React from 'react';
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
  className?: string;
};

const StyledDatepicker = styled.div`
  label {
    ${labelStyle()}
  }
  .react-datepicker__day--selected {
    background-color: ${({ theme }) => theme.accent};
  }
  .react-datepicker-wrapper,
  .react-datepicker-wrapper input {
    width: 100%;
  }
`;

const CustomDatePicker = ({
  date,
  label,
  className,
  ...props
}: CustomDatePickerProps & ReactDatePickerProps) => {
  return (
    <StyledDatepicker className={className}>
      <label>{label}</label>
      <DatePicker
        selected={new Date(date)}
        {...props}
        locale={props.locale || 'ru'}
      />
    </StyledDatepicker>
  );
};

export default CustomDatePicker;
