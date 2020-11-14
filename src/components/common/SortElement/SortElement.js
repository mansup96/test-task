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
    cursor: pointer;
    margin-left: 7px;
    opacity: ${props => (props.isActive ? 1 : 0.3)};
    transform: ${props =>
      props.localSortOrder === 'desc' ? 'rotateX(180deg)' : null};
    transition: transform ${({ theme }) => theme.defaultTransition};
  }
`;

const SortElement = ({ label, onOrderChange, setAsActive, ...props }) => {
  const [localSortOrder, setLocalSortOrder] = useState(props.sortOrder);

  useEffect(() => {
    if (props.isActive && localSortOrder !== props.sortOrder) {
      onOrderChange(localSortOrder);
    }
  });

  const changeSortOrder = () => {
    if (props.isActive) {
      onOrderChange(props.sortOrder === 'asc' ? 'desc' : 'asc');
      setLocalSortOrder(props.sortOrder === 'asc' ? 'desc' : 'asc');
    }
  };

  return (
    <StyledElement {...props} localSortOrder={localSortOrder}>
      <span onClick={setAsActive}>{label}</span>
      <img onClick={changeSortOrder} src={icon} alt="arrow" />
    </StyledElement>
  );
};

export default SortElement;
