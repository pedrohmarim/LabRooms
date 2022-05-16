import styled from "styled-components";
import { LoadingOutlined as LoadingOutlinedStyled } from "@ant-design/icons";

export const LoadingOutlined = styled(LoadingOutlinedStyled)`
  margin: ${({ margin }) => margin};
  color: ${({ color }) => color};
  font-size: 15pt;
`;
