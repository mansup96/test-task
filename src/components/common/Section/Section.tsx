import React from 'react';
import styled, { css } from 'styled-components';

type StyledSectionProps = {
  row?: boolean;
  column?: boolean;
};

type SectionProps = StyledSectionProps & {
  children: React.ReactNode;
};

const StyledSection = styled.section<StyledSectionProps>`
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

const Section = ({ children, row, column }: SectionProps) => {
  return (
    <StyledSection {...{ row, column }}>
      <div className="container">{children}</div>
    </StyledSection>
  );
};

export default Section;
