import React from "react";
import { RoomsContainer } from "./styles";
import {
  Row,
  Select,
  Tooltip,
  Divider,
  Button,
  Icons,
  Col,
} from "../../../../antd_components";
import { Link } from 'react-router-dom';
import { darkPallete } from "../../../../styles/pallete";
import SearchInput from "../../../../GlobalComponents/SearchInput/SearchInput.component";

const Rooms = ({ pallete, searchValue, user }) => {
  return (
  <div style={{display: 'flex'}}>
    <RoomsContainer background={pallete.white} id='rooms'>
      <Row justify='space-between' align='middle' >
        <Col 
          span={window.innerWidth > 1024 ? 21 : 24} 
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <SearchInput
            onSearch={() => console.log("faz req pro back")}
            searchValue={searchValue}
            color={pallete.lightblue}
            width={window.innerWidth > 1024 ? "25%" : "100%"}
          />
          {!user && (
            <Link to="/createroom">
              <Button
                style={{
                  fontWeight: 400,
                  marginLeft: '15px',
                  background: darkPallete.lightblue,
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
        style={{ marginTop: "20px", border: "solid 1px rgba(255,255,255,0.1)" }}
      />
    </RoomsContainer>
  </div>
  );
};

export default Rooms;
