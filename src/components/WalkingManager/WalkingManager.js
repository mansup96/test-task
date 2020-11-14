import React from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import ManagerHeader from "./ManagerHeader/ManagerHeader";

const WalkingManager = props => {
  return (
    <div>
      <ManagerHeader />
      {/*<Table />*/}
      <Button> Добавить запись </Button>
    </div>
  );
};

const styledManager = styled(WalkingManager)``;

export default styledManager;
