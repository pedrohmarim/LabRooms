import React from "react";
import { RoomsContainer } from "./styles";
import { Row, Select, Tooltip } from "../../../../antd_components";

import SearchInput from "../../../../GlobalComponents/SearchInput/SearchInput.component";

const Rooms = ({ pallete, searchValue }) => {
  return (
    <RoomsContainer background={pallete.white} id='rooms'>
      <Row justify='space-between' align='middle'>
        <SearchInput
          onSearch={() => console.log('faz req pro back')}
          searchValue={searchValue}
          background={pallete.white}
          color={pallete.lightblue}
          width={window.innerWidth > 1024 ? "25%" : "100%"}
        />

        <Tooltip title='Filtrar salas' color={pallete.lightblue}>
          <Select
            width={window.innerWidth > 1024 ? "12%" : "100%"}
            margintop={window.innerWidth < 1024 && "10px "}
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
    </RoomsContainer>
  );
};

export default Rooms;
