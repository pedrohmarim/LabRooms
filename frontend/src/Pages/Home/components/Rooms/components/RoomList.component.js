import React from "react";
import { RoomItem, RoomTitle, RoomDescription, UserCount } from ".././styles";
import {
  Row,
  Image,
  Icons,
  Col,
  Typography,
} from "../../../../../antd_components";
import { darkPallete } from "../../../../../styles/pallete";

const Rooms = ({ rooms, pallete }) => {
  const { Title } = Typography;

  function loadRoomThumb(thumb) {}

  return (
    <Row>
      {rooms &&
        rooms.map(({ title, description, thumb }) => (
          <Col span={window.innerWidth < 1024 ? 24 : 6}>
            <RoomItem
              margintop={window.innerWidth < 1024 ? "15px" : "20px"}
              background={darkPallete.lightblueOpacity}
            >
              <Row>
                <Col>
                  <Image src={loadRoomThumb(thumb)} height={60} width={60} />
                </Col>

                <Col>
                  <RoomTitle color={darkPallete.white}>
                    {title.length > 35 ? title.substring(0, 35) + "..." : title}
                  </RoomTitle>

                  <RoomDescription color={darkPallete.white}>
                    {description.length > 40
                      ? description.substring(0, 40) + "..."
                      : description}
                  </RoomDescription>
                </Col>
                <UserCount color={darkPallete.white}>
                  <Icons.UserOutlined /> 20
                </UserCount>
              </Row>
            </RoomItem>
          </Col>
        ))}

      {rooms && rooms.length === 0 && (
        <Title level={3} style={{ color: pallete.white }}>
          Nenhuma sala disponível
        </Title>
      )}
    </Row>
  );
};

export default Rooms;
