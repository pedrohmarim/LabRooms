import React, { useContext } from "react";
import { Row, FeatherIcons, Col } from "../../../../../antd_components";
import * as HomeService from "../../../services/home.service";
import { UserContext } from "../../../../../Context/UserContext";
import { TIPO_HOMEARRAY } from "../../../../../Helpers/TipoHomeArray";
import HandleFilter from "../../../../../GlobalComponents/HandleFilter/HandleFilter.component";
import { Loading } from "../../../../../GlobalComponents/Loading/Loading.component";
import SwiperComp from "../../../../../GlobalComponents/Swiper/Swiper.component";
import { ButtonText, TitleStyled } from "../styles";

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
              <SwiperComp arrayToRender={arrayToRender} />
            )
          )}
        </Row>
      )}
    </>
  );
};

export default RoomList;
