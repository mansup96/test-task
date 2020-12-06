import React, { RefObject, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Button } from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { BadgeType, Walk } from '../../../store/walkingManager/actionTypes';
import CustomDatePicker from '../../common/CustomDatePicker/CustomDatePicker';

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
    .input {
      width: 150px;
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
  const [date, setDate] = useState(
    badge.activeWalk?.date || new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [distance, setDistance] = useState(
    badge.activeWalk?.distance.toString() || ''
  );
  const [error, setError] = useState('');

  useEffect(() => {
    setDate(
      badge.activeWalk?.date || new Date(new Date().setHours(0, 0, 0, 0))
    );
    setDistance(badge.activeWalk?.distance.toString() || '');
  }, [badge.activeWalk]);

  const handleDate = (date: Date) => {
    setDate(date);
  };

  const handleDistance = (value: string) => {
    if (!value || Number(value) <= 0) {
      setError('Введите корректные данные');
      setDistance(value);
    } else {
      setDistance(value);
      setError('');
    }
  };

  const handleSave = () => {
    if (distance) {
      const walk = {
        id: badge.activeWalk?.id ? badge.activeWalk.id : null,
        date,
        distance: Number(distance),
      };
      handleWalk(walk);
      setDistance('');
      setDate(new Date(new Date().setHours(0, 0, 0, 0)));
    } else {
      setError('Введите корректные данные');
    }
  };

  const closeBadge = () => {
    handleBadge(false);
    setError('');
  };

  const deleteWalk = () => {
    if (badge.activeWalk?.id) {
      removeWalk(badge.activeWalk.id);
    }
  };

  return (
    <StyledBadge isOpen={badge.isOpen} btnHeight={btnHeight}>
      <Button
        square
        className="closeBtn"
        title={'Закрыть окно'}
        onClick={closeBadge}
      >
        X
      </Button>
      <div className={'inputsRow'}>
        <CustomDatePicker
          className={'input'}
          label="Дата"
          selected={new Date(date)}
          maxDate={new Date()}
          onChange={handleDate}
          dateFormat={'dd.MM.yyyy'}
        />

        <Input
          className={'input'}
          type="number"
          label="Дистанция (м)"
          value={distance}
          onChangeValue={handleDistance}
          error={error}
          step={'100'}
        />
      </div>
      <div className={'buttonsRow'}>
        <Button sm disabled={!!error || !distance} onClick={handleSave}>
          Готово
        </Button>
        {badge.activeWalk?.id && (
          <Button sm onClick={deleteWalk}>
            Удалить
          </Button>
        )}
      </div>
    </StyledBadge>
  );
};

export default Badge;
