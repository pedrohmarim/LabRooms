import React, { useEffect, useState } from "react";
import { Container } from "./styles";
import * as HomeService from "../../services/home.service";
import { Link } from "react-router-dom";
import { darkPallete } from "../../../../styles/pallete";
import SearchInput from "../../../../GlobalComponents/SearchInput/SearchInput.component";
import RoomList from "./components/RoomList.component";
import { Loading } from "../../../../GlobalComponents/Loading/Loading.component";
import {
  Row,
  Select,
  Tooltip,
  Divider,
  Button,
  FeatherIcons,
  Col,
} from "../../../../antd_components";
import * as CreateRoomService from "../../../CreateRoom/services/createroom.service";

const Rooms = ({ pallete, searchValue, userContext }) => {
  const [rooms, setRooms] = useState();
  const [loadingRooms, setLoadingRooms] = useState(true);
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
      <Row justify='space-between' align='middle'>
        <Col
          span={window.innerWidth > 1024 ? 21 : 24}
          style={{ display: "flex", alignItems: "center" }}
        >
          <SearchInput
            background={pallete.white}
            onSearch={() => console.log("faz req pro back")}
            searchValue={searchValue}
            color={pallete.lightblue}
            width={window.innerWidth > 1024 ? "25%" : "100%"}
          />
          {user && !loading ? (
            <Link to='/createroom'>
              <Tooltip title='Crie uma nova sala' color={pallete.lightblue}>
                <Button
                  style={{
                    fontWeight: 400,
                    marginLeft: "15px",
                    background: darkPallete.lightblueOpacity,
                    color: darkPallete.white,
                  }}
                  icon={<FeatherIcons icon='plus' size={20} />}
                >
                  <span style={{ marginLeft: "5px" }}>Criar sala</span>
                </Button>
              </Tooltip>
            </Link>
          ) : (
            !user && loading && Loading(pallete.white, "0 0 0 10px")
          )}
        </Col>

        {categories ? (
          <Tooltip
            title='Filtrar salas'
            placement='left'
            color={pallete.lightblue}
          >
            <Select
              id='rooms'
              onChange={handleFilterRoom}
              width={window.innerWidth > 1024 ? "12%" : "100%"}
              margintop={window.innerWidth < 1024 ? "10px" : "0"}
              getPopupContainer={(trigger) => trigger.parentNode}
              placeholder='Filtrar...'
              size='middle'
            >
              <Select.Option key={10} value={10}>
                <Row align='middle' justify='start'>
                  <FeatherIcons icon='list' size={15} />
                  <span style={{ margin: "2px 0 0 5px" }}>Todas</span>
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
                      <span style={{ margin: "2px 0 0 5px" }}>{Title}</span>
                    </Row>
                  </Select.Option>
                ))}
              <Select.Option key={11} value={11}>
                <Row align='middle' justify='start'>
                  <FeatherIcons icon='repeat' size={15} />
                  <span style={{ margin: "2px 0 0 5px" }}>Outras</span>
                </Row>
              </Select.Option>
            </Select>
          </Tooltip>
        ) : (
          Loading(darkPallete.white)
        )}
      </Row>

      <Divider
        style={{
          margin: window.innerWidth < 1024 ? "20px 0 5px 0" : "25px 0 0 0",
          border: "solid 1px rgba(255,255,255,0.1)",
        }}
      />

      <RoomList rooms={rooms} loadingRooms={loadingRooms} pallete={pallete} />
    </Container>
  );
};

export default Rooms;
