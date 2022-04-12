import React, { useEffect } from "react";
import { RoomContainer } from "../../UserProfile.component.styled";
import { TIPO_CATEGORIA } from "../../../../Helpers/TipoCategoria";
import { TitleStyled, CategoryInfo } from "../../UserProfile.component.styled";
import { CategoryTitle } from "../../../CreateRoom/CreateRoom.styled";
import {
  Select,
  Form,
  Row,
  Tooltip,
  Col,
  FeatherIcons,
  Typography,
  Input,
  Button,
  BraftEditor,
  Dropdown,
} from "../../../../antd_components";

export default function RoomForm({
  MoreActionsRoom,
  handleOtherCategories,
  Icon,
  handleSubmit,
  darkPallete,
  newCategoryState,
  viewMode,
  showConfirmButton,
  title,
  description,
  categoryId,
  newCategory,
  _id,
  categories,
  CategorieTitle,
  subCategories,
  allSubCategories,
  TagRender,
  showSubCategorie,
}) {
  const [form] = Form.useForm();

  const styleInput = {
    borderRadius: "8px",
    padding: "8px",
  };

  useEffect(() => {
    form.setFieldsValue({
      roomTitle: title,
      roomDescription: BraftEditor.Editor.createEditorState(description),
      roomCategory: categoryId || TIPO_CATEGORIA.CATEGORIA_CRIADA,
      newCategory,
      subCategories,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, description, form, newCategory, title]);

  return (
    <Col span={24}>
      <Form form={form} onFinish={handleSubmit} layout='vertical'>
        <RoomContainer>
          <Row align='middle' justify='space-between'>
            <Col span={14}>
              <TitleStyled level={3}>{title}</TitleStyled>
            </Col>

            <Col span={10}>
              <Row justify='end' align='middle'>
                {showConfirmButton._id === _id && (
                  <Row justify='end'>
                    {window.innerWidth > 1024 ? (
                      <Button
                        htmlType='submit'
                        backgroundcolor={darkPallete.lightblue}
                        height='35'
                        width='200'
                        color={darkPallete.white}
                        margin='10px 0'
                      >
                        Confirmar
                      </Button>
                    ) : (
                      <Tooltip
                        title='Confirmar'
                        color={darkPallete.lightblue}
                        defaultVisible
                      >
                        <Button
                          icon={<FeatherIcons size={18} icon='check' />}
                          htmlType='submit'
                          backgroundcolor={darkPallete.lightblue}
                          color={darkPallete.white}
                        />
                      </Tooltip>
                    )}
                  </Row>
                )}

                <Tooltip title='Mais Opções' color={darkPallete.lightblue}>
                  <Dropdown
                    overlay={MoreActionsRoom(_id, title)}
                    placement='bottomRight'
                  >
                    <Button
                      ghost
                      icon={<FeatherIcons size={18} icon='more-vertical' />}
                      margin='-5px 0 0 0'
                      color='#000'
                    />
                  </Dropdown>
                </Tooltip>
              </Row>
            </Col>
          </Row>

          <Col span={24}>
            <Form.Item
              rules={[
                {
                  required: viewMode._id === _id,
                  message: "Campo obrigatório.",
                },
              ]}
              label={
                <Typography>
                  <b>Título</b>
                </Typography>
              }
              name='roomTitle'
            >
              <Input
                disabled={viewMode._id === _id ? false : true}
                style={styleInput}
                prefix={<FeatherIcons size={18} icon='type' />}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              rules={[
                {
                  required: viewMode._id === _id,
                  message: "Campo obrigatório.",
                },
              ]}
              label={
                <Typography>
                  <b>Categoria</b>
                </Typography>
              }
              name='roomCategory'
            >
              <Select
                disabled={viewMode._id === _id ? false : true}
                getPopupContainer={(trigger) => trigger.parentNode}
                placeholder='Ex.: Alimentos'
                onChange={(value) => {
                  handleOtherCategories(value);
                  form.setFieldsValue({
                    subCategories: [],
                  });
                }}
              >
                {newCategory && !categoryId && (
                  <Select.Option
                    key={TIPO_CATEGORIA.CATEGORIA_CRIADA}
                    value={TIPO_CATEGORIA.CATEGORIA_CRIADA}
                  >
                    <Row align='middle' justify='start'>
                      <FeatherIcons
                        icon={Icon}
                        size={15}
                        className='iconMarginRight'
                      />
                      {CategorieTitle}
                      <CategoryInfo>- Categoria criada por você</CategoryInfo>
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
                      <CategoryInfo>
                        - Poderá criar uma nova categoria
                      </CategoryInfo>
                    </CategoryTitle>
                  </Row>
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>

          {((!newCategoryState && categoryId) || showSubCategorie) && (
            <Col span={24}>
              <Form.Item
                label='Subcategorias'
                name='subCategories'
                rules={[
                  {
                    required: viewMode._id === _id,
                    message: "Campo obrigatório.",
                  },
                ]}
              >
                <Select
                  disabled={viewMode._id === _id ? false : true}
                  allowClear
                  getPopupContainer={(trigger) => trigger.parentNode}
                  mode='multiple'
                  showArrow
                  placeholder='Selecionar subcategorias'
                  tagRender={TagRender}
                  style={{ width: "100%" }}
                  options={
                    allSubCategories ||
                    categories?.find((x) => x._id === categoryId).SubCategories
                  }
                  notFoundContent={
                    <Row
                      justify='center'
                      align='middle'
                      style={{ marginBottom: "-10px" }}
                    >
                      <Typography level={5}>
                        Selecione uma Categoria para as Opções Serem
                        Disponibilizadas
                      </Typography>
                    </Row>
                  }
                />
              </Form.Item>
            </Col>
          )}

          {newCategoryState && viewMode._id === _id && (
            <Col span={24}>
              <Form.Item
                rules={[
                  {
                    required: newCategoryState,
                    message: "Campo obrigatório.",
                  },
                ]}
                label={
                  <Typography>
                    <b>Nova Categoria</b>
                  </Typography>
                }
                name='newCategory'
              >
                <Input
                  disabled={viewMode._id === _id ? false : true}
                  style={styleInput}
                  allowClear
                  prefix={<FeatherIcons icon='tag' size={15} />}
                  placeholder='Ex.: Construções'
                />
              </Form.Item>
            </Col>
          )}

          <Col span={24}>
            <Form.Item
              rules={[
                {
                  required: viewMode._id === _id,
                  message: "Campo obrigatório.",
                },
              ]}
              label={
                <Typography>
                  <b>Descrição</b>
                </Typography>
              }
              name='roomDescription'
            >
              <BraftEditor.Editor
                readOnly={viewMode._id === _id ? false : true}
                excludeControls={["media"]}
                language={() => BraftEditor.language}
                textBackgroundColor={false}
              />
            </Form.Item>
          </Col>

          {showConfirmButton._id === _id && (
            <Row justify='end'>
              <Button
                htmlType='submit'
                backgroundcolor={darkPallete.lightblue}
                height='35'
                width='200'
                color={darkPallete.white}
                margin='0 0 15px 0'
              >
                Confirmar
              </Button>
            </Row>
          )}
        </RoomContainer>
      </Form>
    </Col>
  );
}
