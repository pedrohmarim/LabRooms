import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FeatherIcons,
  Input,
  Button,
  Notification,
  InputMask,
} from "../../../../antd_components";
import { FormItem } from "./Signup.form.styled";
import * as SignUpService from "../../services/signup.service";

const SignUpForm = ({ darkPallete }) => {
  const [validateInput, setValidateInput] = useState();
  let navigate = useNavigate();

  const styleInput = {
    borderRadius: "8px",
    padding: "8px",
    marginBottom: "4px",
    marginTop: "-5px",
  };

  function onSubmit(values) {
    const { cpf, email, password, username } = values;

    const dto = {
      cpf,
      email,
      password,
      username,
    };

    SignUpService.userRegister(dto).then(({ data }) => {
      const { message, success } = data;

      if (!success) {
        setValidateInput(data);
        Notification.open({
          type: "error",
          message: "Erro",
          description: message,
        });
      } else if (success) {
        setValidateInput(null);

        navigate("/signin");

        Notification.open({
          type: "success",
          message,
          style: {
            zIndex: 999,
          },
          duration: 2,
        });
      } else {
        Notification.open({
          type: "error",
          message: "Erro",
          description: message,
        });
      }
    });
  }

  return (
    <Form layout='vertical' onFinish={onSubmit}>
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
        rules={[{ required: true, message: "Campo obrigatório." }]}
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
              return Promise.reject(new Error("Senhas não coincidem!"));
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
          placeholder='Confirmar senha'
        />
      </FormItem>
      <Button
        style={{
          width: "100%",
          height: "45px",
          borderRadius: "8px",
          marginTop: "5px",
          background: darkPallete.lightblue,
        }}
        type='primary'
        htmlType='submit'
      >
        Confirmar
      </Button>
    </Form>
  );
};
export default SignUpForm;
