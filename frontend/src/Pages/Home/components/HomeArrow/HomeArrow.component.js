import React from "react";
import { Icons } from "../../../../antd_components";
import { ArrowContainer } from "./styles";

const HomeArrow = ({ intoRooms }) => (
  <ArrowContainer onClick={intoRooms}>
    <Icons.DownOutlined
      style={{ color: "#fff", fontSize: "30pt", cursor: "pointer" }}
    />
  </ArrowContainer>
);

export default HomeArrow;
