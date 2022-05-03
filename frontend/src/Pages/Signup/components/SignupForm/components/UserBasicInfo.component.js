import React from "react";
import { FormItem } from "../Signup.form.styled";
import { FeatherIcons, Input, InputMask } from "../../../../../antd_components";
import { validateBr } from "js-brasil";
import { StyledButton } from "../Signup.form.styled";
import Recaptcha from "../../../../../GlobalComponents/Recaptcha/Recaptcha.component";
import { StyledRow } from "../../../../CreateRoom/CreateRoom.styled";

const UserBasicInfo = ({
  validateInput,
  darkPallete,
  recaptchaRef,
  setCaptcha,
  captcha,
}) => {
  const styleInput = {
    borderRadius: "8px",
    padding: "8px",
    marginBottom: "4px",
    marginTop: "-5px",
  };

  return (
    <>
      <FormItem
        label='Nome completo'
        name='username'
        rules={[{ required: true, message: "Campo obrigatório." }]}
      >
        <Input
          style={styleInput}
          allowClear
          prefix={<FeatherIcons icon='user' size={15} />}
          placeholder='Nome completo'
        />
      </FormItem>

      <FormItem
        label='E-mail'
        name='email'
        rules={[
          { required: true, message: "Campo obrigatório." },
          { type: "email", message: "E-mail inválido." },
        ]}
        help={validateInput?.field === "email" ? validateInput.message : null}
        validateStatus={validateInput?.field === "email" ? "error" : null}
      >
        <Input
          style={styleInput}
          allowClear
          prefix={<FeatherIcons icon='mail' size={15} />}
          placeholder='E-mail'
        />
      </FormItem>

      <FormItem
        label='CPF'
        name='cpf'
        rules={[
          { required: true, message: "Campo obrigatório." },
          () => ({
            validator(_, value) {
              if (!value || validateBr.cpf(value)) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("CPF Inválido."));
            },
          }),
        ]}
        help={validateInput?.field === "cpf" ? validateInput.message : null}
        validateStatus={validateInput?.field === "cpf" ? "error" : null}
      >
        <InputMask
          mask='111.111.111-11'
          style={styleInput}
          allowClear
          prefix={<FeatherIcons icon='credit-card' size={15} />}
          placeholder='CPF'
        />
      </FormItem>

      <FormItem
        label='Senha'
        name='password'
        rules={[
          { required: true, message: "Campo obrigatório." },
          {
            type: "string",
            min: 6,
            message: "Senha deve possuir no mínimo 6 caracteres.",
          },
        ]}
      >
        <Input.Password
          style={styleInput}
          allowClear
          prefix={<FeatherIcons icon='lock' size={15} />}
          iconRender={(visible) =>
            visible ? (
              <FeatherIcons icon='eye' size={15} />
            ) : (
              <FeatherIcons icon='eye-off' size={15} />
            )
          }
          placeholder='Senha'
        />
      </FormItem>

      <FormItem
        label='Confirmar Senha'
        name='confirmPassword'
        rules={[
          { required: true, message: "Campo obrigatório." },
          {
            type: "string",
            min: 6,
            message: "Senha deve possuir no mínimo 6 caracteres.",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Senhas não coincidem."));
            },
          }),
        ]}
      >
        <Input.Password
          style={styleInput}
          allowClear
          prefix={<FeatherIcons icon='lock' size={15} />}
          iconRender={(visible) =>
            visible ? (
              <FeatherIcons icon='eye' size={15} />
            ) : (
              <FeatherIcons icon='eye-off' size={15} />
            )
          }
          placeholder='Confirmar Senha'
        />
      </FormItem>

      <StyledRow justify='center'>
        <Recaptcha
          verifyCallback={(verified) => setCaptcha(verified)}
          ref={recaptchaRef}
        />
      </StyledRow>

      <StyledButton
        height='45px'
        margin='5px 0 0 0'
        disabled={!captcha}
        backgroundcolor={captcha && darkPallete.lightblue}
        type='primary'
        htmlType='submit'
      >
        Confirmar
      </StyledButton>
    </>
  );
};
export default UserBasicInfo;
