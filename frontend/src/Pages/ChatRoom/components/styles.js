import styled from "styled-components";
import {
  Layout as LayoutStyled,
  Button,
  Typography,
  Row,
} from "../../../antd_components";

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

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ChatStyled = styled.div`
  display: flex;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  justify-content: center;
  padding: 15px;
  margin: 10px 15px 0 0;
  text-align: center;
  background-color: ${({ background }) => background};

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
  }
`;

export const Message = styled.div`
  text-align: left;
  border-radius: 8px;
  background-color: lightblue;
  width: fit-content;
  max-width: 420px;
  padding: 8px;
`;

export const HourMessage = styled.p`
  font-size: 8pt;
  height: 11px;
  text-align: right;
  margin: 0;
  padding: 0;
`;

export const MessageOwner = styled(Row)`
  font-size: 0.9vw;
  font-weight: bold;
  color: ;
`;

export const TextMessage = styled(Row)`
  font-size: 0.9vw;
`;
