import React, { useEffect, useState, useContext } from "react";
import { TIPO_CATEGORIA } from "../../Helpers/TipoCategoria";
import { Select, Row, FeatherIcons, Typography } from "../../antd_components";
import TagRender from "../TagRender/TagRender.component";
import { FormItem } from "../../Pages/Signup/components/SignupForm/Signup.form.styled";
import { UserContext } from "../../Context/UserContext";
import { StyledInput } from "../../Pages/CreateRoom/CreateRoom.styled";
import {
  CategoryTitle,
  CategoryInfo,
} from "../../Pages/CreateRoom/CreateRoom.styled";

const CategoriesSubcategoriesSelect = ({
  categoryIdFromUser,
  defaultHideNewCategory,
  fromUserProfile,
  categories,
  labelMainCategory,
  form,
  editMode,
  viewMode,
  newCategoryFromUser,
  styleInput,
  setShowPrice = () => {},
}) => {
  const { getCategoryById, categorie } = useContext(UserContext);
  const [hideNewCategoryInput, setHideNewCategoryInput] = useState(true);
  const [hideSubCategoriesInput, setHideSubCategoriesInput] = useState(true);

  useEffect(() => {
    if (!defaultHideNewCategory)
      if (!categoryIdFromUser || !newCategoryFromUser) {
        setHideSubCategoriesInput(true);
        setHideNewCategoryInput(false);
      } else {
        setHideSubCategoriesInput(false);
        setHideNewCategoryInput(true);
      }

    if (categoryIdFromUser) {
      getCategoryById(categoryIdFromUser);
      setHideNewCategoryInput(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSelectChange(value) {
    setShowPrice(true);

    form.setFieldsValue({ subCategories: [] });

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
      getCategoryById(value);
      setHideNewCategoryInput(true);
      setHideSubCategoriesInput(false);
    }
  }

  return (
    <>
      <FormItem
        label={labelMainCategory}
        name='category'
        rules={!viewMode && [{ required: true, message: "Campo obrigatório." }]}
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
          <Select.Option
            key={TIPO_CATEGORIA.CATEGORIA_OUTRAS}
            value={TIPO_CATEGORIA.CATEGORIA_OUTRAS}
          >
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

      {(!hideSubCategoriesInput || categoryIdFromUser) && hideNewCategoryInput && (
        <FormItem
          label='Subcategorias'
          name='subCategories'
          rules={
            !viewMode && [{ required: true, message: "Campo obrigatório." }]
          }
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
            options={categorie?.SubCategories}
          />
        </FormItem>
      )}

      {(!hideNewCategoryInput || newCategoryFromUser) &&
        hideSubCategoriesInput &&
        !viewMode && (
          <FormItem
            label={viewMode ? "Categoria" : "Nova Categoria"}
            name='newCategory'
            rules={
              !viewMode && [{ required: true, message: "Campo obrigatório." }]
            }
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
