import React from "react";
import { Select, Row, FeatherIcons, Typography } from "../../antd_components";
import TagRender from "../TagRender/TagRender.component";
import { FormItem } from "../../Pages/Signup/components/SignupForm/Signup.form.styled";
import {
  CategoryTitle,
  CategoryInfo,
} from "../../Pages/CreateRoom/CreateRoom.styled";
import { StyledInput } from "../../Pages/CreateRoom/CreateRoom.styled";

const CategoriesSubcategoriesSelect = ({
  handleSelectChange,
  categories,
  newCategory,
  subCategories,
  labelMainCategory,
}) => {
  return (
    <>
      <FormItem
        label={labelMainCategory}
        name='category'
        rules={[{ required: true, message: "Campo obrigatório." }]}
      >
        <Select
          allowClear
          getPopupContainer={(trigger) => trigger.parentNode}
          placeholder='Ex.: Desenvolvedor'
          onChange={handleSelectChange}
        >
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
              <CategoryTitle>
                Outras
                <CategoryInfo>- Poderá criar uma nova categoria</CategoryInfo>
              </CategoryTitle>
            </Row>
          </Select.Option>
        </Select>
      </FormItem>

      {!newCategory && (
        <FormItem
          label='Subcategorias'
          name='subCategories'
          rules={[{ required: true, message: "Campo obrigatório." }]}
        >
          <Select
            allowClear
            getPopupContainer={(trigger) => trigger.parentNode}
            notFoundContent={
              <Row
                justify='center'
                align='middle'
                style={{ marginBottom: "-10px" }}
              >
                <Typography level={5}>
                  Selecione uma Categoria para as Opções Serem Disponibilizadas
                </Typography>
              </Row>
            }
            mode='multiple'
            showArrow
            placeholder='Selecionar subcategorias'
            tagRender={TagRender}
            style={{ width: "100%" }}
            options={subCategories}
          />
        </FormItem>
      )}

      {newCategory && (
        <FormItem
          label='Nova Categoria'
          name='newCategory'
          rules={[{ required: true, message: "Campo obrigatório." }]}
        >
          <StyledInput
            allowClear
            prefix={<FeatherIcons icon='tag' size={15} />}
            placeholder='Ex.: Construções'
          />
        </FormItem>
      )}
    </>
  );
};

export default CategoriesSubcategoriesSelect;
