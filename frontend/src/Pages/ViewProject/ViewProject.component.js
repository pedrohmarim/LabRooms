import React, { useState, useEffect, useContext, useRef } from "react";
import { darkPallete } from "../../styles/pallete";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Aside from "../../GlobalComponents/Aside/Aside.component";
import ViewProjectComponent from "./components/ViewProject.component";
import { Loading } from "../../GlobalComponents/Loading/Loading.component";
import { ChatContainer as ViewProjectContainer } from "../ChatRoom/ChatRoom.styled";
import { ModalButton } from "./ViewProject.component.styled";
import Background from "../../assets/backStars.mp4";
import ProfileSocials from "../UserProfile/components/ProfileSocials.component";
import * as ChatRoomService from "../ChatRoom/services/ChatRoom.service";
import * as CreateRoomService from "../CreateRoom/services/createroom.service";
import { UserContext } from "../../Context/UserContext";
import Cookie from "js-cookie";
import {
  Row,
  Col,
  Card,
  Notification,
  Modal,
  FeatherIcons,
} from "../../antd_components";
import Recaptcha from "../../GlobalComponents/Recaptcha/Recaptcha.component";
import { StyledRow } from "../CreateRoom/CreateRoom.styled";

export default function ViewProject() {
  document.getElementsByTagName("title")[0].innerText =
    "LabRooms | Visualizar Projeto";

  const recaptchaRef = useRef();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [currentRoom, setCurrentRoom] = useState();
  const [disabledApplyBtn, setDisabledApplyBtn] = useState();
  const [captcha, setCaptcha] = useState();
  const [captchaVisible, setCaptchaVisible] = useState();
  const [visible, setVisible] = useState(false);
  const [roomOwner, setRoomOwner] = useState();
  const [RoomCategoryData, setRoomCategoryData] = useState();
  const [loadingApply, setLoadingApply] = useState(false);
  const token = Cookie.get("token");
  const { _id } = params;

  function resetCaptcha() {
    setCaptcha(null);
    recaptchaRef?.current.reset();
  }

  useEffect(() => {
    if (searchParams.get("token")) {
      const urlToken = searchParams.get("token");

      const dto = {
        urlToken,
        _id,
      };

      CreateRoomService.ValidateSharedLink(dto)
        .then(({ data }) => {
          const { _id } = data;

          if (_id) {
            ChatRoomService.getRoomById(_id).then(({ data }) => {
              setCurrentRoom(data);
            });
          } else {
            navigate("/notfound");
          }
        })
        .catch(() => navigate("/notfound"));
    } else {
      ChatRoomService.getRoomById(_id)
        .then(({ data }) => {
          const { visible, owner } = data;

          setCurrentRoom(data);

          if (!visible && token && user && user?._id !== owner)
            navigate("/notfound");

          if (!visible && !token) navigate("/notfound");
        })
        .catch(() => navigate("/notfound"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user && currentRoom && user?._id !== currentRoom?.owner) {
      ChatRoomService.handleVerifyApply(user?._id, currentRoom?._id).then(
        ({ data }) => {
          const { applied } = data;
          setDisabledApplyBtn(applied);
        }
      );
    }
  }, [user, currentRoom]);

  function handleApply() {
    if (user?._id && token) {
      setLoadingApply(true);

      const dto = {
        roomId: _id,
        owner: currentRoom?.owner,
        userIdToApply: user?._id,
        loggedAccountType: user?.accountType,
        captcha,
      };

      ChatRoomService.handleApply(dto, token).then(({ data }) => {
        const { loading, message, success } = data;

        Notification.open({
          type: success ? "success" : "error",
          message,
          style: {
            zIndex: 999,
          },
          duration: 2,
        });
        setDisabledApplyBtn(true);
        setLoadingApply(loading);
      });
    } else {
      setVisible(true);
    }
  }

  useEffect(() => {
    if (currentRoom) {
      const { categoryId, newCategory, owner } = currentRoom;

      if (!newCategory && categoryId) {
        ChatRoomService.getCategoryById(categoryId).then(({ data }) => {
          setRoomCategoryData(data);
        });
      } else if (newCategory && !categoryId) {
        setRoomCategoryData({ Icon: "repeat", Title: newCategory });
      }

      ChatRoomService.getUserById(owner).then(({ data }) => {
        setRoomOwner(data);
      });
    }
  }, [currentRoom]);

  return (
    <ViewProjectContainer>
      <Modal
        visible={captchaVisible}
        title='ReCaptcha'
        onOk={() => {
          if (captcha) {
            resetCaptcha();
            setCaptchaVisible(false);
            handleApply();
          }
        }}
        onCancel={() => setCaptchaVisible(false)}
        okText='Enviar'
        cancelText='Cancelar'
      >
        <StyledRow justify='center'>
          <Recaptcha
            verifyCallback={(verified) => {
              setCaptcha(verified);
            }}
            ref={recaptchaRef}
          />
        </StyledRow>
      </Modal>

      <Modal
        okText={
          <Row align='middle'>
            <FeatherIcons icon='log-in' size={18} />
            <ModalButton>Entrar</ModalButton>
          </Row>
        }
        onOk={() => navigate("/signin")}
        cancelButtonProps={{ hidden: true }}
        bodyStyle={{ display: "none" }}
        title={
          <Row align='middle'>
            <FeatherIcons
              icon='alert-circle'
              size={18}
              className='alert-icon'
            />
            <ModalButton>
              Necessário Estar Logado para Realizar essa Ação!
            </ModalButton>
          </Row>
        }
        visible={visible}
        onCancel={() => setVisible(false)}
      />

      <video
        loop
        autoPlay
        muted
        id={window.innerWidth < 1024 ? "video-form-mobile" : "video-form"}
      >
        <source src={Background} type='video/mp4' />
      </video>

      <Aside darkPallete={darkPallete} />

      <Row>
        <Col span={16}>
          <ViewProjectComponent
            disabledApplyBtn={disabledApplyBtn}
            token={token}
            loggedAccountType={user?.accountType}
            loadingApply={loadingApply}
            setCaptchaVisible={(value) => setCaptchaVisible(value)}
            setVisible={(value) => setVisible(value)}
            currentRoom={currentRoom}
            darkPallete={darkPallete}
            roomCategoryData={RoomCategoryData}
          />
        </Col>

        <Col span={8}>
          <Row justify='center' align='middle' style={{ height: "100vh" }}>
            {roomOwner ? (
              <Card
                style={{
                  maxWidth: "400px",
                  height: "fit-content",
                  position: "fixed",
                }}
              >
                <ProfileSocials
                  darkPallete={darkPallete}
                  user={roomOwner}
                  isViewProject
                  ownerId={currentRoom?.owner}
                />
              </Card>
            ) : (
              Loading("#fff")
            )}
          </Row>
        </Col>
      </Row>
    </ViewProjectContainer>
  );
}
