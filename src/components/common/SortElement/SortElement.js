import React from "react";
import styled from "styled-components";
import icon from "../../../static/icons/sortBtn--active--rise.svg";

const StyledElement = styled.div`
  display: flex;
  align-items: center;
  width: 50%;

  span {
    cursor: pointer;
    color: ${({ theme }) => theme.white};
    font-family: ${({ theme }) => theme.sansCaption};
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    transition: color ${({ theme }) => theme.defaultTransition};

    &:hover {
      color: ${({ theme }) => theme.gray};
    }
  }

  img {
    cursor: pointer;
    margin-left: 7px;
    opacity: ${props => (props.active ? 0.3 : 1)};
    transform: ${props => (props.order === "desc" ? "rotateX(180deg)" : null)};
    transition: transform ${({ theme }) => theme.defaultTransition};
  }
`;

const SortElement = props => {
  return (
    <StyledElement {...props}>
      <span onClick={props.onActiveChange}>{props.label}</span>
      <img onClick={props.onOrderChange} src={icon} alt="arrow" />
    </StyledElement>
  );
};

export default SortElement;
