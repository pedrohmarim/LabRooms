import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

export const Loading = (color) => (
  <>
    <LoadingOutlined style={{ marginRight: "5px", color: color }} />
    <span style={{ color: color }}>Carregando...</span>
  </>
);
