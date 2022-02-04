import styled from "styled-components";

export const HeaderContainer = styled.div`
  background-color: ${({ solidHeader }) =>
    solidHeader ? "#000" : "transparent"};
  position: fixed;
  z-index: 9999;
  width: 100%;
  transition: all 0.3s;
`;
