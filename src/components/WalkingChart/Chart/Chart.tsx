import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { MappedWalk } from '../../../store/walkingManager/actionTypes';
import {
  CartesianGrid,
  Coordinate,
  Line,
  LineChart,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import CustomizedLabel from './CustomLabel/CustomLabel';
import CustomTooltip from './CustomTooltip/CustomTooltip';
import CustomActiveDot from './CustomActiveDot/CustomActiveDot';
import { theme } from '../../../styles';

type ChartProps = {
  walks: MappedWalk[];
};

export type PositionType = { x: number; y: number; index: number };

const ChartWrapper = styled.div`
  margin-top: 130px;
`;

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
  const ticks = useMemo(() => getTicksByDistance(walks), [walks]);

  const [activeCoords, setActiveCoords] = useState({
    x: 100,
    y: 100,
    index: 100,
  });

  const onActiveChange = (coords: Coordinate, index: number) => {
    if (index !== activeCoords.index) {
      setActiveCoords({ ...coords, index });
    }
  };

  return (
    <ChartWrapper>
      <LineChart
        width={768}
        height={300}
        data={walks}
        margin={{ left: 0, right: 0 }}
      >
        <XAxis
          dataKey="localeDate"
          padding={{ left: 40, right: 40 }}
          tickLine={false}
          tick={{ ...tickStyle, fontSize: 8 }}
        />
        <YAxis
          width={25}
          interval={'preserveStartEnd'}
          ticks={ticks}
          axisLine={false}
          tickLine={false}
          tick={{ ...tickStyle, fontSize: 10 }}
        />
        <CartesianGrid stroke={theme.main} opacity={0.1} />
        <Tooltip
          position={{ x: activeCoords.x, y: activeCoords.y }}
          offset={0}
          active={true}
          allowEscapeViewBox={{ x: true, y: true }}
          content={(props: TooltipProps) => CustomTooltip(props)}
        />
        <Line
          dataKey="distance"
          stroke={theme.accent}
          dot={{ fill: theme.accent, r: 5 }}
          activeDot={
            <CustomActiveDot
              strokeWidth={0}
              r={10}
              onActiveChange={onActiveChange}
            />
          }
          strokeWidth={2}
          label={(props: any) => CustomizedLabel(props, walks)}
        />
      </LineChart>
    </ChartWrapper>
  );
};

export default Chart;
