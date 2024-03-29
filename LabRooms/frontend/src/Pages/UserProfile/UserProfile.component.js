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
import { Loading } from "../../GlobalComponents/Loading/Loading.component";

export default function UserProfile() {
  document.getElementsByTagName("title")[0].innerText = "LabRooms | Perfil";
  const { getUserById, viewUser, viewMode, viewUserLoading, screenSize } =
    useContext(UserContext);
  const navigate = useNavigate();
  const params = useParams();
  const token = Cookie.get("token");
  const { _id } = params;

  const [searchParams] = useSearchParams();
  const [candidaciesActive, setCandidaciesActive] = useState(false);
  const [dashboardActive, setDashboardActive] = useState(false);

  const [activeKey, setActiveKey] = useState("1");

  useEffect(() => {
    if (searchParams.get("projects")) setActiveKey("2");

    if (searchParams.get("fromCandidacies")) setActiveKey("1");
  }, [searchParams]);

  useEffect(() => {
    if (candidaciesActive?.active) setActiveKey("3");
  }, [candidaciesActive]);

  useEffect(() => {
    if (dashboardActive?.active) setActiveKey("4");
  }, [dashboardActive]);

  useEffect(() => {
    getUserById(_id);
  }, [_id, getUserById, navigate]);

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

      <Row align='middle' justify='center' style={{ height: "100vh" }}>
        <FormContainer
          tabcolor={darkPallete.white}
          padding='0 5px 0px 30px'
          span={screenSize?.dynamicWidth > 1024 ? 6 : 24}
        >
          <Card bordered={false}>
            {!viewUserLoading && viewUser ? (
              <ProfileSocials darkPallete={darkPallete} user={viewUser} />
            ) : (
              <>
                {Loading(
                  screenSize?.dynamicWidth < 1024 ? darkPallete.white : "#000"
                )}
              </>
            )}

            {screenSize?.dynamicWidth < 1024 && (
              <TabsContainer
                candidaciesActive={candidaciesActive}
                setActiveKey={(value) => setActiveKey(value)}
                setCandidaciesActive={(value) => setCandidaciesActive(value)}
                setDashboardActive={(value) => setDashboardActive(value)}
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

        {screenSize?.dynamicWidth > 1024 && (
          <FormContainer
            padding='0 30px 0 5px'
            span={screenSize?.dynamicWidth > 1024 ? 18 : 24}
          >
            <TabsContainer
              candidaciesActive={candidaciesActive}
              dashboardActive={dashboardActive}
              setActiveKey={(value) => setActiveKey(value)}
              setCandidaciesActive={(value) => setCandidaciesActive(value)}
              setDashboardActive={(value) => setDashboardActive(value)}
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
