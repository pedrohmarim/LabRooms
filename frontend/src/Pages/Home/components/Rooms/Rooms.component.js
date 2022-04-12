import React, { useEffect, useState } from "react";
import { Container, StyledCol, Divider } from "./styles";
import * as HomeService from "../../services/home.service";
import { darkPallete } from "../../../../styles/pallete";
import SearchInput from "../../../../GlobalComponents/SearchInput/SearchInput.component";
import RoomList from "./components/RoomList.component";
import RecomendedRoomList from "./components/RecomendedRoomList.component";
import { CategoryTitle } from "../../../CreateRoom/CreateRoom.styled";
import { Loading } from "../../../../GlobalComponents/Loading/Loading.component";
import CreateRoomButton from "../../../../GlobalComponents/CreateRoomButton/CreateRoomButton.component";
import * as CreateRoomService from "../../../CreateRoom/services/createroom.service";
import {
  Row,
  Select,
  Tooltip,
  FeatherIcons,
  BackTop,
} from "../../../../antd_components";
import { TIPO_CADASTRO } from "../../../../Helpers/TipoCadastro";

const Rooms = ({ pallete, searchValue, userContext }) => {
  const [rooms, setRooms] = useState();
  const [recomendedRooms, setRecomendedRooms] = useState();
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loadingRecomendedRooms, setLoadingRecomendedRooms] = useState(true);
  const [categories, setCategories] = useState();
  const { user, loading } = userContext;

  useEffect(() => {
    HomeService.getRooms().then(({ data }) => {
      const { rooms, loading } = data;
      setRooms(rooms);
      setLoadingRooms(loading);
    });

    CreateRoomService.getCategories().then(({ data }) => {
      setCategories(data);
    });
  }, []);  
  
  useEffect(() => {
    if (user) {
      HomeService.getRecomendedRooms( user?.newCategory,
      user?.categoryId,
        user?.subCategories).then(({ data }) => {
        const { recomendedRooms, loading } = data;
        setRecomendedRooms(recomendedRooms);
        setLoadingRecomendedRooms(loading);
      });
    }
  }, [user]);

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
                  <CategoryTitle>Todas</CategoryTitle>
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
      
      {user && user?.accountType === TIPO_CADASTRO.FREELANCER && recomendedRooms?.length > 0 && (
        <>
          <RecomendedRoomList recomendedRooms={recomendedRooms} loadingRecomendedRooms={loadingRecomendedRooms} pallete={pallete} />
          <RoomList rooms={rooms}loadingRooms={loadingRooms} pallete={pallete} />
        </>
      )}
    </Container>
  );
};

export default Rooms;
