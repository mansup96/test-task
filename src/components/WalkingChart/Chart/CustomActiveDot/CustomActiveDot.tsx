import React, { useEffect } from 'react';

const CustomActiveDot = ({
  dataKey,
  onActiveChange,
  onClick,
  ...props
}: any) => {
  const { cx, cy, index } = props;

  useEffect(() => {
    onActiveChange({ x: cx, y: cy }, index);
  }, [cx, cy, index, onActiveChange]);

  const handleClick = () => {
    onClick(index);
  };

  return <circle onClick={handleClick} {...props} />;
};

export default CustomActiveDot;
