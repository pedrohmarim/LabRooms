import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import Cookie from "js-cookie";
import Aside from "../../GlobalComponents/Aside/Aside.component";
import { darkPallete } from "../../styles/pallete";
import ProfileSocials from "./components/ProfileSocials.component";
import TabsContainer from "./components/TabsContainer.component";
import Background from "../../assets/backStars.mp4";
import {
  ProfileContainer,
  Row,
  Card,
  LeftFormContainer,
  RightFormContainer,
} from "./UserProfile.component.styled";
import Header from "../../GlobalComponents/Header/Header.component";

export default function UserProfile() {
  document.getElementsByTagName("title")[0].innerText = "LabRooms | Perfil";
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const token = Cookie.get("token");

  useEffect(() => {
    if (!user && !token) navigate("/notfound");
  }, [navigate, token, user]);

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
      <div
        style={
          window.innerWidth > 1024
            ? {
                display: "grid",
                gridTemplateColumns: "auto 100%",
                height: "100vh",
              }
            : null
        }
      >
        {window.innerWidth > 1024 && (
          <Aside darkPallete={darkPallete} SelectedItem='2' />
        )}
        <ProfileContainer>
          <Row>
            {window.innerWidth > 1024 ? (
              <>
                <LeftFormContainer span={window.innerWidth > 1024 ? 6 : 24}>
                  <Card bordered={false}>
                    <ProfileSocials darkPallete={darkPallete} user={user} />
                  </Card>
                </LeftFormContainer>
                <RightFormContainer span={window.innerWidth > 1024 ? 18 : 24}>
                  <TabsContainer
                    darkPallete={darkPallete}
                    user={user}
                    navigate={navigate}
                    token={token}
                  />
                </RightFormContainer>
              </>
            ) : (
              <>
                <Header />
                <LeftFormContainer
                  span={window.innerWidth > 1024 ? 6 : 24}
                  tabcolor={darkPallete.white}
                >
                  <Card bordered={false}>
                    <ProfileSocials darkPallete={darkPallete} user={user} />
                    <TabsContainer
                      darkPallete={darkPallete}
                      user={user}
                      navigate={navigate}
                      token={token}
                    />
                  </Card>
                </LeftFormContainer>
              </>
            )}
          </Row>
        </ProfileContainer>
      </div>
    </>
  );
}
