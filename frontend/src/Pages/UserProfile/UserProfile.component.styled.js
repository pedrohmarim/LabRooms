import styled from "styled-components";
import {
  Layout,
  Row as RowStyled,
  Card as CardStyled,
  Col,
  Form,
} from "../../antd_components";

export const ProfileContainer = styled(Layout)`
  margin: 25px 105px 25px 25px;
  background-color: #000;

  @media screen and (max-width: 1024px) {
    width: 100%;
    margin: 0;
  }
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

  @media screen and (max-width: 1024px) {
    overflow-y: hidden;
    overflow-x: hidden;
    height: 100%;
    background-color: transparent;

    .ant-card-body {
      padding: 0 0 10px 0;
    }
  }
`;

export const LeftFormContainer = styled(Col)`
  height: 100%;
  padding: 10px;
  background-color: #000;

  @media screen and (max-width: 1024px) {
    padding: 0px;
    margin-top: 100px;
  }

  .ant-tabs-nav-list {
    color: ${({ tabcolor }) => tabcolor} !important;
  }
`;

export const RightFormContainer = styled(Col)`
  height: 100%;
  background-color: #000;
  padding: 10px;
`;

export const RoomContainer = styled.div`
  background-color: #eee;
  width: 100%;
  padding: 10px 20px 10px 20px;
  border-radius: 10px;
`;

export const StyledBreadCrumb = styled(Col)`
  @media screen and (max-width: 1024px) {
    margin: 15px 0 0 25px;
  }
`;

export const FormStyled = styled(Form)`
  @media screen and (max-width: 1024px) {
    background-color: ${({ background }) => background} !important;
    padding: 15px;
    border-radius: 5px;
  }
`;
