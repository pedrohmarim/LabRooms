import React from "react";
import SignUpForm from "./components/SignupForm/Signup.form.component";
import {
  Typography,
  Breadcrumb,
  Icons,
  Button,
  Image,
  Tooltip,
} from "../../antd_components";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo1.png";
import Background from "../../assets/backStars.mp4";
import {
  SignFormContainer,
  CenterForm,
  FormHeader,
} from "./Signup.component.styled";
import { darkPallete } from "../../styles/pallete";

export default function Signup() {
  const { Title } = Typography;

  return (
    <>
      <video
        loop
        autoPlay
        muted
        id={window.innerWidth < 1024 ? "video-form-mobile" : "video-form"}
      >
        <source src={Background} type='video/mp4' />
      </video>
      <CenterForm height={window.innerWidth > 1024 && "100vh"}>
        <Link to='/'>
          <Image src={Logo} alt='Logo' height={100} preview={false} />
        </Link>
        <SignFormContainer
          width={window.innerWidth > 1024 ? "40%" : "90%"}
          title={
            <FormHeader>
              <Title level={3} style={{ marginBottom: 0 }}>
                Registrar-se
              </Title>
              <Tooltip title='Voltar para Home' color={darkPallete.lightblue}>
                <Link to='/signin'>
                  <Icons.LeftOutlined style={{ fontSize: 20 }} />
                </Link>
              </Tooltip>
            </FormHeader>
          }
        >
          <FormHeader margin='0 0 20px 0'>
            <Breadcrumb />
            {window.innerWidth > 1024 && (
              <Link to='/signin'>
                <Button>Possui uma conta? Entrar</Button>
              </Link>
            )}
          </FormHeader>
          <SignUpForm darkPallete={darkPallete} />
        </SignFormContainer>
      </CenterForm>
    </>
  );
}
