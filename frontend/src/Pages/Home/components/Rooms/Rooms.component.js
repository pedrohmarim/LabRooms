import React from "react";
import { Container, StyledCol, Divider } from "./styles";
import { darkPallete } from "../../../../styles/pallete";
import SearchInput from "../../../../GlobalComponents/SearchInput/SearchInput.component";
import RoomList from "./components/RoomList.component";
import { Loading } from "../../../../GlobalComponents/Loading/Loading.component";
import { TIPO_HOMEARRAY } from "../../../../Helpers/TipoHomeArray";
import CreateRoomButton from "../../../../GlobalComponents/CreateRoomButton/CreateRoomButton.component";
import { Row, BackTop } from "../../../../antd_components";
import { TIPO_CADASTRO } from "../../../../Helpers/TipoCadastro";

const Rooms = ({ pallete, searchValue, userContext }) => {
  const {
    user,
    loading,
    rooms,
    recomendedRooms,
    loadingRooms,
    loadingRecomendedRooms,
    recomendedUsers,
    loadingRecomendedUsers,
    users,
    loadingUsers,
  } = userContext;

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
