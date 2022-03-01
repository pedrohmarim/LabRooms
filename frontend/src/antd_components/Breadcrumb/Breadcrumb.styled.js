import { Breadcrumb as BreadcrumbStyled } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Breadcrumb = styled(BreadcrumbStyled)`
  .ant-breadcrumb-separator {
    color: ${({ color }) => color};
  }
`;

export const StyledLink = styled(Link)`
  color: ${({ color }) => color} !important;
`;
