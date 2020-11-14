import React from "react";
import styled from "styled-components";
import SortElement from "../../common/SortElement/SortElement";

const ManagerHeaderWrapper = styled.div`
  background-color: ${({ theme }) => theme.main};
  padding: 16px 11px;
  display: flex;
`;

const ManagerHeader = props => {
  return (
    <ManagerHeaderWrapper {...props}>
      <SortElement label="Дата" active/>
      <SortElement label="Дистанция" direction={'desc'}/>
    </ManagerHeaderWrapper>
  );
};

export default ManagerHeader;
