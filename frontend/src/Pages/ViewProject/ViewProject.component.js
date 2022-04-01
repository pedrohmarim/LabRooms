import React, { useState, useEffect } from "react";
import { darkPallete } from "../../styles/pallete";
import { useParams } from "react-router-dom";
import Aside from "../../GlobalComponents/Aside/Aside.component";
import ViewProjectComponent from "./components/ViewProject.component";
import { ChatContainer as ViewProjectContainer } from "../ChatRoom/ChatRoom.styled";
import Background from "../../assets/backStars.mp4";
import { Row, Col } from '../../antd_components'
import ProfileSocials from "../UserProfile/components/ProfileSocials.component";
import * as ChatRoomService from "../ChatRoom/services/ChatRoom.service";

export default function ViewProject() {
  document.getElementsByTagName("title")[0].innerText =
    "LabRooms | Visualizar Projeto";

  const [currentRoom, setCurrentRoom] = useState();
  const [user, setUser] = useState();
  const [RoomCategoryData, setRoomCategoryData] = useState();
  const params = useParams();
  const { _id } = params;

  useEffect(() => {
    ChatRoomService.getRoomById(_id).then(({ data }) => {
      setCurrentRoom(data);
    });
  }, [_id]);

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

      ChatRoomService.getUserById(owner).then(({data}) => {
        setUser(data)
      })
    }
  }, [currentRoom]);

  return (
    <ViewProjectContainer>
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
            currentRoom={currentRoom}
            darkPallete={darkPallete}
            roomCategoryData={RoomCategoryData}
          />
        </Col>

        <Col span={8}>
          <Row justify="center" align="middle" style={{height: "100vh"}}>
            <ProfileSocials darkPallete={darkPallete} user={user} isViewProject ownerName={currentRoom?.ownerName} />
          </Row>
        </Col>
      </Row>

    </ViewProjectContainer>
  );
}
