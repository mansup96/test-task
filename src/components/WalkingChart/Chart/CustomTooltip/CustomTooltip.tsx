import React from 'react';
import { TooltipProps } from 'recharts';
import styled, { css } from 'styled-components';

type ContentWrapperProps = {
  triangleSide?: 'left' | 'right';
};

const ContentWrapper = styled.div<ContentWrapperProps>`
  width: 150px;
  height: 120px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 5px 5px
    ${({ triangleSide }) => (triangleSide === 'left' ? '5px 0' : '0 5px')};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  position: relative;

  .triangle-with-shadow {
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

const CustomTooltip = (props: TooltipProps) => {
  const { payload, active, viewBox, coordinate } = props;
  // console.log(props)

  if (active && payload) {
    return (
      <ContentWrapper
        triangleSide={getTriangleSide(viewBox?.width, coordinate?.x)}
      >
        <div className={'dateWrapper'}>
          <p>{payload[0].name}</p>
        </div>
        <div className={'triangle-with-shadow'} />
      </ContentWrapper>
    );
  }
  return null;
};

export default CustomTooltip;
