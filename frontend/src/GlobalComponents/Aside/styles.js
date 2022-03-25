import styled from "styled-components";
import { Menu as MenuStyled, Layout } from "../../antd_components";

const { Sider } = Layout;

export const Menu = styled(MenuStyled)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: solid 1px rgba(255, 255, 255, 0.1);
  background-color: #000 !important;
  color: ${({ color }) => color};

  .ant-menu-item {
    color: ${({ color }) => color};
  }

  .ant-menu-item:hover {
    color: ${({ color }) => color} !important;
    background-color: rgba(255, 255, 255, 0.1) !important;
  }

  .ant-menu-item-selected {
    background-color: rgba(255, 255, 255, 0.1) !important;
  }
`;

export const SiderStyled = styled(Sider)`
  height: 100vh;
  position: relative;
  z-index: 999;
`;

export const MenuItem = styled(MenuStyled.Item)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 !important;
`;

export const AsideLogo = styled.img`
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
`;
