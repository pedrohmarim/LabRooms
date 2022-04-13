import React from "react";
import { Row, FeatherIcons, Col } from "../../../../../antd_components";
import { darkPallete } from "../../../../../styles/pallete";
import { Link } from "react-router-dom";
import { Loading } from "../../../../../GlobalComponents/Loading/Loading.component";
import { TIPO_HOMEARRAY } from "../../../../../Helpers/TipoHomeArray";
import {
  RoomItem,
  RoomTitle,
  TitleStyled,
  ButtonText,
  RoomOwner,
  RoomImage,
  RoomOwnerImg,
} from "../styles";
import { LinkStyled } from "../../../../Signin/Signin.component.styled";

const RoomList = ({
  arrayToRender,
  loadingArray,
  arrayType,
  pallete,
  userId,
}) => {
  return (
    <>
      {loadingArray ? (
        <Row justify='center'>
          <TitleStyled level={4} color={pallete.white} margintop='28px'>
            {Loading("#fff")}
          </TitleStyled>
        </Row>
      ) : (
        <Col span={24}>
          <TitleStyled
            level={3}
            color={pallete.white}
            margintop={window.innerWidth < 1024 ? "15px" : "20px"}
          >
            <FeatherIcons icon='check-circle' size={28} />
            <ButtonText>
              {arrayType} ({arrayToRender?.length})
            </ButtonText>
          </TitleStyled>
        </Col>
      )}

      <Row gutter={[4, 4]}>
        {arrayToRender && !loadingArray && arrayToRender.length === 0 ? (
          <TitleStyled
            level={4}
            color={pallete.white}
            margintop={window.innerWidth < 1024 ? "15px" : "20px"}
          >
            {arrayType} não Foram Encontrados.
            <LinkStyled to={`/profile/${userId}`} marginleft='10px'>
              {arrayType === TIPO_HOMEARRAY.PROJETOS_RECOMENDADOS
                ? "Atualizar Habilidades"
                : "Atualizar Informações"}
            </LinkStyled>
          </TitleStyled>
        ) : (
          arrayToRender &&
          !loadingArray &&
          arrayToRender.length > 0 && (
            <>
              {arrayToRender &&
                arrayToRender.map(
                  ({
                    title,
                    thumb,
                    _id,
                    ownerName,
                    username,
                    biography,
                    accountType,
                  }) => (
                    <Col xs={12} sm={12} md={6} lg={4} xl={3} xxl={3} key={_id}>
                      <Link
                        to={
                          accountType ? `profile/${_id}` : `view/project/${_id}`
                        }
                      >
                        <RoomItem background={darkPallete.lightblueOpacity}>
                          <RoomTitle color={darkPallete.white}>
                            {title || username}
                          </RoomTitle>

                          <RoomOwner color={darkPallete.white}>
                            {ownerName ||
                              biography ||
                              "Biografia não informada"}
                          </RoomOwner>

                          <RoomOwnerImg
                            alt='Image'
                            gap={2}
                            src={
                              thumb ||
                              "https://media.istockphoto.com/photos/red-squirrel-looking-around-a-tree-picture-id466395505?k=20&m=466395505&s=612x612&w=0&h=ELSnLKu_E2-pc0q_bfGRadTZwYE1f7jq4TWTyHu1gkI="
                            }
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
                  )
                )}
            </>
          )
        )}
      </Row>
    </>
  );
};

export default RoomList;
