import styled from "styled-components";
import { Typography, Input } from "../../antd_components";

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
