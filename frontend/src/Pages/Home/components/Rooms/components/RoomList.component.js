import React from "react";
import { Row, FeatherIcons, Col } from "../../../../../antd_components";
import { darkPallete } from "../../../../../styles/pallete";
import { Link } from "react-router-dom";
import { Loading } from "../../../../../GlobalComponents/Loading/Loading.component";
import {
  RoomItem,
  RoomTitle,
  TitleStyled,
  ButtonText,
  RoomOwner,
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
      <Row gutter={[4, 4]}>
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
                  <ButtonText>Recomendados ({rooms.length})</ButtonText>
                </TitleStyled>
              </Col>

              {rooms &&
                rooms.map(({ title, thumb, _id, ownerName }) => (
                  <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={3} key={_id}>
                    <Link to={`view/project/${_id}`}>
                      <RoomItem background={darkPallete.lightblueOpacity}>
                        <RoomTitle color={darkPallete.white}>
                          {title || "Título não informado"}
                        </RoomTitle>

                        <RoomOwner color={darkPallete.white}>
                          {ownerName || "Empresa não informada"}
                        </RoomOwner>

                        <RoomOwnerImg
                          alt='RoomOwnerProfilePhoto'
                          gap={2}
                          src='https://media.istockphoto.com/photos/red-squirrel-looking-around-a-tree-picture-id466395505?k=20&m=466395505&s=612x612&w=0&h=ELSnLKu_E2-pc0q_bfGRadTZwYE1f7jq4TWTyHu1gkI='
                          preview={false}
                        />
                        <RoomImage
                          src={
                            thumb ||
                            "https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/996/notfound.png"
                          }
                          preview={false}
                        />
                      </RoomItem>
                    </Link>
                  </Col>
                ))}

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
            </>
          )
        )}
      </Row>
    </>
  );
};

export default Rooms;
