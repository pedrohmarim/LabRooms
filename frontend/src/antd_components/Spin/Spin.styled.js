import styled from "styled-components";
import { Spin as AntDesignSpin } from "antd";

export const Spin = styled(AntDesignSpin)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  color: ${({ color }) => color};
  background-color: ${({ backgroundcolor }) => backgroundcolor};
`;
