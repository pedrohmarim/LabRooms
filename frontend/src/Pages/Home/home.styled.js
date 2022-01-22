import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 1024px) {
    #video-container {
      top: 0%;
      object-fit: cover;
      width: 100%;
      height: 100vh;
      z-index: -1;
    }
  }
`;
