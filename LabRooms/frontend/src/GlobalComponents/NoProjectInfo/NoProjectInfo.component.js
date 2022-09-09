import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { StyledRow } from "../../Pages/UserProfile/UserProfile.component.styled";
import { Col } from "../../antd_components";
import { TitleStyled } from "../../Pages/Home/components/Rooms/styles";
import CreateRoomButton from "../CreateRoomButton/CreateRoomButton.component";

const NoProjectInfo = ({ darkPallete, hasntRooms }) => {
  const { screenSize } = useContext(UserContext);

  return (
    <StyledRow align='middle' justify='center'>
      <Col span={24}>
        <TitleStyled
          level={5}
          color={screenSize?.dynamicWidth < 1024 ? darkPallete.white : "#000"}
        >
          {hasntRooms?.errorMessage}
        </TitleStyled>
      </Col>

      <Col span={24}>
        <CreateRoomButton
          color={darkPallete.white}
          backgroundcolor={darkPallete.lightblue}
          margin='0 0 0 0'
        />
      </Col>
    </StyledRow>
  );
};

export default NoProjectInfo;
