import React from 'react';
import styled from 'styled-components';
import icon from '../../../static/icons/sortBtn--active--rise.svg';
import { SortOrderType } from '../../../store/walkingManager/actionTypes';

type StyledElementProps = {
  isActive: boolean;
  order: SortOrderType;
};

type SortElementProps = StyledElementProps & {
  label: string;
  onChangeWalksOrder: (order: SortOrderType) => void;
  setAsActive: () => void;
};

const StyledElement = styled.div<StyledElementProps>`
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
}: SortElementProps) => {
  const changeSortOrder = () => {
    if (isActive) {
      onChangeWalksOrder(order === 'asc' ? 'desc' : 'asc');
    }
  };

  const changeActivity = () => {
    if (!isActive) {
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
