import styled from "styled-components";
import { Menu as MenuStyled, Layout } from "../../antd_components";

const { Sider } = Layout;

export const Menu = styled(MenuStyled)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: solid 1px rgba(255, 255, 255, 0.1);
  background-color: #000;
  color: ${({ color }) => color};
`;
export const SiderStyled = styled(Sider)`
  height: 100vh;
  position: fixed;
  z-index: 999;
`;
