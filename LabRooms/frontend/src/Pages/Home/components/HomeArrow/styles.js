import styled from "styled-components";
import { Row } from "../../../../antd_components";

export const ArrowContainer = styled(Row)`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  animation-name: breath-animation;
  color: #fff;
  animation-duration: 1.8s;
  animation-iteration-count: infinite;
  cursor: pointer;

  @keyframes breath-animation {
    0%,
    100% {
      bottom: 90px;
    }
    50% {
      bottom: 70px;
    }
  }
`;
