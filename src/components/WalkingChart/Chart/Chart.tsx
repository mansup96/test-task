import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { MappedWalk } from '../../../store/walkingManager/types';
import {
  CartesianGrid,
  Coordinate,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import CustomizedLabel from './CustomLabel/CustomLabel';
import CustomTooltip, { Size } from './CustomTooltip/CustomTooltip';
import CustomActiveDot from './CustomActiveDot/CustomActiveDot';
import { theme } from '../../../styles';

type ChartProps = {
  walks: MappedWalk[];
  setBadgeMode: (isOpen: boolean) => void;
  handleBadgeAction: (id: number, from: 'chart') => void;
};

const ChartWrapper = styled.div`
  margin-top: 130px;
`;

const tickStyle = {
  fontFamily: theme.sansCaption,
  opacity: 0.4,
  color: '#000000',
};

const getTooltipPosition = (
  dotCoords: Coordinate,
  viewBoxWidth: number,
  tooltipWrapperSize: Size
): Coordinate => {
  const { x: dotX, y: dotY } = dotCoords;
  const { height: tooltipHeight, width: tooltipWidth } = tooltipWrapperSize;
  const triangleHeight = 17;
  const offset = 25;

  if (tooltipHeight && tooltipWidth) {
    if (dotX + tooltipWidth > viewBoxWidth) {
      return {
        x: dotX - tooltipWidth,
        y: dotY - tooltipHeight - triangleHeight - offset,
      };
    }
    return { x: dotX, y: dotY - tooltipHeight - triangleHeight - offset };
  }
  return { x: 0, y: 0 };
};

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

const Chart = ({ walks, setBadgeMode, handleBadgeAction }: ChartProps) => {
  const ticks = useMemo(() => getTicksByDistance(walks), [walks]);

  const [activeDotCoords, setActiveDotCoords] = useState({
    x: 0,
    y: 0,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewBoxWidth, setViewBoxWidth] = useState(0);
  const [tooltipWrapperSize, setTooltipWrapperSize] = useState<Size>({
    height: 0,
    width: 0,
  });

  const recordViewBoxWidth = (width: number, tooltipWrapperSize: Size) => {
    setTooltipWrapperSize(tooltipWrapperSize);
    setViewBoxWidth(width);
  };

  const onChangeActiveDot = (coords: Coordinate, index: number) => {
    if (index !== activeIndex) {
      setActiveDotCoords({ ...coords });
      setActiveIndex(index);
    }
  };

  const handleDotClick = (index: number) => {
    const walkId = walks[index].id;
    if (walkId) {
      setBadgeMode(true);
      handleBadgeAction(walkId, 'chart');
    }
  };

  return (
    <ChartWrapper>
      <LineChart
        width={768}
        height={300}
        data={walks}
        margin={{ left: 0, right: 0 }}
        throttleDelay={100}
      >
        <XAxis
          dataKey="localeDate"
          padding={{ left: 40, right: 40 }}
          tickLine={false}
          tick={{ ...tickStyle, fontSize: 8 }}
          interval={'preserveStartEnd'}
        />
        <YAxis
          width={35}
          interval={'preserveStartEnd'}
          ticks={ticks}
          axisLine={false}
          tickLine={false}
          domain={['dataMin', 'dataMax + 100']}
          tick={{ ...tickStyle, fontSize: 10 }}
        />
        <CartesianGrid stroke={theme.main} opacity={0.1} />
        <Tooltip
          position={getTooltipPosition(
            activeDotCoords,
            viewBoxWidth,
            tooltipWrapperSize
          )}
          cursor={false}
          offset={0}
          active={true}
          allowEscapeViewBox={{ x: true, y: true }}
          content={<CustomTooltip onChangePosition={recordViewBoxWidth} />}
        />
        <Line
          dataKey="distance"
          stroke={theme.accent}
          dot={{ fill: theme.accent, r: 5 }}
          activeDot={
            <CustomActiveDot
              strokeWidth={0}
              r={10}
              cursor={'pointer'}
              onActiveChange={onChangeActiveDot}
              onClick={(index: number) => handleDotClick(index)}
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
