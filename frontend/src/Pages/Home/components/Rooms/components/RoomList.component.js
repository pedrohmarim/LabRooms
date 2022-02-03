import React from "react";
import { RoomItem, RoomTitle, RoomDescription, UserCount } from ".././styles";
import {
  Row,
  Image,
  FeatherIcons,
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
        rooms.map(({ title, description, thumb, categoryId, owner, _id }) => (
          <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6} key={_id}>
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

              <UserCount color={darkPallete.white}>
                <FeatherIcons icon='users' size={15} />
                <span style={{ margin: "2.5px 0 0 3px" }}>20</span>
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
          Nenhuma sala encontrada
        </Title>
      )}
    </Row>
  );
};

export default Rooms;
