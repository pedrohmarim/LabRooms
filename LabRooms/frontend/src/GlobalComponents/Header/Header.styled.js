import styled from "styled-components";
import { Row } from "../../antd_components";

export const HeaderContainer = styled.div`
  background-color: ${({ solidHeader }) =>
    solidHeader ? "#000" : "transparent"};
  position: fixed;
  z-index: 1100;
  width: 100%;
  transition: all 0.3s;
  border-bottom: ${({ solidHeader }) =>
    solidHeader && "solid 1px rgba(255, 255, 255, 0.2);"};
`;

export const MenuLabelItem = styled.div`
  margin-left: 5px;
  margin-top: 3px;
`;

export const StyledRow = styled(Row)`
  padding: 0 25px;
`;
