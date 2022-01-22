import React from "react";
import { Typography } from "../../../../antd_components";
import { InfoContainer } from "./styles";
import SearchInput from "../../../../GlobalComponents/SearchInput/SearchInput.component";

const LandingPageInfo = ({ pallete, intoRooms }) => {
  const { Title } = Typography;

  return (
    <InfoContainer span={window.innerWidth > 1024 ? 8 : 20}>
      <Title style={{ color: pallete.white }}>Conecte-se com o mundo</Title>

      <Title level={3} style={{ color: pallete.white, marginBottom: "15px" }}>
        Navegue por salas que pessoas estão conversando sobre assuntos que te
        interessam.
      </Title>

      <SearchInput
        background={pallete.white}
        color={pallete.lightblue}
        onSearch={(value) => {
          intoRooms();
          console.log(value);
        }}
        fromLandingPage
      />
    </InfoContainer>
  );
};

export default LandingPageInfo;
