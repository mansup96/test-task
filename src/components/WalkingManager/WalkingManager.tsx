import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Button } from '../common/Button/Button';
import ManagerHeader from './ManagerHeader/ManagerHeader';
import { connect, ConnectedProps } from 'react-redux';
import {
  changeWalksOrder,
  changeWalksSort,
  handleBadgeAction,
  setBadgeMode,
  handleWalk,
  removeWalk,
  setPage,
  fetchWalks,
  incrementPage,
} from '../../store/walkingManager/actions';
import Table from './Table/Table';
import Badge from './Badge/Badge';
import { RootState } from '../../store';

const ManagerWrapper = styled.div`
  width: 335px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.35);
  position: relative;
  min-height: 580px;
`;

const WalkingManager = ({ fetchWalks, ...props }: PropsFromRedux) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    fetchWalks();
  }, [fetchWalks]);

  return (
    <ManagerWrapper>
      <ManagerHeader
        activeParam={props.managerState.activeParam}
        sortParams={props.managerState.sortParams}
        onChangeWalksOrder={props.changeWalksOrder}
        onChangeWalksSort={props.changeWalksSort}
      />
      <Table
        incrementPage={props.incrementPage}
        walks={props.managerState.walks}
        setPage={props.setPage}
        handleBadgeAction={props.handleBadgeAction}
        setBadgeMode={props.setBadgeMode}
        isFetching={props.managerState.isFetching}
        error={props.managerState.errorMsg}
      />
      <Badge
        badge={props.managerState.badge}
        btnRef={buttonRef}
        setBadgeMode={props.setBadgeMode}
        handleWalk={props.handleWalk}
        removeWalk={props.removeWalk}
      />
      <Button
        ref={buttonRef}
        fullWidth
        onClick={() => {
          props.setBadgeMode(true);
          props.handleBadgeAction(null);
        }}
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
  handleBadgeAction,
  setBadgeMode,
  handleWalk,
  removeWalk,
  setPage,
  fetchWalks,
  incrementPage,
});

export default connector(WalkingManager);
