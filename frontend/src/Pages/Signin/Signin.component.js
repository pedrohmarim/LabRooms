import React from "react";
import { useContext } from "react";
import Background from "../../assets/backStars.mp4";
import {
  SignFormContainer,
  CenterForm,
  FormHeader,
} from "../Signup/Signup.component.styled";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo1.png";
import {
  Typography,
  Breadcrumb,
  Icons,
  Image,
  Tooltip,
} from "../../antd_components";
import { darkPallete } from "../../styles/pallete";
import SigninForm from "./components/SigninForm/Signin.form.component";
import { UserContext } from "../../Context/UserContext";

export default function Signin() {
  const { loggedUser, setLoggedUser } = useContext(UserContext);
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
      <CenterForm height='100vh'>
        <Link to='/'>
          <Image src={Logo} alt='Logo' height={100} preview={false} />
        </Link>
        <SignFormContainer
          width={window.innerWidth > 1024 ? "40%" : "90%"}
          title={
            <FormHeader>
              <Title level={3} style={{ marginBottom: 0 }}>
                Entrar
              </Title>
              <Tooltip title='Voltar para Home' color={darkPallete.lightblue}>
                <Link to='/'>
                  <Icons.LeftOutlined style={{ fontSize: 20 }} />
                </Link>
              </Tooltip>
            </FormHeader>
          }
        >
          <FormHeader margin='0 0 20px 0'>
            <Breadcrumb />
          </FormHeader>
          <SigninForm />
        </SignFormContainer>
      </CenterForm>
    </>
  );
}
