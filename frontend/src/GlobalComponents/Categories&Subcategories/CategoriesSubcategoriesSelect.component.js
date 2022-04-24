import React, { useEffect, useState } from "react";
import { TIPO_CATEGORIA } from "../../Helpers/TipoCategoria";
import * as ChatRoomService from "../../Pages/ChatRoom/services/ChatRoom.service";
import { Select, Row, FeatherIcons, Typography } from "../../antd_components";
import TagRender from "../TagRender/TagRender.component";
import { FormItem } from "../../Pages/Signup/components/SignupForm/Signup.form.styled";
import {
  CategoryTitle,
  CategoryInfo,
} from "../../Pages/CreateRoom/CreateRoom.styled";
import { StyledInput } from "../../Pages/CreateRoom/CreateRoom.styled";

const CategoriesSubcategoriesSelect = ({
  categoryIdFromUser,
  fromUserProfile,
  categories,
  labelMainCategory,
  form,
  editMode,
  viewMode,
  newCategoryFromUser,
  styleInput,
}) => {
  const [subCategories, setSubCategories] = useState([]);
  const [hideNewCategoryInput, setHideNewCategoryInput] = useState(true);
  const [hideSubCategoriesInput, setHideSubCategoriesInput] = useState(false);

  useEffect(() => {
    if (!categoryIdFromUser) {
      setHideSubCategoriesInput(true);
      setHideNewCategoryInput(false);
    } else {
      setHideSubCategoriesInput(false);
      setHideNewCategoryInput(true);
    }

    if (newCategoryFromUser) setHideNewCategoryInput(true);

    if (categoryIdFromUser) {
      ChatRoomService.getCategoryById(categoryIdFromUser).then(({ data }) => {
        const { SubCategories } = data;
        setSubCategories(SubCategories);
        setHideNewCategoryInput(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSelectChange(value) {
    form.setFieldsValue({
      subCategories: [],
    });

    if (
      value === TIPO_CATEGORIA.CATEGORIA_OUTRAS ||
      value === TIPO_CATEGORIA.CATEGORIA_CRIADA
    ) {
      setHideSubCategoriesInput(true);
      setHideNewCategoryInput(false);
      form.setFieldsValue({
        newCategory: null,
      });
    }

    if (
      value !== TIPO_CATEGORIA.CATEGORIA_OUTRAS &&
      value !== TIPO_CATEGORIA.CATEGORIA_CRIADA &&
      value !== TIPO_CATEGORIA.CATEGORIA_TODAS
    ) {
      ChatRoomService.getCategoryById(value).then(({ data }) => {
        const { SubCategories } = data;
        setSubCategories(SubCategories);
        setHideNewCategoryInput(true);
        setHideSubCategoriesInput(false);
      });
    }
  }

  return (
    <>
      <FormItem
        label={labelMainCategory}
        name='category'
        rules={[{ required: true, message: "Campo obrigatório." }]}
      >
        <Select
          disabled={fromUserProfile && !editMode && !viewMode}
          tabIndex={viewMode && "-1"}
          className={viewMode && "disabled"}
          getPopupContainer={(trigger) => trigger.parentNode}
          placeholder='Ex.: Desenvolvedor'
          onChange={handleSelectChange}
        >
          {newCategoryFromUser && !categoryIdFromUser && (
            <Select.Option
              key={TIPO_CATEGORIA.CATEGORIA_CRIADA}
              value={TIPO_CATEGORIA.CATEGORIA_CRIADA}
            >
              <Row align='middle' justify='start'>
                <FeatherIcons
                  icon='repeat'
                  size={15}
                  className='iconMarginRight'
                />
                {newCategoryFromUser}
                <CategoryInfo>
                  - Categoria criada {!viewMode && "por você"}
                </CategoryInfo>
              </Row>
            </Select.Option>
          )}

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

      {!hideSubCategoriesInput && hideNewCategoryInput && (
        <FormItem
          label='Subcategorias'
          name='subCategories'
          rules={[{ required: true, message: "Campo obrigatório." }]}
        >
          <Select
            tabIndex={viewMode && "-1"}
            className={viewMode && "disabled"}
            disabled={fromUserProfile && !editMode}
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

      {!hideNewCategoryInput && hideSubCategoriesInput && (
        <FormItem
          label={viewMode ? "Categoria" : "Nova Categoria"}
          name='newCategory'
          rules={[{ required: true, message: "Campo obrigatório." }]}
        >
          <StyledInput
            style={viewMode ? styleInput : null}
            tabIndex={viewMode && "-1"}
            className={viewMode && "disabled"}
            disabled={fromUserProfile && !editMode && !viewMode}
            readOnly={viewMode}
            allowClear
            prefix={<FeatherIcons icon='tag' size={15} />}
            placeholder='Ex.: Secretária'
          />
        </FormItem>
      )}
    </>
  );
};

export default CategoriesSubcategoriesSelect;
