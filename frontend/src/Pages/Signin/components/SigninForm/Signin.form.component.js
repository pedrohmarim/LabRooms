import React from "react";
import { Form, Icons, Input, Button, Checkbox } from "../../../../antd_components";
import { FormItem } from "../../../Signup/components/SignupForm/Signup.form.styled"
import { Link } from "react-router-dom";
import { darkPallete } from "../../../../styles/pallete";

const SigninForm = () => {

  const styleInput = {
    borderRadius: "8px",
    padding: "8px",
    marginBottom: "4px",
    marginTop: "-5px",
  };

  return (
    <Form layout='vertical' initialValues={{ remember: true }}>
      <FormItem
        label='E-mail'
        name='email'
        rules={[{ required: true, message: "Campo obrigatório" }, { type: "email", message: "E-mail inválido" },]}
      >
        <Input
          style={styleInput}
          allowClear
          prefix={<Icons.MailOutlined />}
          placeholder='E-mail'
        />
      </FormItem>
      
      <FormItem
        label='Senha'
        name='password'
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <Input.Password
          style={styleInput}
          allowClear
          prefix={<Icons.LockOutlined />}
          iconrRender={(visible) =>
            visible ? <Icons.EyeTwoTone /> : <Icons.EyeInvisibleOutlined />
          }
          placeholder='Senha'
        />
      </FormItem>

      <Form.Item name="remember" valuePropName="checked" style={{ float: 'right' }}>
        <Checkbox>Lembrar senha</Checkbox>
      </Form.Item>

      <Button
        style={{
          width: "100%",
          height: "45px",
          borderRadius: "8px",
          margin: "-15px 0 5px 0",
          background: darkPallete.lightblue,
        }}
        type='primary'
        htmlType='submit'
      >
        Confirmar
      </Button>
          
      <span>
        ou{' '}
        <Link to='/signup' style={{ color: '#1890ff'}}>
          <span>Crie uma conta</span>
        </Link>
      </span>
    </Form>
  );
};

export default SigninForm;
