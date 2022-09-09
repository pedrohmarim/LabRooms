import React, { useState, useEffect, useContext, useRef } from "react";
import { darkPallete } from "../../styles/pallete";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../GlobalComponents/Header/Header.component";
import ViewProjectComponent from "./components/ViewProject.component";
import { Loading } from "../../GlobalComponents/Loading/Loading.component";
import Background from "../../assets/backStars.mp4";
import ProfileSocials from "../UserProfile/components/ProfileSocials.component";
import { UserContext } from "../../Context/UserContext";
import Cookie from "js-cookie";
import Recaptcha from "../../GlobalComponents/Recaptcha/Recaptcha.component";
import { StyledRow } from "../CreateRoom/CreateRoom.styled";
import { TIPO_CADASTRO } from "../../Helpers/TipoCadastro";
import * as CreateRoomService from "../CreateRoom/services/CreateRoom.service";
import {
  ModalButton,
  ViewProjectContainer,
} from "./ViewProject.component.styled";
import {
  Row,
  Col,
  Card,
  Notification,
  Modal,
  FeatherIcons,
} from "../../antd_components";

export default function ViewProject() {
  document.getElementsByTagName("title")[0].innerText =
    "LabRooms | Visualizar Projeto";

  const recaptchaRef = useRef();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    user,
    viewUser,
    getUserById,
    getCategoryById,
    categorie,
    loadPage,
    handleVerifyApply,
    currentRoom,
    getRoomById,
    disabledApplyBtn,
    setDisabledApplyBtn,
    setLoadPage,
    screenSize,
  } = useContext(UserContext);

  const [captcha, setCaptcha] = useState();
  const [captchaVisible, setCaptchaVisible] = useState();
  const [visible, setVisible] = useState(false);
  const [RoomCategoryData, setRoomCategoryData] = useState();
  const [loadingApply, setLoadingApply] = useState(false);
  const token = Cookie.get("token");
  const { _id } = params;

  function resetCaptcha() {
    setCaptcha(null);
    recaptchaRef?.current.reset();
  }

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

      CreateRoomService.handleApply(dto, token).then(({ data }) => {
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
    if (currentRoom?._id !== _id) {
      setLoadPage(false);
      getRoomById(_id);
    } else {
      const { categoryId, newCategory, owner } = currentRoom;

      getUserById(owner);

      if (!newCategory && categoryId) {
        getCategoryById(categoryId);
      } else if (newCategory && !categoryId) {
        setRoomCategoryData({ Icon: "repeat", Title: newCategory });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoom?.owner]);

  function handleValidateSharedLink(_id, urlToken) {
    const dto = {
      urlToken,
      _id,
    };

    CreateRoomService.ValidateSharedLink(dto)
      .then(({ data }) => {
        const { authorized } = data;

        if (!authorized) navigate("/notfound");
      })
      .catch(() => {
        navigate("/notfound");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  useEffect(() => {
    if (currentRoom) {
      const urlToken = searchParams.get("token");

      if (
        currentRoom?.owner === user?._id ||
        (currentRoom?.visible && !urlToken)
      )
        return;

      if (urlToken && !currentRoom?.visible)
        handleValidateSharedLink(_id, urlToken);
      else navigate("/notfound");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoom, user, _id]);

  useEffect(() => {
    if (currentRoom && user && user?.accountType === TIPO_CADASTRO.FREELANCER)
      handleVerifyApply(user?._id, currentRoom?.owner, currentRoom?._id);
  }, [user, currentRoom, handleVerifyApply]);

  return (
    <>
      {loadPage && (
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
            okButtonProps={{ disabled: !captcha }}
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
            id={
              screenSize?.dynamicWidth < 1024
                ? "video-form-mobile"
                : "video-form"
            }
          >
            <source src={Background} type='video/mp4' />
          </video>

          <Header />

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
                roomCategoryData={categorie || RoomCategoryData}
              />
            </Col>

            <Col span={8}>
              <Row justify='center' align='middle' style={{ height: "100vh" }}>
                {viewUser ? (
                  <Card
                    style={{
                      maxWidth: "400px",
                      height: "fit-content",
                      position: "fixed",
                    }}
                  >
                    <ProfileSocials
                      darkPallete={darkPallete}
                      user={viewUser}
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
      )}
    </>
  );
}
