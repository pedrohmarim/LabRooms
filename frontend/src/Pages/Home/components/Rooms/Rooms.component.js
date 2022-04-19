import React from "react";
import { Container, StyledCol, Divider } from "./styles";
import * as HomeService from "../../services/home.service";
import { darkPallete } from "../../../../styles/pallete";
import SearchInput from "../../../../GlobalComponents/SearchInput/SearchInput.component";
import RoomList from "./components/RoomList.component";
import { CategoryTitle } from "../../../CreateRoom/CreateRoom.styled";
import { Loading } from "../../../../GlobalComponents/Loading/Loading.component";
import { TIPO_HOMEARRAY } from "../../../../Helpers/TipoHomeArray";
import CreateRoomButton from "../../../../GlobalComponents/CreateRoomButton/CreateRoomButton.component";
import {
  Row,
  Select,
  Tooltip,
  FeatherIcons,
  BackTop,
} from "../../../../antd_components";
import { TIPO_CADASTRO } from "../../../../Helpers/TipoCadastro";

const Rooms = ({ pallete, searchValue, userContext }) => {
  const {
    user,
    loading,
    setLoadingRooms,
    setRooms,
    rooms,
    recomendedRooms,
    loadingRooms,
    loadingRecomendedRooms,
    recomendedUsers,
    loadingRecomendedUsers,
    categories,
    users,
    loadingUsers,
  } = userContext;

  function handleFilterRoom(categoryId) {
    setLoadingRooms(true);

    HomeService.getRoomsByCategory(categoryId).then(({ data }) => {
      const { rooms, loading } = data;
      setRooms(rooms);
      setLoadingRooms(loading);
    });
  }

  return (
    <Container background={pallete.white}>
      <BackTop pallete={pallete} />

      <Row justify='space-between' align='middle'>
        <StyledCol span={window.innerWidth > 1024 ? 21 : 24}>
          <SearchInput
            background={pallete.white}
            onSearch={() => console.log("faz req pro back")}
            searchValue={searchValue}
            color={pallete.lightblue}
            width={window.innerWidth > 1024 ? "25%" : "100%"}
          />

          {user && !loading ? (
            <CreateRoomButton
              color={darkPallete.white}
              backgroundcolor={darkPallete.lightblueOpacity}
              tooltip={darkPallete.lightblue}
            />
          ) : (
            !user && loading && Loading(pallete.white, "0 0 0 10px")
          )}
        </StyledCol>

        {categories ? (
          <Tooltip
            title='Filtrar Projetos'
            placement='left'
            color={pallete.lightblue}
          >
            <Select
              id='rooms'
              onChange={handleFilterRoom}
              width={window.innerWidth > 1024 ? "12%" : "100%"}
              margintop={window.innerWidth < 1024 ? "10px" : "0"}
              getPopupContainer={(trigger) => trigger.parentNode}
              placeholder='Filtrar por Categoria'
              size='middle'
            >
              <Select.Option key={10} value={10}>
                <Row align='middle' justify='start'>
                  <FeatherIcons icon='list' size={15} />
                  <CategoryTitle>Todos</CategoryTitle>
                </Row>
              </Select.Option>
              {categories
                .sort((a, b) =>
                  a.Title > b.Title ? 1 : b.Title > a.Title ? -1 : 0
                )
                .map(({ Title, _id, Icon }) => (
                  <Select.Option key={_id} value={_id}>
                    <Row align='middle' justify='start'>
                      <FeatherIcons icon={Icon} size={15} />
                      <CategoryTitle>{Title}</CategoryTitle>
                    </Row>
                  </Select.Option>
                ))}
              <Select.Option key={11} value={11}>
                <Row align='middle' justify='start'>
                  <FeatherIcons icon='repeat' size={15} />
                  <CategoryTitle>Outras</CategoryTitle>
                </Row>
              </Select.Option>
            </Select>
          </Tooltip>
        ) : (
          Loading(darkPallete.white)
        )}
      </Row>
      <Divider />

      {!user && (
        <>
          <RoomList
            userId={user?._id}
            arrayToRender={rooms}
            arrayType={TIPO_HOMEARRAY.PROJETOS_RECENTES}
            loadingArray={loadingRooms}
            pallete={pallete}
          />

          <RoomList
            userId={user?._id}
            arrayToRender={users}
            arrayType={TIPO_HOMEARRAY.USUARIOS_DISPONIVEIS}
            loadingArray={loadingUsers}
            pallete={pallete}
          />
        </>
      )}

      {user && user?.accountType === TIPO_CADASTRO.FREELANCER && (
        <>
          <RoomList
            arrayType={TIPO_HOMEARRAY.PROJETOS_RECOMENDADOS}
            userId={user?._id}
            arrayToRender={recomendedRooms}
            loadingArray={loadingRecomendedRooms}
            pallete={pallete}
          />

          <RoomList
            userId={user?._id}
            arrayToRender={rooms}
            arrayType={TIPO_HOMEARRAY.PROJETOS_RECENTES}
            loadingArray={loadingRooms}
            pallete={pallete}
          />

          <RoomList
            userId={user?._id}
            arrayToRender={users}
            arrayType={TIPO_HOMEARRAY.USUARIOS_DISPONIVEIS}
            loadingArray={loadingUsers}
            pallete={pallete}
          />
        </>
      )}

      {user && user?.accountType === TIPO_CADASTRO.EMPRESA && (
        <>
          <RoomList
            userId={user?._id}
            arrayToRender={recomendedUsers}
            arrayType={TIPO_HOMEARRAY.USUARIOS_RECOMENDADOS}
            loadingArray={loadingRecomendedUsers}
            pallete={pallete}
          />

          <RoomList
            userId={user?._id}
            arrayToRender={users}
            arrayType={TIPO_HOMEARRAY.USUARIOS_DISPONIVEIS}
            loadingArray={loadingUsers}
            pallete={pallete}
          />

          <RoomList
            userId={user?._id}
            arrayToRender={rooms}
            arrayType={TIPO_HOMEARRAY.PROJETOS_RECENTES}
            loadingArray={loadingRooms}
            pallete={pallete}
          />
        </>
      )}
    </Container>
  );
};

export default Rooms;
