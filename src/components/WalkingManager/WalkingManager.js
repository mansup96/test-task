import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import {Button} from '../common/Button/Button';
import ManagerHeader from './ManagerHeader/ManagerHeader';
import { connect } from 'react-redux';
import {
  fetchWalks,
  handleBadge,
  handleWalk,
  removeWalk,
} from '../../store/managerReducer';
import Table from './Table/Table';
import Badge from './Badge/Badge';

const ManagerWrapper = styled.div`
  width: 335px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: relative;
`;

const WalkingManager = props => {
  const buttonRef = useRef(null);
  return (
    <ManagerWrapper {...props}>
      <ManagerHeader
        sortParams={props.managerState.sortParams}
        onChange={props.fetchWalks}
      />
      <Table
        walks={props.managerState.walks}
        getWalks={props.fetchWalks}
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

const mapStateToProps = state => ({
  managerState: state.managerReducer,
});

export default connect(mapStateToProps, {
  fetchWalks,
  handleBadge,
  handleWalk,
  removeWalk,
})(WalkingManager);
