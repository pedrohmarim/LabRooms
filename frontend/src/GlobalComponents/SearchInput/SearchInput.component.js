import React from "react";
import { Input, FormItem } from "./searchInput.styled";
import { Tooltip, Icons, Form } from "../../antd_components";

const SearchInput = ({
  color,
  width,
  onSearch,
  fromLandingPage,
  searchValue,
}) => {
  return searchValue ? (
    <Form initialValues={{ roomSearchInput: searchValue && searchValue }}>
      <Tooltip
        color={color}
        title='Pesquise por um tema para encontrar salas'
        placement='bottomLeft'
        defaultVisible={window.innerWidth < 1024 && fromLandingPage}
      >
        <FormItem
          name='roomSearchInput'
          style={{ marginBottom: 0 }}
          width={window.innerWidth < 1024 ? window.innerWidth - 50 : 375}
        >
          <Input
            allowClear
            suffix={<Icons.SearchOutlined />}
            onPressEnter={onSearch}
            width={width}
            size='large'
            placeholder='Procurar tema...'
          />
        </FormItem>
      </Tooltip>
    </Form>
  ) : (
    <Tooltip
      color={color}
      title='Pesquise por um tema para encontrar salas'
      placement='bottomLeft'
      defaultVisible={window.innerWidth < 1024 && fromLandingPage}
    >
      <Input
        allowClear
        suffix={<Icons.SearchOutlined />}
        onPressEnter={onSearch}
        width={width}
        size='large'
        placeholder='Procurar tema...'
      />
    </Tooltip>
  );
};

export default SearchInput;
