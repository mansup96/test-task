import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fontStyle } from '../../../styles';

type InputProps = {
  id: string;
  label: string;
  onChange: (value: string) => void;
  type: string;
  value: string;
};

const StyledInput = styled.div`
  max-width: 150px;
  label {
    display: block;
    ${({ theme }) => fontStyle('12px', theme.white)}
  }
  input {
    width: 100%;
  }
`;

const Input = ({ id, label, onChange, type, value }: InputProps) => {
  const [currentValue, setCurrentValue] = useState(value);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <StyledInput className="input">
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
