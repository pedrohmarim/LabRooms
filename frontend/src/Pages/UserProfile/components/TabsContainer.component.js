import React, { useEffect, useState, useCallback } from "react";
import { Card, RoomContainer } from "../UserProfile.component.styled";
import { Link } from "react-router-dom";
import * as UserProfileService from "../services/UserProfile.service";
import * as RoomService from "../../CreateRoom/services/createroom.service";
import { Loading } from "../../../GlobalComponents/Loading/Loading.component";
import { TIPO_CATEGORIA } from "../../../Helpers/TipoCategoria";
import { TitleStyled } from "../../Home/components/Rooms/styles";
import {
  Tabs,
  Select,
  Form,
  Row,
  Tooltip,
  Col,
  FeatherIcons,
  Notification,
  Typography,
  Input,
  Button,
  Menu,
  Dropdown,
  PopConfirm,
} from "../../../antd_components";

export default function TabUserInfo({ user, darkPallete, navigate, token }) {
  const [rooms, setRooms] = useState();
  const [allRooms, setAllRooms] = useState();
  const [_id, setRoomId] = useState();
  const [showConfirmButton, setShowConfirmButton] = useState({
    _id: null,
  });
  const [categories, setCategories] = useState();
  const [hasntRooms, setHasntRooms] = useState();
  const [newCategoryState, setNewCategory] = useState(false);
  const [viewMode, setViewMode] = useState({
    _id: null,
  });
  const { TabPane } = Tabs;
  const { Title } = Typography;

  const styleInput = {
    borderRadius: "8px",
    padding: "8px",
  };

  const createRoomButton = (marginleft) => (
    <Link to='/createroom'>
      <Tooltip title='Crie uma nova sala' color={darkPallete.lightblue}>
        <Button
          style={{
            fontWeight: 400,
            marginLeft: marginleft || "15px",
            background: darkPallete.lightblue,
            color: darkPallete.white,
          }}
          icon={<FeatherIcons icon='plus' size={20} />}
        >
          <span style={{ marginLeft: "5px" }}>Criar sala</span>
        </Button>
      </Tooltip>
    </Link>
  );

  const getRoomsByOwnerId = useCallback(() => {
    if (user) {
      const { _id } = user;
      UserProfileService.getRoomsByOwnerId(_id).then(({ data }) => {
        const { loading, errorMessage, roomWithIcon } = data;

        if (errorMessage) {
          setHasntRooms({ loading, errorMessage });
        } else {
          setRooms({ array: roomWithIcon, loading });
          setAllRooms(roomWithIcon);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    getRoomsByOwnerId();
  }, [getRoomsByOwnerId]);

  function handleDeleteRoom(_id) {
    RoomService.DeleteRoom(_id, token).then(({ data }) => {
      const { message, status } = data;

      if (status === 200) {
        Notification.open({
          type: "success",
          message,
        });
        getRoomsByOwnerId();
      } else {
        Notification.open({
          type: "error",
          message,
        });
      }
    });
  }

  const MoreActionsRoom = (_id, title) => (
    <Menu>
      <Menu.Item
        key='1'
        onClick={() => navigate(`/chatroom/${_id}`)}
        icon={<FeatherIcons icon='share' size={15} />}
      >
        Ir para sala
      </Menu.Item>
      <Menu.Item
        key='1'
        onClick={() => {
          setViewMode({
            _id,
          });
          setShowConfirmButton({
            _id,
          });
        }}
        icon={<FeatherIcons icon='edit-2' size={15} />}
      >
        Editar
      </Menu.Item>
      <PopConfirm
        placement='topRight'
        title={
          <span>
            Deseja realmente excluir a sala <b>{title}</b> ?
          </span>
        }
        onConfirm={() => handleDeleteRoom(_id)}
        okText='Sim'
        cancelText='Não'
      >
        <Menu.Item key='2' icon={<FeatherIcons icon='trash-2' size={15} />}>
          Excluir
        </Menu.Item>
      </PopConfirm>
    </Menu>
  );

  useEffect(() => {
    RoomService.getCategories().then(({ data }) => {
      setCategories(data);
    });
  }, []);

  function handleFilterRoom(roomSelectId) {
    if (roomSelectId === TIPO_CATEGORIA.CATEGORIA_TODAS) {
      setRooms({ array: allRooms });
    } else {
      const filteredRoom = rooms.array.find(({ _id }) => _id === roomSelectId);
      setRooms({ array: [filteredRoom] });
    }
  }

  function handleOtherCategories(value) {
    setNewCategory(value === TIPO_CATEGORIA.CATEGORIA_OUTRAS);
  }

  function handleSubmit(values) {
    let { roomTitle, roomCategory, roomDescription, newCategory } = values;

    if (_id) {
      const dto = {
        roomTitle,
        roomCategory:
          roomCategory === TIPO_CATEGORIA.CATEGORIA_OUTRAS ||
          roomCategory === TIPO_CATEGORIA.CATEGORIA_CRIADA
            ? null
            : roomCategory,
        roomDescription,
        _id,
        newCategory: newCategory,
      };

      RoomService.UpdateRoom(dto, token).then(({ data }) => {
        const { message, status } = data;
        if (status === 200) {
          Notification.open({
            type: "success",
            message,
          });
        } else {
          Notification.open({
            type: "error",
            message,
          });
        }

        setShowConfirmButton({
          _id: null,
        });

        setViewMode({
          _id: null,
        });
      });
    }
  }

  return (
    <Card
      bodyStyle={{ display: "none" }}
      bordered={false}
      title={
        <Tabs defaultActiveKey='1'>
          <TabPane tab='Meu Perfil' key='1'>
            <Card bordered={false}>
              <p>Meu Perfil</p>
            </Card>
          </TabPane>

          <TabPane tab='Minhas Salas' key='2'>
            <Card bordered={false}>
              <>
                <Row justify='space-between'>
                  {!hasntRooms && rooms?.array && !rooms.loading ? (
                    <>
                      <Col span={window.innerWidth > 1024 ? 18 : 24}>
                        <Row>
                          <Title level={4}>
                            Minhas Salas (
                            {rooms?.array ? rooms?.array.length : "0"})
                          </Title>

                          {createRoomButton()}
                        </Row>
                      </Col>

                      <Col span={window.innerWidth > 1024 ? 6 : 24}>
                        <Form.Item name='roomFilter'>
                          <Select
                            defaultValue={TIPO_CATEGORIA.CATEGORIA_TODAS}
                            getPopupContainer={(trigger) => trigger.parentNode}
                            onChange={handleFilterRoom}
                          >
                            <Select.Option
                              key={TIPO_CATEGORIA.CATEGORIA_TODAS}
                              value={TIPO_CATEGORIA.CATEGORIA_TODAS}
                            >
                              <FeatherIcons
                                icon='list'
                                size={18}
                                className='iconMargin'
                              />
                              <span
                                style={{
                                  marginLeft: "5px",
                                  position: "relative",
                                  top: "-3px",
                                }}
                              >
                                Todas
                              </span>
                            </Select.Option>

                            {rooms?.array &&
                              rooms?.array
                                .sort((a, b) =>
                                  a.title > b.title
                                    ? 1
                                    : b.title > a.title
                                    ? -1
                                    : 0
                                )
                                .map(({ title, _id, Icon }) => (
                                  <Select.Option key={_id} value={_id}>
                                    <FeatherIcons
                                      icon={Icon}
                                      size={18}
                                      className='iconMargin'
                                    />
                                    <span
                                      style={{
                                        marginLeft: "5px",
                                        position: "relative",
                                        top: "-3px",
                                      }}
                                    >
                                      {title}
                                    </span>
                                  </Select.Option>
                                ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    </>
                  ) : (
                    !rooms?.loading &&
                    !hasntRooms && <Row>{Loading(darkPallete.color)}</Row>
                  )}
                </Row>

                <Row gutter={[15, 15]}>
                  {hasntRooms && (
                    <Row align='middle'>
                      <Col span={24}>
                        <TitleStyled
                          level={5}
                          color='#000'
                          margintop={window.innerWidth < 1024 ? "15px" : "20px"}
                        >
                          {hasntRooms?.errorMessage}
                        </TitleStyled>
                      </Col>
                      <Col span={24}>{createRoomButton("0px")}</Col>
                    </Row>
                  )}
                  {!hasntRooms &&
                    rooms?.array &&
                    rooms?.array.map(
                      ({
                        _id,
                        title,
                        description,
                        CategorieTitle,
                        Icon,
                        categoryId,
                        newCategory,
                      }) => (
                        <Col span={24}>
                          <Form
                            onFinish={handleSubmit}
                            layout='vertical'
                            initialValues={{
                              roomTitle: title,
                              roomDescription: description,
                              roomCategory:
                                categoryId || TIPO_CATEGORIA.CATEGORIA_CRIADA,
                            }}
                          >
                            <RoomContainer>
                              <Row align='middle' justify='space-between'>
                                <Title
                                  level={3}
                                  style={{
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {title}
                                </Title>

                                <Row>
                                  <Col>
                                    <Tooltip
                                      title='Mais Opções'
                                      color={darkPallete.lightblue}
                                    >
                                      <Dropdown
                                        overlay={MoreActionsRoom(_id, title)}
                                        placement='bottomRight'
                                      >
                                        <Button
                                          ghost
                                          icon={
                                            <FeatherIcons
                                              size={18}
                                              icon='more-vertical'
                                            />
                                          }
                                          style={{
                                            marginTop: "-5px",
                                            color: "#000",
                                          }}
                                        />
                                      </Dropdown>
                                    </Tooltip>
                                  </Col>
                                </Row>
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
                                    <Title
                                      level={5}
                                      style={{ marginBottom: "0" }}
                                    >
                                      Título
                                    </Title>
                                  }
                                  name='roomTitle'
                                >
                                  <Input
                                    disabled={
                                      viewMode._id === _id ? false : true
                                    }
                                    style={styleInput}
                                    defaultValue={title}
                                    prefix={
                                      <FeatherIcons size={18} icon='type' />
                                    }
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
                                    <Title
                                      level={5}
                                      style={{ marginBottom: "0" }}
                                    >
                                      Descrição
                                    </Title>
                                  }
                                  name='roomDescription'
                                >
                                  <Input
                                    disabled={
                                      viewMode._id === _id ? false : true
                                    }
                                    style={styleInput}
                                    defaultValue={description}
                                    prefix={
                                      <FeatherIcons size={18} icon='edit' />
                                    }
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
                                    <Title
                                      level={5}
                                      style={{ marginBottom: "0" }}
                                    >
                                      Categoria
                                    </Title>
                                  }
                                  name='roomCategory'
                                >
                                  <Select
                                    disabled={
                                      viewMode._id === _id ? false : true
                                    }
                                    getPopupContainer={(trigger) =>
                                      trigger.parentNode
                                    }
                                    placeholder='Ex.: Alimentos'
                                    onChange={handleOtherCategories}
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
                                          <i
                                            style={{
                                              color: "gray",
                                              marginLeft: "4px",
                                            }}
                                          >
                                            - Categoria criada por você
                                          </i>
                                        </Row>
                                      </Select.Option>
                                    )}
                                    {categories &&
                                      categories
                                        .sort((a, b) =>
                                          a.Title > b.Title
                                            ? 1
                                            : b.Title > a.Title
                                            ? -1
                                            : 0
                                        )
                                        .map(({ Title, _id, Icon }) => (
                                          <Select.Option key={_id} value={_id}>
                                            <Row align='middle' justify='start'>
                                              <FeatherIcons
                                                icon={Icon}
                                                size={15}
                                              />
                                              <span
                                                style={{
                                                  margin: "2px 0 0 5px",
                                                }}
                                              >
                                                {Title}
                                              </span>
                                            </Row>
                                          </Select.Option>
                                        ))}
                                    <Select.Option key={11} value={11}>
                                      <Row align='middle' justify='start'>
                                        <FeatherIcons icon='repeat' size={15} />
                                        <span style={{ margin: "2px 0 0 5px" }}>
                                          Outras
                                          <i
                                            style={{
                                              color: "gray",
                                              marginLeft: "4px",
                                            }}
                                          >
                                            - Ao selecionar, poderá criar uma
                                            nova categoria
                                          </i>
                                        </span>
                                      </Row>
                                    </Select.Option>
                                  </Select>
                                </Form.Item>
                              </Col>

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
                                      <Title
                                        level={5}
                                        style={{ marginBottom: "0" }}
                                      >
                                        Nova Categoria
                                      </Title>
                                    }
                                    name='newCategory'
                                  >
                                    <Input
                                      disabled={
                                        viewMode._id === _id ? false : true
                                      }
                                      style={styleInput}
                                      allowClear
                                      prefix={
                                        <FeatherIcons icon='tag' size={15} />
                                      }
                                      placeholder='Ex.: Construções'
                                    />
                                  </Form.Item>
                                </Col>
                              )}

                              {showConfirmButton._id === _id && (
                                <Row justify='end'>
                                  <Button
                                    htmlType='submit'
                                    onClick={() => setRoomId(_id)}
                                    backgroundcolor={darkPallete.lightblue}
                                    height='35'
                                    width='200'
                                    color={darkPallete.white}
                                    style={{
                                      marginBottom: "15px",
                                    }}
                                  >
                                    Confirmar
                                  </Button>
                                </Row>
                              )}
                            </RoomContainer>
                          </Form>
                        </Col>
                      )
                    )}
                </Row>
              </>
            </Card>
          </TabPane>
        </Tabs>
      }
    />
  );
}
