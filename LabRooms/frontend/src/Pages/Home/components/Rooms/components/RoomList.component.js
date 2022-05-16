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
import HandleFilter from "../../../../../GlobalComponents/HandleFilter/HandleFilter.component";
import { Loading } from "../../../../../GlobalComponents/Loading/Loading.component";

const RoomList = ({
  arrayToRender,
  arrayType,
  pallete,
  userId,
  loadingArray,
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
          const { arrayWithIcon, loading } = data;
          setUsers(arrayWithIcon);
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
          {loadingArray ? (
            <Row justify='center'>{Loading(pallete.white, "0 0 0 10px")}</Row>
          ) : (
            <ButtonText>
              {arrayType} ({arrayToRender?.length})
            </ButtonText>
          )}
        </TitleStyled>

        {(arrayType === TIPO_HOMEARRAY.PROJETOS_RECENTES ||
          arrayType === TIPO_HOMEARRAY.USUARIOS_DISPONIVEIS) && (
          <Col span={window.innerWidth > 1024 ? 3 : 24}>
            <HandleFilter
              handleFilterRoom={handleFilterRoom}
              categories={categories}
              pallete={pallete}
            />
          </Col>
        )}
      </Row>

      {loadingArray ? (
        <Row justify='center'>{Loading(pallete.white, "50px 0 0 10px")}</Row>
      ) : (
        <Row gutter={[4, 4]}>
          {arrayToRender && arrayToRender.length === 0 ? (
            <TitleStyled
              level={4}
              color={pallete.white}
              margintop={window.innerWidth < 1024 ? "15px" : "20px"}
            >
              {arrayType} não Foram Encontrados.
            </TitleStyled>
          ) : (
            arrayToRender &&
            arrayToRender.length > 0 && (
              <>
                {arrayToRender &&
                  arrayToRender.map(
                    ({
                      title,
                      _id,
                      ownerName,
                      username,
                      biography,
                      accountType,
                      subCategories,
                      newCategory,
                      CategorieTitle,
                      Icon,
                      imagePath,
                    }) => (
                      <Col
                        xs={12}
                        sm={12}
                        md={6}
                        lg={4}
                        xl={4}
                        xxl={3}
                        key={_id}
                      >
                        <Link
                          to={
                            accountType
                              ? `profile/${_id}`
                              : `view/project/${_id}`
                          }
                        >
                          <RoomItem background={darkPallete.lightblueOpacity}>
                            <RoomTitle color={darkPallete.white}>
                              {title || username}
                            </RoomTitle>

                            {accountType && (
                              <CategorieProject
                                color={darkPallete.white}
                                align='middle'
                              >
                                <FeatherIcons icon={Icon} size={18} />
                                <ButtonText>{CategorieTitle}</ButtonText>
                              </CategorieProject>
                            )}

                            <RoomOwner
                              color={darkPallete.white}
                              margin={
                                !ownerName ? "0 0 15px 0" : "0 0 15px 30px"
                              }
                            >
                              {ownerName ||
                                biography ||
                                "Biografia não informada"}
                            </RoomOwner>

                            {ownerName && (
                              <RoomOwnerImg
                                alt='Image'
                                gap={2}
                                src={`${
                                  window.location.href.split(":3000")[0]
                                }:4000/${imagePath}`}
                                preview={false}
                              />
                            )}

                            {!ownerName && (
                              <RoomImage
                                height={210}
                                src={`${
                                  window.location.href.split(":3000")[0]
                                }:4000/${imagePath}`}
                                preview={false}
                              />
                            )}

                            {!accountType && (
                              <CategorieProject
                                color={darkPallete.white}
                                align='middle'
                              >
                                <FeatherIcons icon={Icon} size={18} />
                                <ButtonText>{CategorieTitle}</ButtonText>
                              </CategorieProject>
                            )}

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
      )}
    </>
  );
};

export default RoomList;