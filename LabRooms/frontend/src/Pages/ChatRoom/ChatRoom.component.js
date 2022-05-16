import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Aside from "../../GlobalComponents/Aside/Aside.component";
import { darkPallete } from "../../styles/pallete";
import Chat from "./components/Chat.component";
import * as ChatRoomService from "./services/ChatRoom.service";
import { ChatContainer } from "./ChatRoom.styled";
import Background from "../../assets/backStars.mp4";

export default function ChatRoom() {
  const [currentRoom, setCurrentRoom] = useState();
  const params = useParams();
  const { _id } = params;

  document.getElementsByTagName("title")[0].innerText = "LabRooms | Chat";

  useEffect(() => {
    ChatRoomService.getRoomById(_id).then(({ data }) => {
      setCurrentRoom(data);
    });
  }, [_id]);

  return (
    <ChatContainer>
      <video
        loop
        autoPlay
        muted
        id={window.innerWidth < 1024 ? "video-form-mobile" : "video-form"}
      >
        <source src={Background} type='video/mp4' />
      </video>
      <Aside darkPallete={darkPallete} />
      <Chat darkPallete={darkPallete} currentRoom={currentRoom} />
    </ChatContainer>
  );
}
