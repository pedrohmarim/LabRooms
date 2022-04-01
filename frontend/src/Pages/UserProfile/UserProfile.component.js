import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import Cookie from "js-cookie";
import Aside from "../../GlobalComponents/Aside/Aside.component";
import { darkPallete } from "../../styles/pallete";
import ProfileSocials from "./components/ProfileSocials.component";
import TabsContainer from "./components/TabsContainer.component";
import Background from "../../assets/backStars.mp4";
import * as ChatRoomService from "../ChatRoom/services/ChatRoom.service";
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
  const [viewUser, setViewUser] = useState();
  const [viewMode, setIsViewMode] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const token = Cookie.get("token");
  const { _id } = params;

  useEffect(() => {
    function getUserByName() {
      ChatRoomService.getUserById(_id).then(({ data }) => {
        setViewUser(data);
      });
    }

    if (!user) {
      getUserByName();
    } else {
      if (user && _id === user?._id) {
        setViewUser(user);
        setIsViewMode(false);
      } else {
        getUserByName();
      }
    }
  }, [_id, params, user]);

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
          <Aside darkPallete={darkPallete} SelectedItem={user && "2"} />
        )}
        <ProfileContainer>
          <Row>
            {window.innerWidth > 1024 ? (
              <>
                <LeftFormContainer span={window.innerWidth > 1024 ? 6 : 24}>
                  <Card bordered={false}>
                    <ProfileSocials darkPallete={darkPallete} user={viewUser} />
                  </Card>
                </LeftFormContainer>
                <RightFormContainer span={window.innerWidth > 1024 ? 18 : 24}>
                  <TabsContainer
                    darkPallete={darkPallete}
                    user={viewUser}
                    navigate={navigate}
                    token={token}
                    viewMode={viewMode}
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
                    <ProfileSocials darkPallete={darkPallete} user={viewUser} />
                    <TabsContainer
                      darkPallete={darkPallete}
                      user={viewUser}
                      navigate={navigate}
                      token={token}
                      viewMode={viewMode}
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
