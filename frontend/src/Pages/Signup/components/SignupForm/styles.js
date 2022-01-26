import styled from "styled-components";
import { Card } from "../../../../antd_components";

export const SignFormContainer = styled(Card)`
  width: 65%;
  height: auto;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
export const SignForm = styled.div`
  height: auto;
  display: grid;
  grid-template-columns: 50% 50%;
`;
