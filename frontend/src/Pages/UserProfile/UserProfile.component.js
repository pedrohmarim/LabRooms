import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import Cookie from "js-cookie";
import Aside from "../../GlobalComponents/Aside/Aside.component";
import { darkPallete } from "../../styles/pallete";
import {
  ProfileContainer,
  Row,
  Card,
  LeftFormContainer,
  RightFormContainer,
} from "./UserProfile.component.styled";
import ProfileSocials from "./components/ProfileSocials.component";
import TabsContainer from "./components/TabsContainer.component";

export default function UserProfile() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const token = Cookie.get("token");

  useEffect(() => {
    if (!user && !token) navigate("/notfound");
  }, [navigate, token, user]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 100%",
        height: "100vh",
      }}
    >
      <Aside darkPallete={darkPallete} SelectedItem='2' />
      <ProfileContainer>
        <Row>
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
        </Row>
      </ProfileContainer>
    </div>
  );
}
