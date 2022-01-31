import React, { useEffect, useState } from "react";
import { Container } from "./styles";
import * as HomeService from "../../services/home.service";
import { Link } from "react-router-dom";
import { darkPallete } from "../../../../styles/pallete";
import SearchInput from "../../../../GlobalComponents/SearchInput/SearchInput.component";
import RoomList from "./components/RoomList.component";
import {
  Row,
  Select,
  Tooltip,
  Divider,
  Button,
  Icons,
  Col,
} from "../../../../antd_components";

const Rooms = ({ pallete, searchValue, user }) => {
  const [rooms, setRooms] = useState();

  useEffect(() => {
    HomeService.getRooms().then((res) => {
      setRooms(res.data);
    });
  }, []);

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
          {user && (
            <Link to='/createroom'>
              <Button
                style={{
                  fontWeight: 400,
                  marginLeft: "15px",
                  background: darkPallete.lightblueOpacity,
                  color: darkPallete.white,
                }}
                icon={<Icons.PlusOutlined />}
              >
                Criar sala
              </Button>
            </Link>
          )}
        </Col>

        <Tooltip title='Filtrar salas' color={pallete.lightblue}>
          <Select
            id='rooms'
            width={window.innerWidth > 1024 ? "12%" : "100%"}
            margintop={window.innerWidth < 1024 ? "10px" : "0"}
            getPopupContainer={(trigger) => trigger.parentNode}
            showSearch
            optionFilterProp='children'
            placeholder='Filtrar...'
            size='middle'
          >
            {/* usar groupd */}
            <Select.Option value='teste'>teste</Select.Option>
          </Select>
        </Tooltip>
      </Row>

      <Divider
        style={{
          margin: window.innerWidth < 1024 ? "20px 0 5px 0" : "25px 0 0 0",
          border: "solid 1px rgba(255,255,255,0.1)",
        }}
      />

      <RoomList rooms={rooms} pallete={pallete} />
    </Container>
  );
};

export default Rooms;
