import React from "react";
import { Icons, Tooltip } from "../../antd_components";
import { InputStyled } from "./searchInput.styled";

const SearchInput = ({ background, color }) => (
  <Tooltip
    color={color}
    title='Pesquise por um tema para encontrar salas'
    placement='bottomLeft'
    defaultVisible={window.innerWidth < 1024}
  >
    <InputStyled
      size='large'
      background={background}
      placeholder='Procurar tema...'
      suffix={<Icons.SearchOutlined />}
    />
  </Tooltip>
);

export default SearchInput;
