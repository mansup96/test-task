import React, { useEffect } from 'react';
import styled from 'styled-components';
import { RootState } from '../../store';
import ChartHeader from './ChartHeader/ChartHeader';
import { connect, ConnectedProps } from 'react-redux';
import {
  changeChartRange,
  getRangedWalks,
} from '../../store/walkingManager/actions';
import Chart from './Chart/Chart';

const StyledChart = styled.div`
  width: 100%;
  max-width: 809px;
  padding: 20px;
  margin-left: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.35);
  position: relative;
  min-height: 580px;
`;

const WalkingChart = ({
  getRangedWalks,
  range,
  rangedWalks,
  changeChartRange,
}: PropsFromRedux) => {
  useEffect(() => {
    getRangedWalks();
  }, [getRangedWalks]);

  return (
    <StyledChart>
      <ChartHeader range={range} onChangeRange={changeChartRange} />
      <Chart walks={rangedWalks} />
    </StyledChart>
  );
};

const mapStateToProps = (state: RootState) => ({
  range: state.managerReducer.chartRange,
  rangedWalks: state.managerReducer.rangedWalks,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, {
  getRangedWalks,
  changeChartRange,
});

export default connector(WalkingChart);
