import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { labelStyle } from '../../../styles';

type InputProps = {
  className?: string;
  id: string;
  label: string;
  onChange: (value: string) => void;
  type?: string;
  value: string | number;
};

const StyledInput = styled.div`
  max-width: 150px;
  label {
    ${labelStyle}
  }
  input {
    width: 100%;
  }
`;

const Input = ({ id, label, onChange, type, value, className }: InputProps) => {
  const [currentValue, setCurrentValue] = useState(value);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (type === 'number') {
      onChange(e.target.value);
    } else {
      onChange(e.target.value);
    }
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <StyledInput>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type || 'text'}
        value={currentValue}
        onChange={changeHandler}
      />
    </StyledInput>
  );
};

export default Input;
