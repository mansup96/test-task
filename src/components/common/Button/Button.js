import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => props.theme.accent};
  font-family: ${props => props.theme.sansCaption};
  color: ${props => props.theme.white};
  font-size: ${props => (props.square ? '10px' : props.sm ? '12px' : '18px')};
  line-height: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.defaultTransition};
  padding: ${props => (props.square ? '0' : props.sm ? '10px' : '21px 92px')};
  width: ${props => (props.fullWidth ? '100%' : props.square ? '16px' : null)};
  height: ${props => (props.square ? '16px' : null)};
  max-width: 100%;
  
  &[disabled] {
  cursor: not-allowed;
  }

  &:hover {
    background-color: ${props => props.theme.accentHover};
  }
`;

const Button = React.forwardRef(({ onClick, children, ...props }, ref) => {
  return (
    <StyledButton ref={ref} {...props} onClick={onClick} type="button">
      {children}
    </StyledButton>
  );
});

export default Button;
