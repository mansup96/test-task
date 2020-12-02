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

type CustomDatePickerProps = ReactDatePickerProps & {
  label?: string;
  tillToday?: boolean;
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
  //
  //.react-datepicker__day--outside-month {
  //  border-radius: 0.3rem;
  //  background-color: #e0e0e0;
  //}
  //.react-datepicker__day--outside-month.react-datepicker__day--disabled {
  //  border-radius: 0;
  //  background-color: transparent;
  //}
`;

const CustomDatePicker = ({
  label,
  className,
  tillToday,
  ...props
}: CustomDatePickerProps) => {
  const checkTillToday = (date: Date): boolean => date < new Date();
  return (
    <StyledDatepicker className={className}>
      <label>{label}</label>
      <DatePicker
        disabledKeyboardNavigation
        {...props}
        filterDate={tillToday ? checkTillToday : undefined}
        locale={props.locale || 'ru'}
      />
    </StyledDatepicker>
  );
};

export default CustomDatePicker;
