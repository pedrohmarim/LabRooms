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
            <Title level={4}>Redes Sociais</Title>
          </Row>
        </StyledCol>
      </Row>

      <Row gutter={window.innerWidth < 1024 ? 0 : [16, 16]}>
        <Col span={window.innerWidth < 1024 ? 24 : 8}>
          <Form.Item
            name='facebook'
            rules={[{ type: "url", message: "URL inválida." }]}
            label={
              <Typography>
                <b>Facebook</b>
              </Typography>
            }
          >
            <Input
              disabled={!editMode}
              style={styleInput}
              placeholder='www.facebook.com/user'
            />
          </Form.Item>
        </Col>

        <Col span={window.innerWidth < 1024 ? 24 : 8}>
          <Form.Item
            name='instagram'
            rules={[{ type: "url", message: "URL inválida." }]}
            label={
              <Typography>
                <b>Instagram</b>
              </Typography>
            }
          >
            <Input
              disabled={!editMode}
              style={styleInput}
              placeholder='www.instagram.com/user'
            />
          </Form.Item>
        </Col>

        <Col span={window.innerWidth < 1024 ? 24 : 8}>
          <Form.Item
            rules={[{ type: "url", message: "URL inválida." }]}
            name='twitter'
            label={
              <Typography>
                <b>Twitter</b>
              </Typography>
            }
          >
            <Input
              disabled={!editMode}
              Mask
              style={styleInput}
              placeholder='www.twitter.com/user'
              mask='111.111.111-11'
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={window.innerWidth < 1024 ? 0 : [16, 16]}>
        <Col span={window.innerWidth < 1024 ? 24 : 8}>
          <Form.Item
            name='linkedin'
            rules={[{ type: "url", message: "URL inválida." }]}
            label={
              <Typography>
                <b>LinkedIn</b>
              </Typography>
            }
          >
            <Input
              disabled={!editMode}
              style={styleInput}
              placeholder='www.linkedin.com/user'
            />
          </Form.Item>
        </Col>

        <Col span={window.innerWidth < 1024 ? 24 : 8}>
          <Form.Item
            name='github'
            rules={[{ type: "url", message: "URL inválida." }]}
            label={
              <Typography>
                <b>Github</b>
              </Typography>
            }
          >
            <Input
              disabled={!editMode}
              style={styleInput}
              placeholder='www.github.com/user'
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default SocialRegister;
