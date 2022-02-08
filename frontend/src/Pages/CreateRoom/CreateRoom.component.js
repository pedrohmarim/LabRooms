import React, { useContext, useEffect } from "react";
import CreateRoomForm from "./components/CreateRoom.form.component";
import Background from "../../assets/backStars.mp4";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo1.png";
import { darkPallete } from "../../styles/pallete";
import { UserContext } from "../../Context/UserContext";
import Cookie from "js-cookie";
import {
  SignFormContainer,
  CenterForm,
  FormHeader,
} from "../Signup/Signup.component.styled";
import {
  Typography,
  Breadcrumb,
  Image,
  Tooltip,
  FeatherIcons,
} from "../../antd_components";

export default function CreateRoom() {
  const { Title } = Typography;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookie.get("token");
    if (!user && !token) navigate("/notfound");
  }, [navigate, user]);

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
                Criar sala
              </Title>
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
          <CreateRoomForm darkPallete={darkPallete} />
        </SignFormContainer>
      </CenterForm>
    </>
  );
}
