import React, { useEffect, useRef, useState } from 'react';
import { TooltipProps } from 'recharts';
import styled, { css } from 'styled-components';
import { MappedWalk } from '../../../../store/walkingManager/actionTypes';

type ContentWrapperProps = {
  triangleSide?: 'left' | 'right';
};

export type Size = {
  height?: number;
  width?: number;
};

type CustomTooltipProps = TooltipProps & {
  onChangePosition: (width: number, tooltipWrapperSize: Size) => void;
};

const ContentWrapper = styled.div<ContentWrapperProps>`
  width: 150px;
  height: 90px;
  background-color: ${({ theme }) => theme.white};
  padding: 10px;
  border-radius: 5px 5px
    ${({ triangleSide }) => (triangleSide === 'left' ? '5px 0' : '0 5px')};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  position: relative;
  
  .day {
    display: block;
    font-family: ${({ theme }) => theme.sansCaptions};
    color: ${({ theme }) => theme.main};
    font-size: 10px;
  }
  .date {
    display: block;
    font-family: ${({ theme }) => theme.sansCaptions};
    color: ${({ theme }) => theme.main};
    opacity: 0.4;
    font-size: 14px;
  }
  
  .distance {
    margin-top: 7px;
    text-align: center;
    font-family: ${({ theme }) => theme.sansCaptions};
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 31px;
  }
  

  .triangleWithShadow {
    position: absolute;
    width: 30px;
    height: 30px;
    overflow: hidden;
    ${({ triangleSide }) =>
      triangleSide === 'left'
        ? css`
            box-shadow: 0 10px 6px -8px rgba(0, 0, 0, 0.25);
            transform: rotate(-45deg);
            left: -18px;
            bottom: -13px;
          `
        : css`
            box-shadow: 0 10px 6px -8px rgba(0, 0, 0, 0.25);
            transform: rotate(45deg);
            right: -17px;
            bottom: -13px;
          `}

    &::after {
      content: '';
      position: absolute;
      width: 17px;
      height: 17px;
      transform-origin: 0 0;
      transform: rotate(45deg);
      background-color: white;
       ${({ triangleSide }) =>
         triangleSide === 'left'
           ? css`
               top: 18px;
               left: 16px;
               box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.25);
             `
           : css`
               top: 17px;
               left: 14px;
               box-shadow: 3px 0 5px 0 rgba(0, 0, 0, 0.25);
             `}
       }
`;

const getTriangleSide = (
  viewBoxWidth?: number,
  xCoord?: number
): 'right' | 'left' => {
  if (xCoord && viewBoxWidth && viewBoxWidth - 150 < xCoord) {
    return 'right';
  }
  return 'left';
};

const CustomTooltip = ({
  payload,
  active,
  viewBox,
  coordinate,
  onChangePosition,
}: CustomTooltipProps) => {
  const viewBoxWidth = viewBox?.width;

  const wrapper = useRef<HTMLDivElement>(null);
  const { current: divNode } = wrapper;

  const [wrapperSize, setWrapperSize] = useState<Size>({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    if (divNode) {
      setWrapperSize({
        height: wrapper?.current?.getBoundingClientRect().height,
        width: wrapper?.current?.getBoundingClientRect().width,
      });
    }
  }, [divNode]);

  useEffect(() => {
    if (wrapper.current) {
      onChangePosition(viewBoxWidth || 0, wrapperSize);
    }
  }, [viewBoxWidth, onChangePosition, wrapperSize]);

  if (active && payload) {
    const walkInfo: MappedWalk = payload[0].payload;
    return (
      <ContentWrapper
        ref={wrapper}
        triangleSide={getTriangleSide(viewBox?.width, coordinate?.x)}
      >
        <div className={'dateWrapper'}>
          <span className={'day'}>{walkInfo.localeDay}</span>
          <span className={'date'}>{walkInfo.localeDate}</span>
          <p className={'distance'}>{walkInfo.transformedDistance[1]}</p>
        </div>
        <div className={'triangleWithShadow'} />
      </ContentWrapper>
    );
  }
  return null;
};

export default CustomTooltip;
