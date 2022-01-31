import React from "react";
import { Icons } from "../../../../antd_components";
import { ArrowContainer } from "./styles";

const HomeArrow = () => (
  <ArrowContainer onClick={() => {
    document
      .getElementById("rooms")
      .scrollIntoView({ behavior: "smooth", block: "center" });
  }}>
    <Icons.DownOutlined
      style={{ color: "#fff", fontSize: "30pt", cursor: "pointer" }}
    />
  </ArrowContainer>
);

export default HomeArrow;
