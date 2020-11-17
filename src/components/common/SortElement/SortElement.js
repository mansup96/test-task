import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import icon from '../../../static/icons/sortBtn--active--rise.svg';

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
    width: 14px;
    height: 14px;
    cursor: pointer;
    margin-left: 7px;
    opacity: ${props => (props.isActive ? 1 : 0.3)};
    transform: ${props => (props.order === 'desc' ? 'rotateX(180deg)' : null)};
    transition: transform ${({ theme }) => theme.defaultTransition};
  }
`;

const SortElement = ({
  label,
  onChangeWalksOrder,
  setAsActive,
  isActive,
  order,
}) => {
  const changeSortOrder = () => {
    if (isActive) {
      onChangeWalksOrder(order === 'asc' ? 'desc' : 'asc');
    }
  };

  const changeActivity = () => {
    if (isActive === false) {
      setAsActive();
    }
  };

  return (
    <StyledElement {...{ order, isActive }}>
      <span onClick={changeActivity}>{label}</span>
      <img onClick={changeSortOrder} src={icon} alt="arrow" />
    </StyledElement>
  );
};

export default SortElement;
