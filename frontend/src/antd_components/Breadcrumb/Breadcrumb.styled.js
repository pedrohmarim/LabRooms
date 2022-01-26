import { Breadcrumb as BreadcrumbStyled } from "antd";
import styled from "styled-components";

export const Breadcrumb = styled(BreadcrumbStyled)`
  .ant-breadcrumb-separator {
    color: ${({ color }) => color};
  }
`;
