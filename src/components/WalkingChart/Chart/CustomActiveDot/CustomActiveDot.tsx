import React, { useEffect } from 'react';

const CustomActiveDot = ({ dataKey, onActiveChange, ...props }: any) => {
  // console.log(props);
  const { cx, cy, index } = props;

  useEffect(() => {
    onActiveChange({ x: cx, y: cy }, index);
  }, [cx, cy, index, onActiveChange]);

  return <circle {...props} />;
};

export default CustomActiveDot;
