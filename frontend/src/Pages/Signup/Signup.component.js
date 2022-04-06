import React, { useState } from "react";
import SignUpForm from "./components/SignupForm/Signup.form.component";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo1.png";
import Background from "../../assets/backStars.mp4";
import { darkPallete } from "../../styles/pallete";
import { TitleStyled } from "../CreateRoom/CreateRoom.styled";
import SignUpType from "./components/SignUpType.component";
import {
  Breadcrumb,
  FeatherIcons,
  Button,
  Image,
  Tooltip,
} from "../../antd_components";
import {
  SignFormContainer,
  CenterForm,
  FormHeader,
} from "./Signup.component.styled";

export default function Signup() {
  document.getElementsByTagName("title")[0].innerText = "LabRooms | Registro";
  const [accountType, setAccountType] = useState(null);

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
      <CenterForm>
        <Link to='/'>
          <Image src={Logo} alt='Logo' height={100} preview={false} />
        </Link>

        <SignFormContainer
          title={
            <FormHeader>
              <TitleStyled level={3}>
                {!accountType ? "Qual seu Tipo de Perfil?" : "Registrar-se"}
              </TitleStyled>
              <Tooltip title='Voltar para Home' color={darkPallete.lightblue}>
                <Link to='/signin'>
                  <FeatherIcons icon='chevron-left' size={30} />
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

          {!accountType ? (
            <SignUpType setAccountType={(data) => setAccountType(data)} />
          ) : (
            <SignUpForm darkPallete={darkPallete} accountType={accountType} />
          )}
        </SignFormContainer>
      </CenterForm>
    </>
  );
}
