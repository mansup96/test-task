import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

const Header = ({ className, title }) => (
  <header className={className}>
    <h1 className="title">{title}</h1>
  </header>
);

const StyledHeader = styled(Header)`
  width: 100%;
  background-color: ${props => props.theme.main};
  padding: 15px 20px;
  margin-bottom: 100px;
  & .title {
    margin: 0;
    color: ${props => props.theme.white};
    font-family: ${props => props.theme.sansCaption}, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 31px;
  }
`;

Header.propTypes = {
  className: string.isRequired,
  title: string.isRequired,
};

export default StyledHeader;
