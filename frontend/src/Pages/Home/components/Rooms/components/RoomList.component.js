import React from "react";
import {
  RoomItem,
  RoomTitle,
  RoomDescription,
  UserCount,
  TitleStyled,
} from "../styles";
import { Row, Image, FeatherIcons, Col } from "../../../../../antd_components";
import { darkPallete } from "../../../../../styles/pallete";
import { Link } from "react-router-dom";
import { Loading } from "../../../../../GlobalComponents/Loading/Loading.component";

const Rooms = ({ rooms, loadingRooms, pallete }) => {
  function loadRoomThumb(thumb) {
    console.log(thumb);
  }

  return (
    <>
      {loadingRooms && (
        <Row justify='center' style={{ marginTop: "20px" }}>
          {Loading("#fff")}
        </Row>
      )}
      <Row>
        {rooms && !loadingRooms && rooms.length === 0 ? (
          <TitleStyled
            level={4}
            color={pallete.white}
            margintop={window.innerWidth < 1024 ? "15px" : "20px"}
          >
            Nenhuma sala encontrada
          </TitleStyled>
        ) : (
          rooms &&
          !loadingRooms &&
          rooms.length > 0 && (
            <>
              <Col span={24}>
                <TitleStyled
                  level={3}
                  color={pallete.white}
                  margintop={window.innerWidth < 1024 ? "15px" : "20px"}
                >
                  <FeatherIcons icon='check-circle' size={28} />
                  <span style={{ marginLeft: "5px" }}>Salas disponíveis</span>
                </TitleStyled>
              </Col>

              {rooms &&
                rooms.map(({ title, description, thumb, _id }) => (
                  <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6} key={_id}>
                    <Link to={`chatroom/${_id}`}>
                      <RoomItem background={darkPallete.lightblueOpacity}>
                        <Image
                          src={loadRoomThumb(thumb)}
                          height={60}
                          width={60}
                          preview={false}
                        />

                        <Col>
                          <RoomTitle color={darkPallete.white}>
                            {title}
                          </RoomTitle>

                          <RoomDescription color={darkPallete.white}>
                            {description}
                          </RoomDescription>
                        </Col>

                        <UserCount color={darkPallete.white}>
                          <FeatherIcons icon='users' size={15} />
                          <span style={{ margin: "2.5px 0 0 3px" }}>20</span>
                        </UserCount>
                      </RoomItem>
                    </Link>
                  </Col>
                ))}
            </>
          )
        )}
      </Row>
    </>
  );
};

export default Rooms;
