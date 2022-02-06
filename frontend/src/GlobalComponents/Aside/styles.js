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

  .ant-menu-item {
    color: ${({ color }) => color};
    background-color: #000;
  }

  .ant-menu-item:hover {
    color: ${({ color }) => color} !important;
    background-color: rgba(255, 255, 255, 0.1) !important;
  }

  .ant-menu-item-selected {
    background-color: #000 !important;
  }
  .ant-menu-item-only-child {
  }
`;

export const SiderStyled = styled(Sider)`
  background-color: #000;
  height: 100vh;
  position: relative;
  z-index: 999;
`;

export const MenuItem = styled(MenuStyled.Item)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
