import React, { useState } from "react";
import { Card } from "../../UserProfile.component.styled";
import { FormStyled } from "../../UserProfile.component.styled";
import * as UserProfileService from "../../services/UserProfile.service";
import {
  Col,
  Row,
  Typography,
  Form,
  Notification,
  Input,
  InputMask,
  Button,
  FeatherIcons,
  Tooltip,
} from "../../../../antd_components";

const UserInfoTab = ({ darkPallete, user, token, navigate }) => {
  const [editMode, setEditMode] = useState(false);
  const { Title } = Typography;

  const styleInput = {
    color: "gray",
    marginTop: "-1px",
  };

  function handleSubmit(values) {
    const { username, email, cpf, phone, celphone, biography } = values;

    const dto = { username, email, cpf, phone, celphone, biography };

    UserProfileService.UpdateUserInfo(dto, token).then(({ data }) => {
      const { message, status } = data;

      Notification.open({
        type: status === 200 ? "success" : "error",
        message,
      });

      setEditMode(false);
    });
  }

  return (
    <Card bordered={false}>
      {user && (
        <FormStyled
          background={darkPallete.white}
          onFinish={handleSubmit}
          layout='vertical'
          initialValues={{
            username: user.username,
            biography: user.biography,
            email: user.email,
            cpf: user.cpf,
            phone: user.phone,
            celphone: user.celphone,
          }}
        >
          <Row>
            <Col span={24} style={{ marginBottom: "15px" }}>
              <Row justify='space-between'>
                <Title level={4} style={{}}>
                  Informações Pessoais
                </Title>
                <Tooltip
                  color={darkPallete.lightblue}
                  title='Editar Perfil'
                  defaultVisible={window.innerWidth < 1024}
                >
                  <Button
                    backgroundcolor={window.innerWidth < 1024 && "transparent"}
                    icon={<FeatherIcons icon='edit' />}
                    onClick={() => setEditMode(true)}
                  />
                </Tooltip>
              </Row>
            </Col>
          </Row>

          <Row gutter={window.innerWidth < 1024 ? 0 : [16, 16]}>
            <Col span={window.innerWidth < 1024 ? 24 : 8}>
              <Form.Item
                rules={[{ required: true, message: "Campo obrigatório." }]}
                name='username'
                label={
                  <Typography>
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Nome Completo
                    </span>
                  </Typography>
                }
              >
                <Input
                  disabled={!editMode}
                  style={styleInput}
                  placeholder='Nome Completo'
                />
              </Form.Item>
            </Col>

            <Col span={window.innerWidth < 1024 ? 24 : 8}>
              <Form.Item
                rules={[
                  { required: true, message: "Campo obrigatório." },
                  { type: "email", message: "E-mail inválido." },
                ]}
                name='email'
                label={
                  <Typography>
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      E-mail
                    </span>
                  </Typography>
                }
              >
                <Input
                  disabled={!editMode}
                  style={styleInput}
                  placeholder='E-mail'
                />
              </Form.Item>
            </Col>

            <Col span={window.innerWidth < 1024 ? 24 : 8}>
              <Form.Item
                rules={[{ required: true, message: "Campo obrigatório." }]}
                name='cpf'
                label={
                  <Typography>
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      CPF
                    </span>
                  </Typography>
                }
              >
                <Input
                  disabled={!editMode}
                  Mask
                  style={styleInput}
                  placeholder='CPF'
                  mask='111.111.111-11'
                />
              </Form.Item>
            </Col>
          </Row>

          <Row
            gutter={window.innerWidth < 1024 ? 0 : [16, 16]}
            justify='space-between'
          >
            <Col span={window.innerWidth < 1024 ? 24 : 8}>
              <Form.Item
                name='biography'
                label={
                  <Typography>
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Biografia
                    </span>
                  </Typography>
                }
              >
                <Input
                  disabled={!editMode}
                  style={styleInput}
                  placeholder='Biografia'
                />
              </Form.Item>
            </Col>

            <Col span={window.innerWidth < 1024 ? 24 : 8}>
              <Form.Item
                name='phone'
                label={
                  <Typography>
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Telefone Fixo
                    </span>
                  </Typography>
                }
              >
                <InputMask
                  disabled={!editMode}
                  Mask
                  autoComplete='off'
                  mask='(11) 1111-1111'
                  style={styleInput}
                  placeholder='Telefone Fixo'
                />
              </Form.Item>
            </Col>

            <Col span={window.innerWidth < 1024 ? 24 : 8}>
              <Form.Item
                name='celphone'
                label={
                  <Typography>
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Celular
                    </span>
                  </Typography>
                }
              >
                <InputMask
                  disabled={!editMode}
                  Mask
                  autoComplete='off'
                  mask='(11) 11111-1111'
                  style={styleInput}
                  placeholder='Celular'
                />
              </Form.Item>
            </Col>
          </Row>

          {editMode && (
            <Row justify='end'>
              <Button
                htmlType='submit'
                backgroundcolor={darkPallete.lightblue}
                height='35'
                width='200'
                color={darkPallete.white}
                style={{
                  marginBottom: "15px",
                }}
              >
                Confirmar
              </Button>
            </Row>
          )}
        </FormStyled>
      )}
    </Card>
  );
};

export default UserInfoTab;
