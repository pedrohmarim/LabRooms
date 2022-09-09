import React, { useContext, useEffect } from "react";
import CreateRoomForm from "./components/CreateRoom.form.component";
import Background from "../../assets/backStars.mp4";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo1.png";
import { darkPallete } from "../../styles/pallete";
import { UserContext } from "../../Context/UserContext";
import Cookie from "js-cookie";
import { TitleStyled } from "./CreateRoom.styled";
import {
  SignFormContainer,
  CenterForm,
  FormHeader,
} from "../Signup/Signup.component.styled";
import {
  Breadcrumb,
  Image,
  Tooltip,
  FeatherIcons,
} from "../../antd_components";
import { TIPO_CADASTRO } from "../../Helpers/TipoCadastro";

export default function CreateRoom() {
  const { user, getRoomsByOwnerId, screenSize } = useContext(UserContext);
  const navigate = useNavigate();

  document.getElementsByTagName("title")[0].innerText =
    "LabRooms | Criar Projeto";

  useEffect(() => {
    const token = Cookie.get("token");

    if ((!user && !token) || user?.accountType === TIPO_CADASTRO.FREELANCER)
      navigate("/notfound");
  }, [navigate, user]);

  return (
    <>
      {user?.accountType === TIPO_CADASTRO.EMPRESA && (
        <>
          <video
            loop
            autoPlay
            muted
            id={
              screenSize?.dynamicWidth < 1024
                ? "video-form-mobile"
                : "video-form"
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
                  <TitleStyled level={3}>Criar Projeto</TitleStyled>
                  <Tooltip
                    title='Voltar para Home'
                    color={darkPallete.lightblue}
                  >
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

              <CreateRoomForm
                darkPallete={darkPallete}
                user={user}
                getRoomsByOwnerId={getRoomsByOwnerId}
              />
            </SignFormContainer>
          </CenterForm>
        </>
      )}
    </>
  );
}
