import React from "react";
import { FeatherIcons } from "../../../../antd_components";
import { ArrowContainer } from "./styles";

const HomeArrow = () => (
  <ArrowContainer
    onClick={() => {
      document
        .getElementById("rooms")
        .scrollIntoView({ behavior: "smooth", block: "center" });
    }}
  >
    <FeatherIcons icon='downoutlined' />
  </ArrowContainer>
);

export default HomeArrow;
