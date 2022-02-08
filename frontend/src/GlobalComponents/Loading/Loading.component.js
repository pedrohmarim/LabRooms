import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { darkPallete } from "../../styles/pallete";

export const Loading = (
  <>
    <LoadingOutlined style={{ marginRight: "5px", color: darkPallete.white }} />
    <span style={{ color: darkPallete.white }}>Carregando...</span>
  </>
);
