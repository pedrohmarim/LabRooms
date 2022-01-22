import styled from "styled-components";
import { Col } from "antd";

export const InfoContainer = styled(Col)`
  margin-left: 40px;
  width: 35%;

  @media screen and (max-width: 1024px) {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }
`;
