import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => props.theme.accent};
  font-family: ${props => props.theme.sansCaption};
  color: ${props => props.theme.white};
  font-size: 18px;
  line-height: 23px;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.defaultTransition};
  padding: 21px 92px;
  width: ${props => (props.fullWidth ? '100%' : null)};
  max-width: 100%;

  &:hover {
    background-color: ${props => props.theme.accentHover};
  }
`;

const Button = ({ onClick, children, ...props }) => {
  return (
    <StyledButton {...props} onClick={onClick} type="button">
      {children}
    </StyledButton>
  );
};

export default Button;
