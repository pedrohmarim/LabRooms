import styled from "styled-components";
import {
  Layout,
  Row as RowStyled,
  Card as CardStyled,
  Col,
} from "../../antd_components";

export const ProfileContainer = styled(Layout)`
  margin: 25px 105px 25px 25px;
  background-color: #000;
`;

export const Row = styled(RowStyled)`
  height: 100%;
  width: 100%;
`;

export const Card = styled(CardStyled)`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;

  .ant-card-head-title {
    padding-top: 5px;
  }
`;

export const LeftFormContainer = styled(Col)`
  height: 100%;
  padding: 10px;
  background-color: #000;
`;

export const RightFormContainer = styled(Col)`
  height: 100%;
  background-color: #000;
  padding: 10px;
`;

export const RoomContainer = styled.div`
  background-color: #eee;
  width: 100%;
  padding: 10px 20px 0 20px;
  border-radius: 10px;
`;
