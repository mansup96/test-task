import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from '../common/Button/Button';
import ManagerHeader from './ManagerHeader/ManagerHeader';
import { connect } from 'react-redux';
import { fetchWalks, handleBadge } from '../../store/managerReducer';
import Table from './Table/Table';

const ManagerWrapper = styled.div`
  width: 335px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const WalkingManager = props => {
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

      <Button fullWidth onClick={() => props.handleBadge(true)}>
        Добавить запись
      </Button>
    </ManagerWrapper>
  );
};

const mapStateToProps = state => ({
  managerState: state.managerReducer,
});

export default connect(mapStateToProps, { fetchWalks, handleBadge })(
  WalkingManager
);
