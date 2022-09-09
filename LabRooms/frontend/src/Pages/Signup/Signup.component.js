import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import SignUpForm from "./components/SignupForm/Signup.form.component";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo1.png";
import Background from "../../assets/backStars.mp4";
import { darkPallete } from "../../styles/pallete";
import { TitleStyled } from "../CreateRoom/CreateRoom.styled";
import SignUpType from "./components/SignUpType.component";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();
  document.getElementsByTagName("title")[0].innerText = "LabRooms | Registro";
  const [accountType, setAccountType] = useState(null);
  const { screenSize } = useContext(UserContext);

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
          title={
            <FormHeader>
              <TitleStyled level={3}>
                {!accountType ? "Qual seu Tipo de Perfil?" : "Registrar-se"}
              </TitleStyled>
              <Tooltip
                title={!accountType ? "Voltar para Home" : "Voltar"}
                color={darkPallete.lightblue}
              >
                <Button
                  type='ghost'
                  onClick={() =>
                    accountType ? setAccountType(null) : navigate("/")
                  }
                  icon={<FeatherIcons icon='chevron-left' size={30} />}
                />
              </Tooltip>
            </FormHeader>
          }
        >
          <FormHeader margin='0 0 20px 0'>
            <Breadcrumb />

            {screenSize?.dynamicWidth > 1024 && (
              <Link to='/signin'>
                <Button>Possui uma conta? Entrar</Button>
              </Link>
            )}
          </FormHeader>

          {!accountType ? (
            <SignUpType
              setAccountType={(data) => {
                setAccountType(data);
              }}
              darkPallete={darkPallete}
            />
          ) : (
            <SignUpForm darkPallete={darkPallete} accountType={accountType} />
          )}
        </SignFormContainer>
      </CenterForm>
    </>
  );
}
