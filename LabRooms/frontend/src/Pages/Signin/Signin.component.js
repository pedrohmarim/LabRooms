import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Background from "../../assets/backStars.mp4";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo1.png";
import { TitleStyled } from "../CreateRoom/CreateRoom.styled";
import { darkPallete } from "../../styles/pallete";
import SigninForm from "./components/Signin.form.component";
import {
  SignFormContainer,
  CenterForm,
  FormHeader,
} from "../Signup/Signup.component.styled";
import {
  Breadcrumb,
  FeatherIcons,
  Image,
  Tooltip,
} from "../../antd_components";

export default function Signin() {
  const { screenSize } = useContext(UserContext);
  document.getElementsByTagName("title")[0].innerText = "LabRooms | Entrar";

  return (
    <>
      <video
        loop
        autoPlay
        muted
        id={
          screenSize?.dynamicWidth < 1024 ? "video-form-mobile" : "video-form"
        }
      >
        <source src={Background} type='video/mp4' />
      </video>

      <CenterForm>
        <Link to='/'>
          <Image src={Logo} alt='Logo' height={100} preview={false} />
        </Link>
        <SignFormContainer
          width={screenSize?.dynamicWidth > 1024 ? "40%" : "90%"}
          title={
            <FormHeader>
              <TitleStyled level={3}>Entrar</TitleStyled>
              <Tooltip title='Voltar para Home' color={darkPallete.lightblue}>
                <Link to='/'>
                  <FeatherIcons icon='chevron-left' size={30} />
                </Link>
              </Tooltip>
            </FormHeader>
          }
        >
          <FormHeader margin='0 0 20px 0'>
            <Breadcrumb />
          </FormHeader>

          <SigninForm darkPallete={darkPallete} />
        </SignFormContainer>
      </CenterForm>
    </>
  );
}
