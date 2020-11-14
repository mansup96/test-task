import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button/Button';
import ManagerHeader from './ManagerHeader/ManagerHeader';
import { connect } from 'react-redux';
import { setSortParams } from '../../store/managerReducer';

const ManagerWrapper = styled.div``;

const WalkingManager = props => {
  return (
    <ManagerWrapper {...props}>
      <ManagerHeader
        sortParams={props.managerState.sortParams}
        onChange={props.setSortParams}
      />
      {/*<Table />*/}
      <Button> Добавить запись </Button>
    </ManagerWrapper>
  );
};

const mapStateToProps = state => ({
  managerState: state.managerReducer,
});

export default connect(mapStateToProps, { setSortParams })(WalkingManager);
