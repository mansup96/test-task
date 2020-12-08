import React, { RefObject, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import {
  BadgeType,
  CreatedWalk,
  Walk,
} from '../../../store/walkingManager/types';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import CustomDatePicker from '../../common/CustomDatePicker/CustomDatePicker';

type BadgeProps = {
  badge: BadgeType;
  btnRef: RefObject<HTMLButtonElement>;
  setBadgeMode: (isOpen: boolean) => void;
  handleWalkAction: (walk: Walk | CreatedWalk, id?: number) => void;
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

  .title {
    margin: 0 0 20px;
    text-align: center;
    color: ${({ theme }) => theme.white};
    font-size: 18px;
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
  handleWalkAction,
  setBadgeMode,
  removeWalk,
}: BadgeProps) => {
  const btnHeight = btnRef?.current?.getBoundingClientRect().height ?? 0;
  const [date, setDate] = useState(
    new Date(badge.selectedWalk?.date || new Date().setHours(0, 0, 0, 0))
  );
  const [distance, setDistance] = useState(
    badge.selectedWalk?.distance.toString() || ''
  );
  const [error, setError] = useState('');

  useEffect(() => {
    setDate(
      new Date(badge.selectedWalk?.date || new Date().setHours(0, 0, 0, 0))
    );
    setDistance(badge.selectedWalk?.distance.toString() || '');
  }, [badge.selectedWalk]);

  const handleDate = (date: Date) => {
    setDate(date);
  };

  const handleDistance = (value: string) => {
    if (!value || Number(value) <= 0) {
      setError('Введите корректные данные');
    } else if (Number(value) > 300000) {
      setError('Не надо врать');
    } else {
      setError('');
    }
    setDistance(value);
  };

  const handleSave = () => {
    if (distance) {
      const walk = {
        id: badge.selectedWalk?.id ? badge.selectedWalk.id : null,
        date: date.toISOString(),
        distance: Number(distance),
      };
      handleWalkAction(walk);
      setDistance('');
      setDate(new Date(new Date().setHours(0, 0, 0, 0)));
    } else {
      setError('Введите корректные данные');
    }
  };

  const closeBadge = () => {
    setBadgeMode(false);
    setError('');
  };

  const deleteWalk = () => {
    if (badge.selectedWalk?.id) {
      removeWalk(badge.selectedWalk.id);
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
      <p className={'title'}>
        {badge?.selectedWalk ? 'Редактирование записи' : 'Создание записи'}
      </p>
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
          min={'0'}
          onChangeValue={handleDistance}
          error={error}
          step={'100'}
        />
      </div>
      <div className={'buttonsRow'}>
        <Button sm disabled={!!error || !distance} onClick={handleSave}>
          Готово
        </Button>
        {badge.selectedWalk?.id && (
          <Button sm onClick={deleteWalk}>
            Удалить
          </Button>
        )}
      </div>
    </StyledBadge>
  );
};

export default Badge;
