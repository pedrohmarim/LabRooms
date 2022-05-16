import React from "react";
import { Input, FormItem } from "./searchInput.styled";
import { Tooltip, FeatherIcons, Form } from "../../antd_components";

const SearchInput = ({
  color,
  width,
  onSearch,
  fromLandingPage,
  searchValue,
  background,
  title = "Pesquisar Por Palavra Chave",
  placeholder = "Pesquisar",
}) => {
  return searchValue ? (
    <Form initialValues={{ roomSearchInput: searchValue }}>
      <Tooltip
        color={color}
        title={title}
        placement='bottomLeft'
        defaultVisible={window.innerWidth < 1024 && fromLandingPage}
      >
        <FormItem
          name='roomSearchInput'
          style={{ marginBottom: 0 }}
          width={window.innerWidth < 1024 ? window.innerWidth - 50 : 375}
        >
          <Input
            background={background}
            allowClear
            suffix={<FeatherIcons icon='search' size={15} />}
            onPressEnter={onSearch}
            width={width}
            size='large'
            placeholder={placeholder}
          />
        </FormItem>
      </Tooltip>
    </Form>
  ) : (
    <Tooltip
      color={color}
      title={title}
      placement='bottomLeft'
      defaultVisible={window.innerWidth < 1024 && fromLandingPage}
    >
      <Input
        allowClear
        background={background}
        suffix={<FeatherIcons icon='search' size={15} />}
        onPressEnter={onSearch}
        width={width}
        size='large'
        placeholder={placeholder}
      />
    </Tooltip>
  );
};

export default SearchInput;
