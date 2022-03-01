import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Aside from "../../GlobalComponents/Aside/Aside.component";
import { darkPallete } from "../../styles/pallete";
import Chat from "./components/Chat.component";
import * as ChatRoomService from "./services/ChatRoom.service";
import { ChatContainer } from "./ChatRoom.styled";

export default function ChatRoom() {
  const [currentRoom, setCurrentRoom] = useState();
  const params = useParams();

  const { _id } = params;

  useEffect(() => {
    ChatRoomService.getRoomById(_id).then(({ data }) => {
      setCurrentRoom(data);
    });
  }, [_id]);

  return (
    <ChatContainer>
      <Aside darkPallete={darkPallete} />
      <Chat darkPallete={darkPallete} currentRoom={currentRoom} />
    </ChatContainer>
  );
}
