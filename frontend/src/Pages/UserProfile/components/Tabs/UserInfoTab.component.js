import React from "react";
import { Card } from "../../UserProfile.component.styled";
import {
  Col,
  Row,
  Typography,
  FeatherIcons,
  Form,
  Input,
  Divider,
} from "../../../../antd_components";
import {} from "../../UserProfile.component.styled";

const UserInfoTab = ({ darkPallete, user, token, navigate }) => {
  const { Title } = Typography;
  const styleInput = {
    borderRadius: "8px",
    padding: "8px",
    marginTop: "-3px",
  };

  return (
    <Card bordered={false}>
      <Form layout='vertical'>
        <Row align='middle'>
          <Col span={24} style={{ marginBottom: "15px" }}>
            <Row>
              <Title level={4}>Informações</Title>
            </Row>
          </Col>

          <Col span={24}>
            <Form.Item
              label={
                <Typography>
                  <span style={{ fontWeight: "bold" }}>Nome Completo</span>
                </Typography>
              }
              name='username'
            >
              <Input
                style={styleInput}
                prefix={<FeatherIcons icon='user' size={18} />}
                placeholder='Nome Completo'
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label={
                <Typography>
                  <span style={{ fontWeight: "bold" }}>Email</span>
                </Typography>
              }
              name='email'
            >
              <Input
                style={styleInput}
                prefix={<FeatherIcons icon='mail' size={18} />}
                placeholder='E-mail'
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label={
                <Typography>
                  <span style={{ fontWeight: "bold" }}>CPF</span>
                </Typography>
              }
              name='cpf'
            >
              <Input
                style={styleInput}
                prefix={<FeatherIcons icon='credit-card' size={18} />}
                placeholder='CPF'
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default UserInfoTab;
