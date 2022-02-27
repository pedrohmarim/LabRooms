import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Row } from "../../antd_components";

export const Loading = (color, margin) => (
  <Row align='middle'>
    <LoadingOutlined style={{ margin: margin, color, fontSize: "15pt" }} />
    <span style={{ color, marginLeft: "10px", marginTop: "5px" }}>
      Carregando...
    </span>
  </Row>
);
