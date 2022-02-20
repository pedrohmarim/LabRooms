import styled from "styled-components";

export const HeaderContainer = styled.div`
  background-color: ${({ solidHeader }) =>
    solidHeader ? "#000" : "transparent"};
  position: fixed;
  z-index: 900;
  width: 100%;
  transition: all 0.3s;
`;

export const MenuLabelItem = styled.div`
  margin-left: 5px;
  margin-top: 3px;
`;
