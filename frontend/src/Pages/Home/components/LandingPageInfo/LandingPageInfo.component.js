import React from "react";
import { InfoContainer, StyledTitle } from "./styles";
import SearchInput from "../../../../GlobalComponents/SearchInput/SearchInput.component";

const LandingPageInfo = ({ pallete, intoRooms }) => (
  <InfoContainer span={window.innerWidth > 1024 ? 8 : 20}>
    <StyledTitle color={pallete.white}>Conecte-se com o mundo</StyledTitle>

    <StyledTitle level={3} color={pallete.white} marginbottom='15px'>
      Navegue por salas que pessoas estão conversando sobre assuntos que te
      interessam.
    </StyledTitle>

    <SearchInput
      background={pallete.white}
      color={pallete.lightblue}
      onSearch={(e) => {
        e.target.value && intoRooms(e.target.value);
      }}
      fromLandingPage
    />
  </InfoContainer>
);

export default LandingPageInfo;
