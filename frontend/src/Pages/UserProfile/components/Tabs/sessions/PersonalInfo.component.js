import React from "react";
import { StyledCol, StyledButton } from "../../../UserProfile.component.styled";
import { validateBr } from "js-brasil";
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

const SocialRegister = ({
  invalidInfo,
  editMode,
  viewMode,
  styleInput,
  darkPallete,
  setEditMode,
}) => {
  const { Title } = Typography;

  return (
    <>
      {!viewMode && (
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
      )}

      <Row gutter={window.innerWidth < 1024 ? 0 : [16, 16]}>
        <Col span={window.innerWidth < 1024 ? 24 : 8}>
          <Form.Item
            rules={
              !viewMode && [{ required: true, message: "Campo obrigatório." }]
            }
            name='username'
            label={
              <Typography>
                <b>Nome Completo</b>
              </Typography>
            }
          >
            <Input
              className={viewMode && "disabled"}
              tabIndex={viewMode && "-1"}
              readOnly={viewMode}
              disabled={!editMode && !viewMode}
              style={styleInput}
              placeholder='Nome Completo'
            />
          </Form.Item>
        </Col>

        <Col span={window.innerWidth < 1024 ? 24 : 8}>
          <Form.Item
            help={invalidInfo?.field === "email" ? invalidInfo.message : null}
            validateStatus={invalidInfo?.field === "email" ? "error" : null}
            rules={
              !viewMode && [
                { required: true, message: "Campo obrigatório." },
                { type: "email", message: "E-mail inválido." },
              ]
            }
            name='email'
            label={
              <Typography>
                <b>E-mail</b>
              </Typography>
            }
          >
            <Input
              className={viewMode && "disabled"}
              tabIndex={viewMode && "-1"}
              readOnly={viewMode}
              disabled={!editMode && !viewMode}
              style={styleInput}
              placeholder='E-mail'
            />
          </Form.Item>
        </Col>

        <Col span={window.innerWidth < 1024 ? 24 : 8}>
          <Form.Item
            help={invalidInfo?.field === "cpf" ? invalidInfo.message : null}
            validateStatus={invalidInfo?.field === "cpf" ? "error" : null}
            rules={
              !viewMode && [
                { required: true, message: "Campo obrigatório." },
                () => ({
                  validator(_, value) {
                    if (!value || validateBr.cpf(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("CPF Inválido."));
                  },
                }),
              ]
            }
            name='cpf'
            label={
              <Typography>
                <b>CPF</b>
              </Typography>
            }
          >
            <InputMask
              tabIndex={viewMode && "-1"}
              className={viewMode && "disabled"}
              disabled={!editMode && !viewMode}
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
              tabIndex={viewMode && "-1"}
              className={viewMode && "disabled"}
              readOnly={viewMode}
              disabled={!editMode && !viewMode}
              style={styleInput}
              placeholder='Biografia'
            />
          </Form.Item>
        </Col>

        <Col span={window.innerWidth < 1024 ? 24 : 8}>
          <Form.Item
            name='phone'
            rules={[
              () => ({
                validator(_, value) {
                  if (!value || validateBr.telefone(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Telefone Inválido."));
                },
              }),
            ]}
            label={
              <Typography>
                <b>Telefone Fixo</b>
              </Typography>
            }
          >
            <InputMask
              tabIndex={viewMode && "-1"}
              className={viewMode && "disabled"}
              disabled={!editMode && !viewMode}
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
            rules={[
              () => ({
                validator(_, value) {
                  if (!value || validateBr.celular(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Celular Inválido."));
                },
              }),
            ]}
            label={
              <Typography>
                <b>Celular</b>
              </Typography>
            }
          >
            <InputMask
              className={viewMode && "disabled"}
              tabIndex={viewMode && "-1"}
              disabled={!editMode && !viewMode}
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
