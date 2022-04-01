import React from "react";
import { StyledCol } from "../../../UserProfile.component.styled";
import {
  Col,
  Row,
  Typography,
  Form,
  Input,
} from "../../../../../antd_components";

const SocialRegister = ({ editMode, styleInput }) => {
  const { Title } = Typography;

  return (
    <>
      <Row>
        <StyledCol span={24} marginbottom='0 0 15px 0'>
          <Row justify='space-between'>
            <Title level={4}>Habilidades</Title>
          </Row>
        </StyledCol>
      </Row>
    </>
  );
};

export default SocialRegister;
