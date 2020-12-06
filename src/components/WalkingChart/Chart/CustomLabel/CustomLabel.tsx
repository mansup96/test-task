import { MappedWalk } from '../../../../store/walkingManager/actionTypes';
import { theme } from '../../../../styles';
import React  from 'react';


const CustomizedLabel = (
  props: any,
  walks: MappedWalk[],
) => {
  const { x, y, index } = props;

  const transformedDistance = walks[index].transformedDistance[1];

  return (
    <text
      x={x}
      y={y}
      dy={-12}
      fontSize={14}
      textAnchor="middle"
      fill={theme.accent}
      fontFamily={theme.sans}
    >
      {transformedDistance}
    </text>
  );
};

export default CustomizedLabel;
