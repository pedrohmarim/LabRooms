import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Aside from "../../GlobalComponents/Aside/Aside.component";
import { darkPallete } from "../../styles/pallete";
import Chat from "./components/Chat.component";
import * as ChatRoomService from "./services/ChatRoom.service";

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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 100%",
        height: "100vh",
      }}
    >
      <Aside darkPallete={darkPallete} />
      <Chat darkPallete={darkPallete} currentRoom={currentRoom} />
    </div>
  );
}
