import styled from "styled-components";

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  font-size: 15pt;
  color: ${({ color }) => color};
  background-color: ${({ backgroundcolor }) => backgroundcolor};
`;

export const SpanNotFound = styled.p`
  position: absolute;
  display: flex;
  margin-top: 20%;
  font-size: 1.5vw;

  @media (max-width: 1024px) {
    margin-top: 45%;
    font-size: 5vw;
  }
`;
