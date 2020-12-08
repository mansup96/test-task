import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import {
  changeWalksOrder,
  changeWalksSort,
  handleBadgeAction,
  setBadgeMode,
  handleWalkAction,
  removeWalk,
  setPage,
  fetchWalks,
  incrementPage,
} from '../../store/walkingManager/actions';
import Button from '../common/Button/Button';
import ManagerHeader from './ManagerHeader/ManagerHeader';
import Table from './Table/Table';
import Badge from './Badge/Badge';
import { getMappedWalks } from '../../store/walkingManager/selectors';

const ManagerWrapper = styled.div`
  width: 335px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.35);
  position: relative;
  min-height: 580px;
`;

const WalkingManager = ({
  sortParams,
  walks,
  isFetching,
  badge,
  setPage,
  incrementPage,
  fetchWalks,
  setBadgeMode,
  changeWalksSort,
  activeSortParam,
  handleWalkAction,
  handleBadgeAction,
  ...props
}: PropsFromRedux) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    fetchWalks();
  }, [fetchWalks]);

  return (
    <ManagerWrapper>
      <ManagerHeader
        activeParam={activeSortParam}
        sortParams={sortParams}
        onChangeWalksOrder={props.changeWalksOrder}
        onChangeWalksSort={changeWalksSort}
      />
      <Table
        incrementPage={incrementPage}
        walks={walks}
        setPage={setPage}
        handleBadgeAction={handleBadgeAction}
        setBadgeMode={setBadgeMode}
        isFetching={isFetching}
      />
      <Badge
        badge={badge}
        btnRef={buttonRef}
        setBadgeMode={setBadgeMode}
        handleWalkAction={handleWalkAction}
        removeWalk={props.removeWalk}
      />
      <Button
        ref={buttonRef}
        fullWidth
        onClick={() => {
          setBadgeMode(true);
          handleBadgeAction(null);
        }}
        disabled={badge.isOpen}
      >
        Добавить запись
      </Button>
    </ManagerWrapper>
  );
};

const mapStateToProps = (state: RootState) => ({
  managerState: state.managerReducer,
  activeSortParam: state.managerReducer.activeSortParam,
  sortParams: state.managerReducer.sortParams,
  isFetching: state.managerReducer.isFetching,
  badge: state.managerReducer.badge,
  walks: getMappedWalks(state),
});

type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, {
  changeWalksSort,
  changeWalksOrder,
  handleBadgeAction,
  setBadgeMode,
  handleWalkAction,
  removeWalk,
  setPage,
  fetchWalks,
  incrementPage,
});

export default connector(WalkingManager);
