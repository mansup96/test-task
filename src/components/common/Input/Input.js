import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fontStyle } from '../../../styles';

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

const Input = props => {
  const [value, setValue] = useState(props.value);
  const changeHandler = e => {
    props.onChange(e.target.value);
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <StyledInput className='input'>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type={props.type || 'text'}
        value={value}
        onChange={changeHandler}
      />
    </StyledInput>
  );
};

export default Input;
