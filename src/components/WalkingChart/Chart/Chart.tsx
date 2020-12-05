import React, { useMemo } from 'react';
import { MappedWalk } from '../../../store/walkingManager/actionTypes';
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { theme } from '../../../styles';
import styled from 'styled-components';
type ChartProps = {
  walks: MappedWalk[];
};

const ChartWrapper = styled.div``;

const tickStyle = {
  fontFamily: theme.sansCaption,
  opacity: 0.4,
  color: '#000000',
};

// const sumDistance = (walks: MappedWalk[]): MappedWalk[] => {
//   const result: MappedWalk[] = [];
//
//   walks.forEach(walk => {
//     const sameDated = result.find(
//       walkInResult => walkInResult.date === walk.date
//     );
//     if (!sameDated) {
//       result.push(walk);
//     } else {
//       sameDated.distance += walk.distance;
//     }
//   });
//
//   return result;
// };
//
// const checkedWalks = sumDistance(walks);

const getTicksByDistance = (walks: MappedWalk[]): number[] => {
  const distances = Array.from(walks, walk => walk.distance);
  const longest = Math.max(...distances);
  const maxTick = longest + (100 - (longest % 100));
  const result: number[] = [];
  for (let i = maxTick; i >= 0; i -= 100) {
    result.push(i);
  }
  return result;
};

const Chart = ({ walks }: ChartProps) => {

  const memoizedWalks = useMemo(() => walks, [walks])
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
        fontFamily={theme.sans}
      >
        {transformedDistance}
      </text>
    );
  };

  const ticks = useMemo(() => getTicksByDistance(walks), [walks]);

  return (
    <ChartWrapper>
      {walks && (
        <LineChart width={768} height={210} data={memoizedWalks}>
          <XAxis
            dataKey="localeDate"
            padding={{ left: 40, right: 40 }}
            tickLine={false}
            tick={{ ...tickStyle, fontSize: 8 }}
          />
          <YAxis
            width={20}
            interval={'preserveStartEnd'}
            ticks={ticks}
            axisLine={false}
            tickLine={false}
            tick={{ ...tickStyle, fontSize: 10 }}
          />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
          <Line
              isAnimationActive={false}
            dataKey="distance"
            stroke={theme.accent}
            dot={{ fill: theme.accent, r: 5 }}
            activeDot={{ r: 10 }}
            strokeWidth={2}
            label={CustomizedLabel}
          />
        </LineChart>
      )}
    </ChartWrapper>
  );
};

export default Chart;
