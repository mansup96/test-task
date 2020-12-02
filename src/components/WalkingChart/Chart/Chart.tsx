import React from 'react';
import { MappedWalk } from '../../../store/walkingManager/actionTypes';
import {
    CartesianGrid,
    LabelFormatter,
    LabelListProps,
    LabelProps,
    Line,
    LineChart,
    LineProps, Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { theme } from '../../../styles';
import styled from 'styled-components';
type ChartProps = {
  walks: MappedWalk[];
};

const ChartWrapper = styled.div``;

const Chart = ({ walks }: ChartProps) => {
  const axisStyles = {
    fontFamily: theme.sansCaption,
    opacity: 0.2,
    color: theme.gray,
  };

  const CustomizedLabel = (props: any) => {
    const { x, y, index } = props;

    const transformedDistance = walks[index].transformedDistance[1];

    return (
      <text
        x={x}
        y={y}
        dy={-10}
        fontSize={14}
        textAnchor="middle"
        color={theme.accent}
      >
        {transformedDistance}
      </text>
    );
  };

  return (
    <ChartWrapper>
      <LineChart width={768} height={210} data={walks}>
        <XAxis
          padding={{ left: 40, right: 40 }}
          tickLine={false}
          tick={{ ...axisStyles, fontSize: 8 }}
          dataKey="localeDate"
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ ...axisStyles, fontSize: 10 }}
        />
        <CartesianGrid stroke="#ccc" />
        <Line
          dot={{ fill: theme.accent, r: 5 }}
          dataKey="distance"
          stroke={theme.accent}
          strokeWidth={2}
          label={CustomizedLabel}
        />
        <Tooltip/>
      </LineChart>
    </ChartWrapper>
  );
};

export default Chart;
