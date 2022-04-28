import styled from "styled-components";
import { Layout, Typography } from "antd";

const { Header } = Layout;

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
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 15px;
  width: 100%;
  border-radius: 4px;
`;

export const ModalButton = styled.span`
  margin: 1px 0 0 5px;
`;
