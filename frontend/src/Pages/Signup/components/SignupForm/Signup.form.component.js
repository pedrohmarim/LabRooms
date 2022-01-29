import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Icons,
  Input,
  Button,
  Notification,
  InputMask,
} from "../../../../antd_components";
import { FormItem } from "./Signup.form.styled";
import { darkPallete } from "../../../../styles/pallete";
import * as SignUpService from "../../services/signup.service";
import Swal from "sweetalert2";

const SignUpForm = () => {
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

    SignUpService.userRegister(dto).then((res) => {
      const { message, success, unknow } = res.data;

      if (!success && !unknow) {
        setValidateInput(res.data);
        Notification.open({
          type: "error",
          message: "Erro",
          description: message,
        });
      } else if (success && !unknow) {
        setValidateInput(null);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
        });

        Toast.fire({
          icon: "success",
          title: message,
        }).then(() => {
          navigate("/signin");
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
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <Input
          style={styleInput}
          allowClear
          prefix={<Icons.UserOutlined />}
          placeholder='Nome completo'
        />
      </FormItem>

      <FormItem
        label='E-mail'
        name='email'
        rules={[
          { required: true, message: "Campo obrigatório" },
          { type: "email", message: "E-mail inválido" },
        ]}
      >
        <Input
          style={styleInput}
          allowClear
          prefix={<Icons.MailOutlined />}
          placeholder='E-mail'
        />
      </FormItem>

      <FormItem
        label='CPF'
        name='cpf'
        rules={[{ required: true, message: "Campo obrigatório" }]}
        help={validateInput ? validateInput.message : null}
        validateStatus={validateInput ? "error" : null}
      >
        <InputMask
          mask='111.111.111-11'
          style={styleInput}
          allowClear
          prefix={<Icons.CreditCardOutlined />}
          placeholder='CPF'
        />
      </FormItem>

      <FormItem
        label='Senha'
        name='password'
        rules={[
          { required: true, message: "Campo obrigatório" },
          {
            type: "string",
            min: 6,
            message: "Senha deve possuir no mínimo 6 caracteres",
          },
        ]}
      >
        <Input.Password
          style={styleInput}
          allowClear
          prefix={<Icons.LockOutlined />}
          iconRender={(visible) =>
            visible ? <Icons.EyeTwoTone /> : <Icons.EyeInvisibleOutlined />
          }
          placeholder='Senha'
        />
      </FormItem>

      <FormItem
        label='Confirmar Senha'
        name='confirmPassword'
        rules={[
          { required: true, message: "Campo obrigatório" },
          {
            type: "string",
            min: 6,
            message: "Senha deve possuir no mínimo 6 caracteres",
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
          prefix={<Icons.LockOutlined />}
          iconRender={(visible) =>
            visible ? <Icons.EyeTwoTone /> : <Icons.EyeInvisibleOutlined />
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
