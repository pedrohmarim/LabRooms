import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import Cookie from "js-cookie";
import { darkPallete } from "../../styles/pallete";
import ProfileSocials from "./components/ProfileSocials.component";
import TabsContainer from "./components/TabsContainer.component";
import Background from "../../assets/backStars.mp4";
import { Row, Card, FormContainer } from "./UserProfile.component.styled";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  document.getElementsByTagName("title")[0].innerText = "LabRooms | Perfil";
  const { getUserById, viewUser, viewMode, user } = useContext(UserContext);
  const navigate = useNavigate();
  const params = useParams();
  const token = Cookie.get("token");
  const { _id } = params;

  const [searchParams] = useSearchParams();
  const [candidaciesActive, setCandidaciesActive] = useState(false);

  const [activeKey, setActiveKey] = useState();

  useEffect(() => {
    if (searchParams.get("projects")) setActiveKey("2");

    if (searchParams.get("fromCandidacies")) setActiveKey("1");
  }, [searchParams]);

  useEffect(() => {
    if (candidaciesActive?.active) setActiveKey("3");
  }, [candidaciesActive]);

  useEffect(() => {
    getUserById(_id);

    // if (user && _id === user?._id && !viewUser) navigate("/notfound");
  }, [_id, getUserById, navigate, user]);

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

      <Row align='middle' justify='center' style={{ height: "100vh" }}>
        <FormContainer
          tabcolor={darkPallete.white}
          padding='0 5px 0px 30px'
          span={window.innerWidth > 1024 ? 6 : 24}
        >
          <Card bordered={false}>
            <ProfileSocials darkPallete={darkPallete} user={viewUser} />

            {window.innerWidth < 1024 && (
              <TabsContainer
                candidaciesActive={candidaciesActive}
                setActiveKey={(value) => setActiveKey(value)}
                setCandidaciesActive={(value) => setCandidaciesActive(value)}
                activeKey={activeKey}
                darkPallete={darkPallete}
                user={viewUser}
                navigate={navigate}
                token={token}
                viewMode={viewMode}
              />
            )}
          </Card>
        </FormContainer>

        {window.innerWidth > 1024 && (
          <FormContainer
            padding='0 30px 0 5px'
            span={window.innerWidth > 1024 ? 18 : 24}
          >
            <TabsContainer
              candidaciesActive={candidaciesActive}
              setActiveKey={(value) => setActiveKey(value)}
              setCandidaciesActive={(value) => setCandidaciesActive(value)}
              activeKey={activeKey}
              darkPallete={darkPallete}
              user={viewUser}
              navigate={navigate}
              token={token}
              viewMode={viewMode}
            />
          </FormContainer>
        )}
      </Row>
    </>
  );
}
