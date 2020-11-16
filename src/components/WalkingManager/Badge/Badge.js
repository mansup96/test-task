import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Button } from '../../common/Button/Button';
import Input from '../../common/Input/Input';

const openBadgeStyles = () => css`
  transform: ${props => `translateY(-${props.btnHeight}px)}`};
  opacity: 1;
  z-index: 100;
`;

const StyledBadge = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.main};
  padding: 20px 15px;
  transition: transform ${({ theme }) => theme.defaultTransition};
  opacity: 0;
  z-index: -100;
  bottom: 0;

  ${props => props.isOpen && openBadgeStyles()}

  .closeBtn {
    display: block;
    margin-left: auto;
  }

  .inputsRow {
    display: flex;
    margin-bottom: 10px;

    .input {
      margin: 5px;
    }
  }

  .buttonsRow {
    display: flex;
    justify-content: space-around;
  }
`;

const Badge = ({ badge, ...props }) => {
  const btnHeight = props.btnRef?.current?.getBoundingClientRect()?.height;
  const [date, setDate] = useState(badge.activeWalk?.dateObject?.date || '');
  const [distance, setDistance] = useState(badge.activeWalk?.distance || 0);
  const [editMode, setEditMode] = useState(!!badge.activeWalk);

  useEffect(() => {
    setDate(badge.activeWalk?.dateObject?.date || '');
    setDistance(badge.activeWalk?.distance || 0);
    setEditMode(!!badge.activeWalk);
  }, [badge.activeWalk]);

  const handleDate = e => {
    setDate(e);
  };

  const handleDistance = e => {
    setDistance(e);
  };

  const handleSave = () => {
    const walk = {
      id: editMode ? badge.activeWalk?.id : null,
      date,
      distance: parseInt(distance),
    };
    if (editMode) {
      props.handleWalk(walk, badge.activeWalk?.id);
    } else {
      props.handleWalk(walk);
    }
  };

  return (
    <StyledBadge {...props} isOpen={badge.isOpen} btnHeight={btnHeight}>
      <Button
        square
        className="closeBtn"
        title={'Закрыть окно'}
        onClick={() => props.handleBadge(false)}
      >
        X
      </Button>
      <div className={'inputsRow'}>
        <Input
          className={'dateInput'}
          id="date"
          label="Дата"
          value={date}
          onChange={handleDate}
        />

        <Input
          id="date"
          type="number"
          label="Дистанция"
          value={distance}
          onChange={handleDistance}
        />
      </div>
      <div className={'buttonsRow'}>
        <Button sm onClick={handleSave}>
          Готово
        </Button>
        {editMode && (
          <Button sm onClick={() => props.removeWalk(badge.activeWalk?.id)}>
            Удалить
          </Button>
        )}
      </div>
    </StyledBadge>
  );
};

export default Badge;
