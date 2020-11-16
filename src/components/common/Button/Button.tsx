import React, { forwardRef, ReactNode } from 'react';
import styled from 'styled-components';

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
  square?: boolean;
  lg?: boolean;
  sm?: boolean;
  fullWidth?: boolean;
};

type StyledButtonProps = ButtonProps & {
  ref: React.ReactNode;
};

const StyledButton = styled.button<StyledButtonProps>`
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

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, children, ...props }, ref) => {
    return (
      <StyledButton ref={ref} {...props} onClick={onClick} type="button">
        {children}
      </StyledButton>
    );
  }
);
