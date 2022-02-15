import React, { useEffect, useState } from "react";
import { Card, RoomContainer } from "../UserProfile.component.styled";
import { Link } from "react-router-dom";
import * as UserProfileService from "../services/UserProfile.service";
import * as RoomService from "../../CreateRoom/services/createroom.service";
import { Loading } from "../../../GlobalComponents/Loading/Loading.component";
import { TIPO_CATEGORIA } from "../../../Helpers/TipoCategoria";
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
} from "../../../antd_components";

export default function TabUserInfo({ user, darkPallete, navigate, token }) {
  const [rooms, setRooms] = useState();
  const [_id, setRoomId] = useState();
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [categories, setCategories] = useState();
  const [newCategory, setNewCategory] = useState(false);
  const { TabPane } = Tabs;
  const { Title } = Typography;

  const styleInput = {
    borderRadius: "8px",
    padding: "8px",
    marginTop: "-5px",
  };
  useEffect(() => {
    if (user) {
      const { _id } = user;
      UserProfileService.getRoomsByOwnerId(_id).then(({ data }) => {
        setRooms(data);
      });
    }
  }, [user]);

  useEffect(() => {
    RoomService.getCategories().then(({ data }) => {
      setCategories(data);
    });
  }, []);

  function handleFilterRoom(id) {
    console.log("fasfa");
  }

  function handleOtherCategories(value) {
    setNewCategory(value === TIPO_CATEGORIA.CATEGORIA_OUTRAS);
  }

  function handleSubmit(values) {
    let { roomTitle, roomCategory, roomDescription, newCategory } = values;

    if (_id) {
      const dto = {
        roomTitle,
        roomCategory: newCategory ? null : roomCategory,
        roomDescription,
        _id,
        newCategory: newCategory || null,
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
        setShowConfirmButton(false);
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
              {rooms && rooms ? (
                <>
                  <Row justify='space-between'>
                    <Col span={window.innerWidth > 1024 ? 18 : 24}>
                      <Row>
                        <Title level={4}>Minhas Salas ({rooms.length})</Title>

                        <Link to='/createroom'>
                          <Tooltip
                            title='Crie uma nova sala'
                            color={darkPallete.lightblue}
                          >
                            <Button
                              style={{
                                fontWeight: 400,
                                marginLeft: "15px",
                                background: darkPallete.lightblue,
                                color: darkPallete.white,
                              }}
                              icon={<FeatherIcons icon='plus' size={20} />}
                            >
                              <span style={{ marginLeft: "5px" }}>
                                Criar sala
                              </span>
                            </Button>
                          </Tooltip>
                        </Link>
                      </Row>
                    </Col>

                    <Col span={window.innerWidth > 1024 ? 6 : 24}>
                      <Form.Item name='roomFilter'>
                        <Select
                          defaultValue={TIPO_CATEGORIA.CATEGORIA_TODAS}
                          allowClear
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

                          {rooms &&
                            rooms
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
                  </Row>

                  <Row gutter={[15, 15]}>
                    {rooms &&
                      rooms.map(
                        ({
                          _id,
                          title,
                          description,
                          CategorieTitle,
                          Icon,
                          categoryId,
                        }) => (
                          <Col span={24}>
                            <Form
                              onFinish={handleSubmit}
                              layout='vertical'
                              onFieldsChange={() => setShowConfirmButton(true)}
                            >
                              <RoomContainer>
                                <Row align='middle'>
                                  <Col span={23}>
                                    <Title
                                      level={4}
                                      style={{
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                      }}
                                    >
                                      {title}
                                    </Title>
                                  </Col>

                                  <Col span={1}>
                                    <Tooltip
                                      title='Ir para sala'
                                      color={darkPallete.lightblue}
                                    >
                                      <Button
                                        onClick={() =>
                                          navigate(`/chatroom/${_id}`)
                                        }
                                        icon={
                                          <FeatherIcons
                                            size={22}
                                            icon='share'
                                          />
                                        }
                                        style={{
                                          marginTop: "-5px",
                                          width: "100%",
                                        }}
                                      />
                                    </Tooltip>
                                  </Col>
                                </Row>

                                <Col span={24}>
                                  <Form.Item label='Título' name='roomTitle'>
                                    <Input
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
                                    label='Descrição'
                                    name='roomDescription'
                                  >
                                    <Input
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
                                    label='Categoria'
                                    name='roomCategory'
                                  >
                                    <Select
                                      style={{
                                        marginBottom: !newCategory
                                          ? "25px"
                                          : "-25px",
                                      }}
                                      defaultValue={categoryId || 12}
                                      allowClear
                                      getPopupContainer={(trigger) =>
                                        trigger.parentNode
                                      }
                                      placeholder='Ex.: Alimentos'
                                      onChange={handleOtherCategories}
                                    >
                                      <Select.Option key={12} value={12}>
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
                                            <Select.Option
                                              key={_id}
                                              value={_id}
                                            >
                                              <Row
                                                align='middle'
                                                justify='start'
                                              >
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
                                          <FeatherIcons
                                            icon='repeat'
                                            size={15}
                                          />
                                          <span
                                            style={{ margin: "2px 0 0 5px" }}
                                          >
                                            Outras
                                            <i style={{ color: "gray" }}>
                                              - Ao selecionar, poderá criar uma
                                              nova categoria
                                            </i>
                                          </span>
                                        </Row>
                                      </Select.Option>
                                    </Select>
                                  </Form.Item>
                                </Col>

                                {newCategory && (
                                  <Col span={24}>
                                    <Form.Item
                                      label='Nova Categoria'
                                      name='newCategory'
                                    >
                                      <Input
                                        style={{
                                          ...styleInput,
                                          marginBottom: newCategory && "25px",
                                        }}
                                        allowClear
                                        prefix={
                                          <FeatherIcons icon='tag' size={15} />
                                        }
                                        placeholder='Ex.: Construções'
                                      />
                                    </Form.Item>
                                  </Col>
                                )}

                                {showConfirmButton && (
                                  <Row justify='end'>
                                    <Button
                                      htmlType='submit'
                                      onClick={() => setRoomId(_id)}
                                      backgroundcolor={darkPallete.lightblue}
                                      height='35'
                                      width='200'
                                      color={darkPallete.white}
                                      style={{
                                        marginTop: "-25px",
                                        marginBottom: "25px",
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
              ) : (
                Loading(darkPallete)
              )}
            </Card>
          </TabPane>
        </Tabs>
      }
    />
  );
}
