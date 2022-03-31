import React from "react";
import { Row, FeatherIcons, Col } from "../../../../../antd_components";
import { darkPallete } from "../../../../../styles/pallete";
import { Link } from "react-router-dom";
import { Loading } from "../../../../../GlobalComponents/Loading/Loading.component";
import {
  RoomItem,
  RoomTitle,
  RoomDescription,
  TitleStyled,
  ButtonText,
  RoomImage,
  RoomOwnerImg,
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
            Nenhum Projeto Encontrado.
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
                  <ButtonText>Projetos disponíveis ({rooms.length})</ButtonText>
                </TitleStyled>
              </Col>

              {rooms &&
                rooms.map(({ title, description, thumb, _id }) => (
                  <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={4} key={_id}>
                    <Link to={`chatroom/${_id}`}>
                      <RoomItem background={darkPallete.lightblueOpacity}>
                        <RoomImage
                          src='https://img.r7.com/images/cachorro-que-parece-pompom-13012022171412951?dimensions=771x420'
                          preview={false}
                        />

                        <RoomOwnerImg
                          alt='RoomOwnerProfilePhoto'
                          gap={2}
                          src='https://media.istockphoto.com/photos/red-squirrel-looking-around-a-tree-picture-id466395505?k=20&m=466395505&s=612x612&w=0&h=ELSnLKu_E2-pc0q_bfGRadTZwYE1f7jq4TWTyHu1gkI='
                          preview={false}
                        />

                        <RoomTitle color={darkPallete.white}>{title}</RoomTitle>

                        <RoomDescription color={darkPallete.white}>
                          {description}
                        </RoomDescription>
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
