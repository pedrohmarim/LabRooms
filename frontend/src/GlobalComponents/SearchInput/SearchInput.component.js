import React from "react";
import { Tooltip } from "../../antd_components";
import { InputStyled } from "./searchInput.styled";

const SearchInput = ({
  background,
  color,
  width,
  onSearch,
  fromLandingPage,
}) => (
  <Tooltip
    color={color}
    title='Pesquise por um tema para encontrar salas'
    placement='bottomLeft'
    defaultVisible={window.innerWidth < 1024 && fromLandingPage}
  >
    <InputStyled
      onSearch={onSearch}
      width={width}
      size='large'
      background={background}
      placeholder='Procurar tema...'
    />
  </Tooltip>
);

export default SearchInput;
