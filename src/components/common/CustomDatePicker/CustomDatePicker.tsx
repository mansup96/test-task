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

type CustomDatePickerProps = ReactDatePickerProps &
  StyledDatePickerProps & {
    label?: string;
    tillToday?: boolean;
  };

type StyledDatePickerProps = {
  className?: string;
  labelColor?: string;
};

const StyledDatepicker = styled.div<StyledDatePickerProps>`
  label {
    ${(props) => labelStyle(props.labelColor)}
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
  label,
  tillToday,
  className,
  labelColor,
  ...props
}: CustomDatePickerProps) => {
  const checkTillToday = (date: Date): boolean => date < new Date();

  const styledProps = { className, labelColor };
  return (
    <StyledDatepicker {...styledProps}>
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
