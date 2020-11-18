import React, { useRef } from 'react';
import styled from 'styled-components';
import { Button } from '../common/Button/Button';
import ManagerHeader from './ManagerHeader/ManagerHeader';
import { connect, ConnectedProps } from 'react-redux';
import {
  changeWalksOrder,
  changeWalksSort,
  handleBadge,
  handleWalk,
  removeWalk,
  getWalks,
} from '../../store/walkingManager/actions';
import Table from './Table/Table';
import Badge from './Badge/Badge';
import { RootState } from '../../store';

const ManagerWrapper = styled.div`
  width: 335px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  position: relative;
`;

const WalkingManager = (props: PropsFromRedux) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <ManagerWrapper>
      <ManagerHeader
        activeParam={props.managerState.activeParam}
        sortParams={props.managerState.sortParams}
        onChangeWalksOrder={props.changeWalksOrder}
        onChangeWalksSort={props.changeWalksSort}
      />
      <Table
        walks={props.managerState.walks}
        getWalks={props.getWalks}
        handleBadge={props.handleBadge}
        isFetching={props.managerState.isFetching}
        error={props.managerState.errorMsg}
      />
      <Badge
        badge={props.managerState.badge}
        btnRef={buttonRef}
        handleBadge={props.handleBadge}
        handleWalk={props.handleWalk}
        removeWalk={props.removeWalk}
      />
      <Button
        ref={buttonRef}
        fullWidth
        onClick={() => props.handleBadge(true, null)}
        disabled={props.managerState.badge.isOpen}
      >
        Добавить запись
      </Button>
    </ManagerWrapper>
  );
};

const mapStateToProps = (state: RootState) => ({
  managerState: state.managerReducer,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, {
  changeWalksSort,
  changeWalksOrder,
  handleBadge,
  handleWalk,
  removeWalk,
  getWalks,
});

export default connector(WalkingManager);
