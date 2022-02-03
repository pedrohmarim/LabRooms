import React from "react";
import {
  RoomItem,
  RoomTitle,
  RoomDescription,
  UserCount,
  RoomCategory,
} from ".././styles";
import {
  Row,
  Image,
  Icons,
  Col,
  Typography,
} from "../../../../../antd_components";
import { darkPallete } from "../../../../../styles/pallete";

const Rooms = ({ rooms, pallete }) => {
  console.log(rooms);
  const { Title } = Typography;

  function loadRoomThumb(thumb) {}

  return (
    <Row>
      {rooms &&
        rooms.map(({ title, description, thumb, category }) => (
          <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
            <RoomItem
              margintop={window.innerWidth < 1024 ? "15px" : "20px"}
              background={darkPallete.lightblueOpacity}
            >
              <Col>
                <Image src={loadRoomThumb(thumb)} height={60} width={60} />
              </Col>
              <Col>
                <RoomTitle color={darkPallete.white}>{title}</RoomTitle>

                <RoomDescription color={darkPallete.white}>
                  {description}
                </RoomDescription>
              </Col>

              <RoomCategory color={darkPallete.white}>
                <Icons.UserOutlined />
              </RoomCategory>

              <UserCount color={darkPallete.white}>
                <Icons.UserOutlined /> 20
              </UserCount>
            </RoomItem>
          </Col>
        ))}

      {rooms && rooms.length === 0 && (
        <Title
          level={3}
          style={{
            color: pallete.white,
            marginTop: window.innerWidth < 1024 ? "15px" : "20px",
          }}
        >
          Nenhuma sala disponível
        </Title>
      )}
    </Row>
  );
};

export default Rooms;
