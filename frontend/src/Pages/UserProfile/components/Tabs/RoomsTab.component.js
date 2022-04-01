import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import * as UserProfileService from "../../services/UserProfile.service";
import * as RoomService from "../../../CreateRoom/services/createroom.service";
import { Loading } from "../../../../GlobalComponents/Loading/Loading.component";
import { TIPO_CATEGORIA } from "../../../../Helpers/TipoCategoria";
import { TitleStyled, ButtonText } from "../../../Home/components/Rooms/styles";
import RoomForm from "./RoomForm.component";
import { MenuLabelItem } from "../../../../GlobalComponents/Header/Header.styled";
import {
  Card,
  UserInfoTitle,
  StyledOption,
  StyledRow,
} from "../../UserProfile.component.styled";
import {
  Select,
  Form,
  Row,
  Tooltip,
  Col,
  FeatherIcons,
  Notification,
  Button,
  Menu,
  PopConfirm,
} from "../../../../antd_components";

const RoomsTab = ({ darkPallete, user, token, navigate }) => {
  const [rooms, setRooms] = useState();
  const [allRooms, setAllRooms] = useState();
  const [_id, setRoomId] = useState();
  const [hasntRooms, setHasntRooms] = useState();
  const [categories, setCategories] = useState();
  const [newCategoryState, setNewCategory] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState({
    _id: null,
  });
  const [viewMode, setViewMode] = useState({
    _id: null,
  });

  const createRoomButton = (marginleft) => (
    <Link to='/createroom'>
      <Tooltip title='Crie um Novo Projeto' color={darkPallete.lightblue}>
        <Button
          margin={`0 0 ${marginleft || "15px"} 0px`}
          color={darkPallete.white}
          backgroundcolor={darkPallete.lightblue}
          icon={<FeatherIcons icon='plus' size={20} />}
        >
          <ButtonText>Criar Projeto</ButtonText>
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

  useEffect(() => {
    RoomService.getCategories().then(({ data }) => {
      setCategories(data);
    });
  }, []);

  function handleFilterRoom(roomSelectId) {
    if (roomSelectId === TIPO_CATEGORIA.CATEGORIA_TODAS) {
      setRooms({ array: allRooms });
      setRoomId(null);
    } else {
      const filteredRoom = allRooms.find(({ _id }) => _id === roomSelectId);
      const { _id } = filteredRoom;
      setRooms({ array: [filteredRoom] });
      setRoomId(_id);
    }
  }

  function handleOtherCategories(value) {
    setNewCategory(value === TIPO_CATEGORIA.CATEGORIA_OUTRAS);
  }

  const listRooms = useMemo(() => {
    function handleSubmit(values) {
      let { roomTitle, roomCategory, roomDescription, newCategory } = values;

      if (_id) {
        const dto = {
          roomTitle,
          roomCategory,
          roomDescription: roomDescription.isEmpty()
            ? null
            : roomDescription.toHTML(),
          _id,
          newCategory,
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

    function handleDeleteRoom(_id) {
      RoomService.DeleteRoom(_id, token).then(({ data }) => {
        const { message, status } = data;

        getRoomsByOwnerId();

        Notification.open({
          type: status === 200 ? "success" : "error",
          message,
        });
      });
    }

    const MoreActionsRoom = (_id, title) => (
      <Menu>
        <Menu.Item key='1' onClick={() => navigate(`/chatroom/${_id}`)}>
          <Row align='middle'>
            <FeatherIcons icon='share' size={15} />
            <MenuLabelItem>Ver o Projeto</MenuLabelItem>
          </Row>
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

            setRoomId(_id);
          }}
        >
          <Row align='middle'>
            <FeatherIcons icon='edit-2' size={15} />
            <MenuLabelItem>Editar</MenuLabelItem>
          </Row>
        </Menu.Item>
        <PopConfirm
          placement='topRight'
          title={
            <span>
              Deseja realmente excluir o projeto{" "}
              <b>{title.lenght > 10 ? title.substr(0, 10) + "..." : title}</b> ?
            </span>
          }
          onConfirm={() => handleDeleteRoom(_id)}
          okText='Sim'
          cancelText='Não'
        >
          <Menu.Item key='2'>
            <Row align='middle'>
              <FeatherIcons icon='trash-2' size={15} />
              <MenuLabelItem>Excluir</MenuLabelItem>
            </Row>
          </Menu.Item>
        </PopConfirm>
      </Menu>
    );

    return (
      !hasntRooms &&
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
          <RoomForm
            handleOtherCategories={handleOtherCategories}
            MoreActionsRoom={MoreActionsRoom}
            handleSubmit={handleSubmit}
            categories={categories}
            newCategoryState={newCategoryState}
            viewMode={viewMode}
            showConfirmButton={showConfirmButton}
            darkPallete={darkPallete}
            Icon={Icon}
            title={title}
            description={description}
            categoryId={categoryId}
            newCategory={newCategory}
            _id={_id}
            CategorieTitle={CategorieTitle}
          />
        )
      )
    );
  }, [
    hasntRooms,
    rooms,
    _id,
    token,
    getRoomsByOwnerId,
    navigate,
    categories,
    newCategoryState,
    viewMode,
    showConfirmButton,
    darkPallete,
  ]);

  return (
    <Card bordered={false}>
      <Row justify='space-between' gutter={[10, 10]}>
        {!hasntRooms && rooms?.array && !rooms.loading ? (
          <>
            <Col span={window.innerWidth > 1024 ? 18 : 24}>
              <Row justify='space-between'>
                <UserInfoTitle level={4}>
                  Meus Projetos ({rooms?.array.length})
                </UserInfoTitle>

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
                    <StyledOption>Todas</StyledOption>
                  </Select.Option>

                  {allRooms &&
                    allRooms.map(({ title, _id, Icon }) => (
                      <Select.Option key={_id} value={_id}>
                        <FeatherIcons
                          icon={Icon}
                          size={18}
                          className='iconMargin'
                        />
                        <StyledOption>{title}</StyledOption>
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </>
        ) : (
          !rooms?.loading &&
          !hasntRooms && (
            <Row>
              {Loading(
                window.innerWidth < 1024 ? darkPallete.white : "#000",
                "0 0 0 10px"
              )}
            </Row>
          )
        )}
      </Row>

      <Row gutter={window.innerWidth > 1024 && [15, 15]}>
        {hasntRooms && (
          <StyledRow align='middle' justify='center'>
            <Col span={24}>
              <TitleStyled
                level={5}
                color={window.innerWidth < 1024 ? darkPallete.white : "#000"}
              >
                {hasntRooms?.errorMessage}
              </TitleStyled>
            </Col>
            <Col span={24}>{createRoomButton("0px")}</Col>
          </StyledRow>
        )}

        {listRooms}
      </Row>
    </Card>
  );
};

export default RoomsTab;
