import React from "react";
import styled from "styled-components";

const StyledSection = styled.section`
  max-width: 100%;
  background-color: ${({ theme }) => theme.white};
  .container {
    max-width: 1168px;
    margin: 0 auto;
  }
`;

const Section = (props) => {
  return (
    <StyledSection {...props}>
      <div className="container">{props.children}</div>
    </StyledSection>
  );
};

export default Section;
