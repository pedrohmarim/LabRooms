import styled from "styled-components";
import {
  Layout as LayoutStyled,
  Typography,
  Row,
  Col,
  Collapse,
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
  margin-right: 15px;
  display: flex;
  align-items: center;
  display: grid;
  grid-template-columns: auto 100%;
`;

export const InfoWrapper = styled.div`
  width: 100%;
  z-index: 999;
`;

export const TitleStyled = styled(Title)`
  color: ${({ color }) => color} !important;
`;

export const Layout = styled(LayoutStyled)`
  margin: 10px 0 15px 100px;
  background-color: transparent;
`;

export const RoomDescription = styled.span`
  color: ${({ color }) => color};
  font-size: 10pt;
  font-weight: 500;
  word-break: break-all;

  &&:hover {
    color: black !important;
  }
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

export const UsernameContainer = styled.span`
  margin-top: 6px;
  float: right;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 135px;
  display: block;
  overflow: hidden;
`;

export const ChatContainer = styled(Collapse)`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: transparent;

  .ant-collapse-arrow {
    color: #fff;
    font-size: 16pt !important;
  }

  .ant-collapse-item {
    margin-right: 15px !important;
    border-color: rgba(191, 191, 191, 0.7);
  }
`;

export const ChatStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  margin: 10px 15px 0 0;
  padding-top: 15px;
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
  background-color: ${({ background }) => background};
  width: fit-content;
  height: fit-content;
  max-width: 45%;
  padding: 0.2vw 0.5vw;
  margin: 0 15px;
`;

export const HourMessage = styled(Row)`
  font-size: 0.7vw;
`;

export const MessageOwner = styled(Row)`
  font-size: 0.9vw;
  font-weight: bold;
`;

export const TextMessage = styled(Row)`
  font-size: 0.9vw;
`;

export const InputMessage = styled(Row)`
  z-index: 999;
  position: sticky;
  bottom: 0;
  margin-top: 11px;
  height: auto;
  width: 100% !important;
  margin-left: 0px !important;
  padding: 10px;
  background-color: ${({ background }) => background};
`;

export const SendMessage = styled(Col)`
  display: flex;
  padding-top: 3px;
  justify-content: center;
  height: 100%;
  background-color: ${({ background }) => background};
  border-radius: 4px;
  transition: all 0.2s;

  &&:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
