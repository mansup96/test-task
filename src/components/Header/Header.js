import React from "react";
import axios from "axios";
import styled from "styled-components";

const Header = ({ className, title }) => {
  return (
    <header className={className}>
      <h1 className="title">{title}</h1>
    </header>
  );
};

const StyledHeader = styled(Header)`
  width: 100%;
  background-color: ${(props) => props.theme.main};
  padding: 15px 20px;
  margin-bottom: 100px;
  & .title {
    margin: 0;
    color: ${(props) => props.theme.white};
    font-family: ${(props) => props.theme.sansCaption}, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 31px;
  }
`;

export default StyledHeader;
