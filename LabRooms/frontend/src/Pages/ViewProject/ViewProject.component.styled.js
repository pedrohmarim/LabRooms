import styled from "styled-components";
import { Layout as LayoutStyled, Typography, Collapse } from "antd";

const { Header } = LayoutStyled;

export const HeaderStyled = styled(Header)`
  background-color: transparent;
  padding: 0;
  height: fit-content;
  max-width: 100%;
  word-break: break-all;
`;

export const ProjectTitle = styled(Typography)`
  color: ${({ color }) => color};
  margin: ${({ margin }) => margin};
  font-size: 20pt;
`;

export const ProjectDescription = styled.div`
  margin-top: ${({ margintop }) => margintop};
  background-color: #fff;
  padding: 10px 15px;
  width: 100%;
  border-radius: 4px;
`;

export const ModalButton = styled.span`
  margin: 1px 0 0 5px;
`;

export const HourPriceContainer = styled.span`
  margin: 1px 0 0 5px;
  float: right;
  color: #fff;
  font-size: 14pt;
`;

export const Price = styled.span`
  padding: 5px;
  border: solid 1px #fff;
  background-color: rgba(191, 191, 191, 0.3);
`;

export const Layout = styled(LayoutStyled)`
  margin: 90px 15px 20px 25px;
  background-color: transparent;
`;

export const CategoryText = styled.span`
  margin-left: 5px;
`;

export const RoomCategory = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ color }) => color};
`;

export const ViewProjectContainer = styled.div`
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
