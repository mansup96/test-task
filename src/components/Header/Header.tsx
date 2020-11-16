import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  width: 100%;
  background-color: ${props => props.theme.main};
  padding: 15px 20px;
  margin-bottom: 100px;
  & .title {
    margin: 0;
    color: ${props => props.theme.white};
    font-family: ${props => props.theme.sansCaption};
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 31px;
  }
`;

type HeaderProps = {
  className?: string;
  title: string;
};

const Header = ({ className, title }: HeaderProps) => (
  <StyledHeader className={className}>
    <h1 className="title">{title}</h1>
  </StyledHeader>
);

export default Header;
