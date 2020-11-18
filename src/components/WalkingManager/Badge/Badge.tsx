import React, { RefObject, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Button } from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { BadgeType, Walk } from '../../../store/walkingManager/actionTypes';

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

    .input {
      margin: 5px;
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
    setDate(badge.activeWalk?.date || '');
    setDistance(badge.activeWalk?.distance || 0);
  }, [badge.activeWalk]);

  const handleDate = (e: string) => {
    setDate(e);
  };

  const handleDistance = (e: string) => {
    setDistance(parseInt(e));
  };

  const handleSave = () => {
    const walk = {
      id: badge.activeWalk?.id ? badge.activeWalk.id : null,
      date,
      distance: distance,
    };
    if (badge.activeWalk?.id) {
      // @ts-ignore

      handleWalk(walk, badge.activeWalk?.id);
    } else {
      // @ts-ignore
      handleWalk(walk);
    }
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
