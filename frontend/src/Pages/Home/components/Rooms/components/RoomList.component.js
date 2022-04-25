import React, { useContext } from "react";
import { Row, FeatherIcons, Col } from "../../../../../antd_components";
import * as HomeService from "../../../services/home.service";
import { UserContext } from "../../../../../Context/UserContext";
import TagRender from "../../../../../GlobalComponents/TagRender/TagRender.component";
import { darkPallete } from "../../../../../styles/pallete";
import { Link } from "react-router-dom";
import { TIPO_HOMEARRAY } from "../../../../../Helpers/TipoHomeArray";
import {
  RoomItem,
  RoomTitle,
  TitleStyled,
  ButtonText,
  RoomOwner,
  RoomImage,
  RoomOwnerImg,
  StyledRowTags,
  CategorieProject,
} from "../styles";
import { LinkStyled } from "../../../../Signin/Signin.component.styled";
import HandleFilter from "../../../../../GlobalComponents/HandleFilter/HandleFilter.component";

const RoomList = ({
  arrayToRender,
  arrayType,
  pallete,
  userId,
}) => {
  const { setLoadingRooms, setRooms, categories, setUsers, setLoadingUsers } =
    useContext(UserContext);

  function handleFilterRoom(categoryId) {
    switch (arrayType) {
      case TIPO_HOMEARRAY.PROJETOS_RECENTES:
        setLoadingRooms(true);

        HomeService.getRoomsByCategory(categoryId).then(({ data }) => {
          const { arrayWithIcon, loading } = data;
          setRooms(arrayWithIcon);
          setLoadingRooms(loading);
        });
        break;

      case TIPO_HOMEARRAY.USUARIOS_DISPONIVEIS:
        setLoadingUsers(true);

        HomeService.getUsersByCategory(categoryId, userId).then(({ data }) => {
          const { usersWithIcon, loading } = data;
          setUsers(usersWithIcon);
          setLoadingUsers(loading);
        });
        break;

      default:
        break;
    }
  }
  return (
    <>
      <Row align='middle' justify='space-between'>
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

        {(arrayType === TIPO_HOMEARRAY.PROJETOS_RECENTES ||
          arrayType === TIPO_HOMEARRAY.USUARIOS_DISPONIVEIS) && (
          <HandleFilter
            handleFilterRoom={handleFilterRoom}
            categories={categories}
            pallete={pallete}
            arrayType={arrayType}
            userId={userId}
          />
        )}
      </Row>

      <Row gutter={[4, 4]}>
        {arrayToRender && arrayToRender.length === 0 ? (
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
                    subCategories,
                    newCategory,
                    CategorieTitle,
                    Icon
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


                     {   accountType&&  <CategorieProject color={darkPallete.white} align="middle">
                            <FeatherIcons icon={Icon} size={18} />
                            <ButtonText>{CategorieTitle}</ButtonText>
                          </CategorieProject>}

                          <RoomOwner
                            color={darkPallete.white}
                            margin={!ownerName ? "0 0 15px 0" : "0 0 15px 30px"}
                          >
                            {ownerName ||
                              biography ||
                              "Biografia não informada"}
                          </RoomOwner>

                          {ownerName && (
                            <RoomOwnerImg
                              alt='Image'
                              gap={2}
                              src={
                                thumb ||
                                "https://media.istockphoto.com/photos/red-squirrel-looking-around-a-tree-picture-id466395505?k=20&m=466395505&s=612x612&w=0&h=ELSnLKu_E2-pc0q_bfGRadTZwYE1f7jq4TWTyHu1gkI="
                              }
                              preview={false}
                            />
                          )}

                          {!ownerName && (
                            <RoomImage
                              src={
                                thumb ||
                                "https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/996/notfound.png"
                              }
                              preview={false}
                            />
                          )}

{   !accountType&&  <CategorieProject color={darkPallete.white} align="middle">
                            <FeatherIcons icon={Icon} size={18} />
                            <ButtonText>{CategorieTitle}</ButtonText>
                          </CategorieProject>}

                          {ownerName && !newCategory ? (
                            <StyledRowTags align='middle'>
                              {subCategories &&
                                subCategories.map((data) => (
                                  <TagRender label={data} margin='10px 5px' />
                                ))}
                            </StyledRowTags>
                          ) : (
                            ownerName &&
                            newCategory && (
                              <StyledRowTags align='middle'>
                                <TagRender
                                  label={newCategory}
                                  margin='10px 5px'
                                />
                              </StyledRowTags>
                            )
                          )}
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
