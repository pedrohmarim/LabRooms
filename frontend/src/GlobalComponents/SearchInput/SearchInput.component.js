import React from "react";
import { Tooltip, Icons } from "../../antd_components";
import { InputStyled } from "./searchInput.styled";

const SearchInput = ({
  color,
  width,
  onSearch,
  fromLandingPage,
  searchValue
}) => (
  <Tooltip
    color={color}
    title='Pesquise por um tema para encontrar salas'
    placement='bottomLeft'
    defaultVisible={window.innerWidth < 1024 && fromLandingPage}
  >
    <InputStyled
      value={searchValue}
      allowClear
      prefix={<Icons.SearchOutlined />}
      onPressEnter={onSearch}
      width={width}
      size='large'
      placeholder='Procurar tema...'
    />
  </Tooltip>
);

export default SearchInput;
