import React, { useState, useEffect, useContext } from "react";
import { darkPallete } from "../../styles/pallete";
import { useParams, useNavigate } from "react-router-dom";
import Aside from "../../GlobalComponents/Aside/Aside.component";
import ViewProjectComponent from "./components/ViewProject.component";
import { ChatContainer as ViewProjectContainer } from "../ChatRoom/ChatRoom.styled";
import { ModalButton } from "./ViewProject.component.styled";
import Background from "../../assets/backStars.mp4";
import {
  Row,
  Col,
  Notification,
  Modal,
  FeatherIcons,
} from "../../antd_components";
import ProfileSocials from "../UserProfile/components/ProfileSocials.component";
import * as ChatRoomService from "../ChatRoom/services/ChatRoom.service";
import { UserContext } from "../../Context/UserContext";
import Cookie from "js-cookie";

export default function ViewProject() {
  document.getElementsByTagName("title")[0].innerText =
    "LabRooms | Visualizar Projeto";

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [currentRoom, setCurrentRoom] = useState();
  const [visible, setVisible] = useState(false);
  const [roomOwner, setRoomOwner] = useState();
  const [RoomCategoryData, setRoomCategoryData] = useState();
  const [loadingApply, setLoadingApply] = useState(false);
  const params = useParams();
  const { _id } = params;
  const token = Cookie.get("token");

  useEffect(() => {
    ChatRoomService.getRoomById(_id).then(({ data }) => {
      setCurrentRoom(data);
    });
  }, [_id]);

  function handleApply() {
    if (user?._id && token) {
      setLoadingApply(true);

      const dto = {
        roomId: _id,
        owner: currentRoom?.owner,
        userIdToApply: user?._id,
        loggedAccountType: user?.accountType,
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
            loggedAccountType={user?.accountType}
            loadingApply={loadingApply}
            handleApply={handleApply}
            currentRoom={currentRoom}
            darkPallete={darkPallete}
            roomCategoryData={RoomCategoryData}
          />
        </Col>

        <Col span={8}>
          <Row justify='center' align='middle' style={{ height: "100vh" }}>
            <ProfileSocials
              darkPallete={darkPallete}
              user={roomOwner}
              isViewProject
              ownerId={currentRoom?.owner}
            />
          </Row>
        </Col>
      </Row>
    </ViewProjectContainer>
  );
}
