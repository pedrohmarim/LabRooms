import React, { useState, useContext } from "react";
import * as SignUpService from "../../services/signin.service";
import { UserContext } from "../../../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Icons,
  Input,
  Button,
  Checkbox,
} from "../../../../antd_components";
import { FormItem } from "../../../Signup/components/SignupForm/Signup.form.styled";
import { Link } from "react-router-dom";
import { darkPallete } from "../../../../styles/pallete";
import Swal from "sweetalert2";

const SigninForm = () => {
  const [invalidInfo, setInvalidInfo] = useState(false);

  const { setLoggedUser } = useContext(UserContext);

  let navigate = useNavigate();

  const styleInput = {
    borderRadius: "8px",
    padding: "8px",
    marginBottom: "4px",
    marginTop: "-5px",
  };

  function onSubmit(values) {
    const { email, password } = values;

    const dto = {
      email,
      password,
    };

    SignUpService.loginUser(dto).then((res) => {
      const { user, message } = res.data;

      if (user) {
        setLoggedUser(user);
        setInvalidInfo(false);
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
          navigate("/");
        });
      } else {
        setInvalidInfo(true);
      }
    });
  }

  return (
    <Form
      layout='vertical'
      initialValues={{ remember: true }}
      onFinish={onSubmit}
    >
      <FormItem
        label='E-mail'
        name='email'
        rules={[
          { required: true, message: "Campo obrigatório" },
          { type: "email", message: "E-mail inválido" },
        ]}
        help={invalidInfo ? "E-mail inválido" : null}
        validateStatus={invalidInfo ? "error" : null}
      >
        <Input
          style={styleInput}
          allowClear
          prefix={<Icons.MailOutlined />}
          placeholder='E-mail'
        />
      </FormItem>

      <FormItem
        help={invalidInfo ? "Senha inválida" : null}
        validateStatus={invalidInfo ? "error" : null}
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

      <Form.Item
        name='remember'
        valuePropName='checked'
        style={{ float: "right" }}
      >
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
        ou{" "}
        <Link to='/signup' style={{ color: "#1890ff" }}>
          <span>Crie uma conta</span>
        </Link>
      </span>
    </Form>
  );
};

export default SigninForm;
