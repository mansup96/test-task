import React from 'react';
import styled, { css } from 'styled-components';

const StyledSection = styled.section`
  max-width: 100%;
  background-color: ${({ theme }) => theme.white};
  & > .container {
    max-width: 1168px;
    margin: 0 auto;
    display: flex;

    ${props =>
      props.row &&
      css`
        align-items: center;
      `}

    ${props =>
      props.column &&
      css`
        flex-direction: column;
        justify-content: center;
      `}
  }
`;

const Section = props => {
  return (
    <StyledSection {...props}>
      <div className="container">{props.children}</div>
    </StyledSection>
  );
};

export default Section;
