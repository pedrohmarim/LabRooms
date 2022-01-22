import React from "react";
import { Typography } from "../../../../antd_components";
import { InfoContainer } from "./styles";
import { darkPallete } from "../../../../styles/pallete";
import SearchInput from "../../../../GlobalComponents/SearchInput/SearchInput.component";

const landingPageInfo = () => {
  const { Title } = Typography;
  const { white, lightblue } = darkPallete;

  return (
    <InfoContainer span={window.innerWidth > 1024 ? 8 : 20}>
      <Title style={{ color: white }}>Conecte-se com o mundo</Title>

      <Title level={3} style={{ color: white }}>
        Navegue por salas que pessoas estão conversando sobre assuntos que te
        interessam.
      </Title>

      <SearchInput background={white} color={lightblue} />
    </InfoContainer>
  );
};

export default landingPageInfo;
