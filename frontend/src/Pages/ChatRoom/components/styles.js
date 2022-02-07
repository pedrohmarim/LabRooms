import styled from "styled-components";
import { Layout as LayoutStyled, Button, Typography } from "../../../antd_components";

const { Sider } = LayoutStyled;
const { Title } = Typography;

export const SiderStyled = styled(Sider)`
  background-color: ${({ background }) => background};
  display: flex;
  justify-content: center;
  padding: 10px;
  color: ${({ color }) => color};

  .ant-layout-sider-children {
    overflow-y: scroll;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      width: 4px;
    }

    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 5px;
    }
  }
`;

export const RoomInfoContainer = styled.span`
  padding-bottom: 5px;
  border-bottom: solid 1px rgba(255, 255, 255, 0.1);
  margin-right: 15px;
  display: flex;
  align-items: center;
  display: grid;
  grid-template-columns: auto 100%;
`;

export const InfoWrapper = styled.div`
  width: 100%;
`;

export const TitleStyled = styled(Title)`
  color: ${({ color }) => color} !important;
`;

export const Layout = styled(LayoutStyled)`
  margin: 25px 120px 25px 25px;
  background-color: #000;
`;

export const RoomCategory = styled.span`
  display: flex;
  margin: 3px 80px 5px 10px;
  align-items: center;
  justify-content: space-between;
  color: ${({ color }) => color};
`;

export const CategoryText = styled.span`
  margin-left: 5px;
`;

export const ExpandButton = styled(Button)`
  padding: 0;
  height: fit-content;
`;

export const UsernameContainer = styled.span`
  margin-top: 6px;
  float: right;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 135px;
  display: block;
  overflow: hidden;
`;
