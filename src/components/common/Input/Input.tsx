import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { labelStyle } from '../../../styles';

type InputProps = InputHTMLAttributes<any> & {
  className?: string;
  label: string;
  onChangeValue: (value: string) => void;
  type?: string;
  value: string;
  error?: string;
};

const StyledInput = styled.div`
  max-width: 150px;
  position: relative;
  label {
    ${labelStyle()}
  }
  input {
    width: 100%;
    margin-bottom: 12px;
  }
  span {
    position: absolute;
    bottom: 0;
    ${labelStyle()};
    color: ${({ theme }) => theme.accent};
    font-size: 10px;
  }
`;

const Input = ({
  label,
  onChangeValue,
  type,
  value,
  className,
  error,
  ...props
}: InputProps) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChangeValue(e.target.value);
  };

  return (
    <StyledInput className={className}>
      <label>{label}</label>
      <input
        type={type || 'text'}
        value={value}
        onChange={changeHandler}
        {...props}
      />
      {error && <span>{error}</span>}
    </StyledInput>
  );
};

export default Input;
