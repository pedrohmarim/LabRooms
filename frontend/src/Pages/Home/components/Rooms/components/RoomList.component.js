import React from "react";
import { Row, FeatherIcons, Col } from "../../../../../antd_components";
import { darkPallete } from "../../../../../styles/pallete";
import { Link } from "react-router-dom";
import { Loading } from "../../../../../GlobalComponents/Loading/Loading.component";
import {
  RoomItem,
  RoomTitle,
  RoomDescription,
  UserCount,
  TitleStyled,
  ButtonText,
  UsersNumber,
  RoomImage,
} from "../styles";

const Rooms = ({ rooms, loadingRooms, pallete }) => {
  return (
    <>
      {loadingRooms && (
        <Row justify='center'>
          <TitleStyled level={4} color={pallete.white} margintop='28px'>
            {Loading("#fff")}
          </TitleStyled>
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
                  <ButtonText>Salas disponíveis ({rooms.length})</ButtonText>
                </TitleStyled>
              </Col>

              {rooms &&
                rooms.map(({ title, description, thumb, _id }) => (
                  <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={4} key={_id}>
                    <Link to={`chatroom/${_id}`}>
                      <RoomItem background={darkPallete.lightblueOpacity}>
                        <RoomImage
                          src="https://img.r7.com/images/cachorro-que-parece-pompom-13012022171412951?dimensions=771x420"
                          preview={false}
                        />

                        <RoomTitle color={darkPallete.white}>
                          {title}
                        </RoomTitle>

                        <RoomDescription color={darkPallete.white}>
                          {description}
                        </RoomDescription>

                        <UserCount color={darkPallete.white}>
                          <FeatherIcons icon='users' size={15} />
                          <UsersNumber>20</UsersNumber>
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
