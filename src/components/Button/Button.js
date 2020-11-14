import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.accent};
  font-family: ${(props) => props.theme.sansCaption};
  color: ${(props) => props.theme.white};
  font-size: 18px;
  line-height: 23px;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  padding: 21px 92px;
  max-width: 100%;

  &:hover {
    background-color: ${(props) => props.theme.accentHover};
  }
`;

const Button = ({ onClick, children }) => {
  return (
    <StyledButton onClick={onClick} type="button">
      {children}
    </StyledButton>
  );
};

export default Button;
