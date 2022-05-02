import styled from "styled-components";
import { Typography, Input, Form as StyledForm, Row } from "../../antd_components";

const { Title } = Typography;

export const TitleStyled = styled(Title)`
  margin-bottom: 0px !important;
`;

export const CategoryTitle = styled.span`
  margin: 2px 0 0 5px;
`;

export const CategoryInfo = styled.i`
  color: gray;
`;

export const StyledInput = styled(Input)`
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 4px;
  margin-top: -5px;
`;

export const Form = styled(StyledForm)`
  max-height: 550px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 10px;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.4);
    border-radius: 5px;
  }
`;

export const StyledRow = styled(Row)`
  transform: scale(0.85)
`;
