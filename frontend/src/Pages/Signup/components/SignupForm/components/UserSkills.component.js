import React from "react";
import { FormItem } from "../Signup.form.styled";
import TagRender from "../../../../../GlobalComponents/TagRender/TagRender.component";
import { StyledInput } from "../../../../CreateRoom/CreateRoom.styled";
import { StyledButton } from "../Signup.form.styled";
import {
  CategoryTitle,
  CategoryInfo,
} from "../../../../CreateRoom/CreateRoom.styled";
import {
  Select,
  FeatherIcons,
  Row,
  Typography,
} from "../../../../../antd_components";

const UserSkills = ({
  categories,
  handleSelectChange,
  subCategories,
  newCategory,
  darkPallete,
  setUserSkills,
  form,
}) => {
  return (
    <>
      <FormItem label='Qual sua Área de Atuação?' name='category'>
        <Select
          allowClear
          getPopupContainer={(trigger) => trigger.parentNode}
          placeholder='Ex.: Desenvolvedor'
          onChange={handleSelectChange}
        >
          {categories &&
            categories
              .sort((a, b) =>
                a.title > b.title ? 1 : b.title > a.title ? -1 : 0
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
        <FormItem label='Habilidades' name='subCategories'>
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
                  Selecione uma Área de Atuação para as Opções Serem
                  Disponibilizadas
                </Typography>
              </Row>
            }
            mode='multiple'
            showArrow
            placeholder='Selecionar habilidades'
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

      <StyledButton
        onClick={() => setUserSkills(form.getFieldsValue(true))}
        height='45px'
        margin='15px 0 0 0'
        backgroundcolor={darkPallete.lightblue}
        type='primary'
      >
        Avançar
      </StyledButton>
    </>
  );
};
export default UserSkills;
