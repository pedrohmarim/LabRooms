import React from "react";
import { StyledCol, StyledButton } from "../../../UserProfile.component.styled";
import {
  Col,
  Row,
  Typography,
  Form,
  Input,
  InputMask,
  FeatherIcons,
  Tooltip,
} from "../../../../../antd_components";

const SocialRegister = ({ editMode, styleInput, darkPallete, setEditMode }) => {
  const { Title } = Typography;

  return (
    <>
      <Row>
        <StyledCol span={24} marginbottom='0 0 15px 0'>
          <Row justify='space-between'>
            <Title level={4}>Informações Pessoais</Title>
            <Tooltip
              color={darkPallete.lightblue}
              title='Editar Perfil'
              defaultVisible={window.innerWidth < 1024}
            >
              <StyledButton
                backgroundcolor='transparent'
                icon={<FeatherIcons icon='edit' />}
                onClick={() => setEditMode(true)}
              />
            </Tooltip>
          </Row>
        </StyledCol>
      </Row>

      <Row gutter={window.innerWidth < 1024 ? 0 : [16, 16]}>
        <Col span={window.innerWidth < 1024 ? 24 : 8}>
          <Form.Item
            rules={[{ required: true, message: "Campo obrigatório." }]}
            name='username'
            label={
              <Typography>
                <b>Nome Completo</b>
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
                <b>E-mail</b>
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
                <b>CPF</b>
              </Typography>
            }
          >
            <InputMask
              disabled={!editMode}
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
                <b>Biografia</b>
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
                <b>Telefone Fixo</b>
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
                <b>Celular</b>
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
    </>
  );
};

export default SocialRegister;