import React from "react";
import { StyledRow } from "../../Pages/UserProfile/UserProfile.component.styled";
import * as S from "./Loading.styled";

export const Loading = (color, margin) => (
  <StyledRow align='middle' justify='center'>
    <S.LoadingOutlined margin={margin} color={color} />
  </StyledRow>
);
