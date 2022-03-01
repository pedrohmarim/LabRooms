import React from "react";
import { Row } from "../../antd_components";
import * as S from "./Loading.styled";

export const Loading = (color, margin) => (
  <Row align='middle'>
    <S.LoadingOutlined margin={margin} color={color} />
  </Row>
);
