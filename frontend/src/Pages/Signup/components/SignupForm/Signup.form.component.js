import React from "react";
import { Form, Icons, Input, Button, InputMask } from "../../../../antd_components";
import { FormItem } from "./Signup.form.styled";
import { darkPallete } from "../../../../styles/pallete";

const SignUpForm = () => {
  const styleInput = {
    borderRadius: "8px",
    padding: "8px",
    marginBottom: "4px",
    marginTop: "-5px",
  };

  return (
    <Form layout='vertical'>
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
      >
        <InputMask
          mask="111.111.111-11"
          style={styleInput}
          allowClear
          prefix={<Icons.CreditCardOutlined />}
          placeholder='CPF'
        />
      </FormItem>

      <FormItem
        label='Senha'
        name='password'
        rules={[{ required: true, message: "Campo obrigatório" }, { type: 'string', min: 6, message: 'Senha deve possuir no mínimo 6 caracteres' }]}
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
          { type: 'string', min: 6, message: 'Senha deve possuir no mínimo 6 caracteres' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Senhas não coincidem!'));
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
