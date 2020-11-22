import React, { ReactText, RefObject, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Button } from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { BadgeType, Walk } from '../../../store/walkingManager/actionTypes';
import CustomDatePicker from '../../common/CustomDatePicker/CustomDatePicker';
import { useDispatch } from 'react-redux';

type BadgeProps = {
  badge: BadgeType;
  btnRef: RefObject<HTMLButtonElement>;
  handleBadge: (isOpen: boolean, id?: number | null) => void;
  handleWalk: (walk: Walk, id?: number) => void;
  removeWalk: (id: number) => void;
};

type StyledBadgeProps = {
  isOpen: boolean;
  btnHeight: number;
};

const openBadgeStyles = (btnHeight: number) => css`
  width: 100%;
  transform: ${() => `translateY(-${btnHeight}px)}`};
  opacity: 1;
  z-index: 100;
`;

const StyledBadge = styled.div<StyledBadgeProps>`
  position: absolute;
  background-color: ${({ theme }) => theme.main};
  padding: 20px 15px;
  transition: transform ${({ theme }) => theme.defaultTransition};
  opacity: 0;
  z-index: -100;
  bottom: 0;

  ${props => props.isOpen && openBadgeStyles(props.btnHeight)}

  .closeBtn {
    display: block;
    margin-left: auto;
  }

  .inputsRow {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    .dateInput {
      max-width: 150px;
    }
  }

  .buttonsRow {
    display: flex;
    justify-content: space-around;
  }
`;

const Badge = ({
  badge,
  btnRef,
  handleBadge,
  handleWalk,
  removeWalk,
}: BadgeProps) => {
  const btnHeight = btnRef?.current?.getBoundingClientRect().height ?? 0;
  const [date, setDate] = useState(badge.activeWalk?.date || '');
  const [distance, setDistance] = useState(badge.activeWalk?.distance || 0);

  useEffect(() => {
    setDate(badge.activeWalk?.date || Date.now());
    setDistance(badge.activeWalk?.distance || 0);
  }, [badge.activeWalk]);

  const handleDate = (date: Date) => {
    setDate(date);
  };

  const handleDistance = (value: string) => {
    setDistance(parseInt(value));
  };

  const handleSave = () => {
    const walk = {
      id: badge.activeWalk?.id ? badge.activeWalk.id : null,
      date,
      distance,
    };
    handleWalk(walk);
    setDistance(0);
  };

  return (
    <StyledBadge isOpen={badge.isOpen} btnHeight={btnHeight}>
      <Button
        square
        className="closeBtn"
        title={'Закрыть окно'}
        onClick={() => handleBadge(false)}
      >
        X
      </Button>
      <div className={'inputsRow'}>
        <CustomDatePicker
          label="Дата"
          date={date}
          onChange={handleDate}
          dateFormat={'dd.MM.yyyy'}
        />

        <Input
          id="date"
          type="number"
          label="Дистанция (м)"
          value={distance}
          onChange={handleDistance}
        />
      </div>
      <div className={'buttonsRow'}>
        <Button sm onClick={handleSave}>
          Готово
        </Button>
        {badge.activeWalk?.id && (
          <Button
            sm
            onClick={() => {
              if (badge.activeWalk?.id) {
                removeWalk(badge.activeWalk.id);
              }
            }}
          >
            Удалить
          </Button>
        )}
      </div>
    </StyledBadge>
  );
};

export default Badge;
