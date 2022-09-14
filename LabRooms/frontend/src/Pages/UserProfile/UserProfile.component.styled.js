import styled from "styled-components";
import {
  Row as RowStyled,
  Card as CardStyled,
  Col,
  Form,
  Typography,
  Divider,
  Button,
} from "../../antd_components";

const { Title } = Typography;

export const Row = styled(RowStyled)`
  height: 100%;
  width: 100%;
`;

export const Card = styled(CardStyled)`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.4);
    border-radius: 5px;
  }
  .ant-card-head {
    margin-bottom: 0;
  }

  .ant-card-head-title {
    padding-top: 5px;
  }

  @media screen and (max-width: 1024px) {
    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.4);
      border-radius: 5px;
    }

    overflow-x: hidden;
    height: 100%;
    background-color: transparent;

    .ant-card-body {
      padding: 0 0 10px 0;
    }
  }
`;

export const FormContainer = styled(Col)`
  height: 95vh;
  background-color: transparent;
  padding: ${({ padding }) => padding};

  @media screen and (max-width: 1024px) {
    padding: 0px;
    height: 100%;
  }

  .ant-tabs-nav-list {
    color: ${({ tabcolor }) => tabcolor} !important;
  }
`;

export const RoomContainer = styled.div`
  background-color: #eee;
  width: 100%;
  padding: 10px 20px 10px 20px;
  border-radius: 10px;

  @media screen and (max-width: 1024px) {
    margin-bottom: 15px;
  }
`;

export const StyledBreadCrumb = styled(Col)`
  @media screen and (max-width: 1024px) {
    margin: 15px 0 0 40px;
  }
`;

export const FormStyled = styled(Form)`
  @media screen and (max-width: 1024px) {
    background-color: ${({ background }) => background} !important;
    padding: 15px;
    border-radius: 5px;
  }
`;

export const SocialIcon = styled.a`
  font-size: 20pt;
  margin: 0 0 0 10px;

  :nth-child(1) {
    margin: 0;
  }
`;

export const TitleStyled = styled(Title)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: flex;
  padding: 0 !important;
  margin: 0 !important;
  align-items: center;
`;

export const EllipsisTitle = styled.div`
  @media screen and (max-width: 1024px) {
    width: ${({ width }) => width};
  }
`;

export const CategoryInfo = styled.i`
  color: gray;
  margin-left: 4px;
`;

export const StyledCol = styled(Col)`
  margin: ${({ margin }) => margin};
  text-align: center;
`;

export const UserInfoTitle = styled(Title)`
  color: #000;

  @media screen and (max-width: 1024px) {
    color: #fff !important;
  }
`;

export const UserInfoSpan = styled(Typography)`
  color: #a0acbc;
  font-size: 10pt;
  margin-top: 10px;

  @media screen and (max-width: 1024px) {
    text-align: center;
    color: ${({ color }) => color} !important;
  }
`;

export const UserInfoBio = styled(Typography)`
  color: #a0acbc;

  @media screen and (max-width: 1024px) {
    color: ${({ color }) => color} !important;
  }
`;

export const StyledButton = styled(Button)`
  @media screen and (max-width: 1024px) {
    margin: ${({ margin }) => margin} !important;
    background-color: ${({ backgroundcolor }) => backgroundcolor} !important;
  }
`;

export const StyledDivider = styled(Divider)`
  border: solid 1px rgba(191, 191, 191, 0.7);
  margin: 0;
  display: initial;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

export const CreateRoom = styled(Divider)`
  border: solid 1px rgba(191, 191, 191, 0.7);
  margin: 0;
  display: initial;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

export const StyledOption = styled.span`
  margin-left: 5px;
  position: relative;
  top: -3px;

  @media screen and (max-width: 1024px) {
    top: -4px;
  }
`;

export const StyledRow = styled(Row)`
  width: 100%;
  text-align: center;
`;

export const StyledSocial = styled.span`
  margin: 2px 0 0 2px;
`;

export const SocialContainer = styled(Typography)`
  align-items: center;
  display: flex;
`;

export const CardItem = styled(Row)`
  background-color: white;
  overflow: auto;
  width: fit-content !important;
`;

export const DashboardCard = styled(Row)`
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  min-width: 220px;
  max-width: 220px;
  margin-top: 15px;
`;

export const CategorySpan = styled.span`
  font-size: 10pt;
  margin-left: 5px;
  color: gray;
`;
