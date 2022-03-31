import styled from "styled-components";
import { Card } from "../../antd_components";

export const CenterForm = styled.div`
  width: 100%;
  display: flex;
  max-height: 50%;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 1024px) {
    height: 100vh !important;
  }
  @media screen and (min-width: 1024px) and (min-height: 800px) {
    height: 100vh !important;
  }
`;

export const SignFormContainer = styled(Card)`
  border-radius: 5px;
  background-color: #eeeeee;
  margin-bottom: 50px;
  width: 90%;

  @media screen and (min-width: 1024px) {
    width: 40%;
  }
`;

export const FormHeader = styled.div`
  margin: ${({ margin }) => margin};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
