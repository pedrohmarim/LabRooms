import styled from "styled-components";
import { Link } from "react-router-dom";

export const LinkStyled = styled(Link)`
  color: #1890ff;
  margin-left: ${({ marginleft }) => marginleft} !important;
`;
