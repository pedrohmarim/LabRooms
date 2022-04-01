import styled from "styled-components";
import { Layout, Typography } from "antd";

const { Header } = Layout;

export const HeaderStyled = styled(Header)`
  background-color: transparent;
  padding: 0;
  height: fit-content;
  width: fit-content;
  max-width: 70%;
  word-break: break-all;
`;

export const ProjectTitle = styled(Typography)`
  color: ${({ color }) => color};
  font-size: 20pt;
`;

export const ProjectDescription = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 15px;
  width: 100%;
  border-radius: 4px;
`;
