import React from "react";
import { FeatherIcons, Tooltip, Select, Row } from "../../antd_components";
import { CategoryTitle } from "../../Pages/CreateRoom/CreateRoom.styled";

const HandleFilter = ({ pallete, handleFilterRoom, categories }) => {
  return (
    <Tooltip
      title='Filtrar por Categoria'
      placement='left'
      color={pallete.lightblue}
    >
      <Select
        id='rooms'
        width='100%'
        onChange={handleFilterRoom}
        margintop='10px'
        getPopupContainer={(trigger) => trigger.parentNode}
        placeholder='Filtrar por Categoria'
        size='middle'
      >
        <Select.Option key={10} value={10}>
          <Row align='middle' justify='start'>
            <FeatherIcons icon='list' size={15} />
            <CategoryTitle>Todos</CategoryTitle>
          </Row>
        </Select.Option>
        {categories &&
          categories
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
  );
};

export default HandleFilter;
