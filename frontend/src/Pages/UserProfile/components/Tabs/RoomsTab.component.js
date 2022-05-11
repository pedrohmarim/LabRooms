import React, { useState, useMemo } from "react";
import * as RoomService from "../../../CreateRoom/services/createroom.service";
import * as ChatRoomService from "../../../ChatRoom/services/ChatRoom.service";
import { Loading } from "../../../../GlobalComponents/Loading/Loading.component";
import { TIPO_CATEGORIA } from "../../../../Helpers/TipoCategoria";
import RoomForm from "./RoomForm.component";
import { MenuLabelItem } from "../../../../GlobalComponents/Header/Header.styled";
import HeaderTabRoomsCandidacies from "../../../../GlobalComponents/HeaderTabRoomsCandidacies/HeaderTabRoomsCandidacies.component";
import TagRender from "../../../../GlobalComponents/TagRender/TagRender.component";
import { Card } from "../../UserProfile.component.styled";
import {
  Row,
  FeatherIcons,
  Notification,
  Menu,
  PopConfirm,
} from "../../../../antd_components";
import NoProjectInfo from "../../../../GlobalComponents/NoProjectInfo/NoProjectInfo.component";

const RoomsTab = ({
  getRooms,
  getRoomsByOwnerId,
  hasntRooms,
  darkPallete,
  handleFilterRoom,
  categories,
  allRooms,
  setRoomId,
  _id,
  tabRooms,
  token,
  navigate,
  setCandidaciesActive,
}) => {
  const [newCategoryState, setNewCategory] = useState(false);
  const [showSubCategorie, setShowSubCategorie] = useState(false);
  const [allSubCategories, setAllSubCategories] = useState();
  const [showConfirmButton, setShowConfirmButton] = useState({
    _id: null,
  });
  const [viewMode, setViewMode] = useState({
    _id: null,
  });

  const listRooms = useMemo(() => {
    function handleSubmit(values) {
      let {
        roomTitle,
        roomCategory,
        roomDescription,
        newCategory,
        subCategories,
      } = values;

      if (_id) {
        const dto = {
          title: roomTitle,
          categoryId: roomCategory,
          subCategories: newCategory ? [] : subCategories,
          description: roomDescription.isEmpty()
            ? null
            : roomDescription.toHTML(),
          _id,
          newCategory,
        };

        RoomService.UpdateRoom(dto, token).then(({ data }) => {
          const { message, status } = data;

          getRoomsByOwnerId();
          getRooms();

          Notification.open({
            type: status === 200 ? "success" : "error",
            message,
          });

          setShowConfirmButton({
            _id: null,
          });

          setViewMode({
            _id: null,
          });
        });
      }
    }

    function handleLockProject(_id, visible) {
      const dto = {
        _id,
        visible: !visible,
      };

      RoomService.LockProject(dto, token).then(({ data }) => {
        const { message, status } = data;

        getRoomsByOwnerId();
        getRooms();

        Notification.open({
          type: status === 200 ? "success" : "error",
          message,
        });
      });
    }

    function handleDeleteRoom(_id) {
      RoomService.DeleteRoom(_id, token).then(({ data }) => {
        const { message, status } = data;

        getRoomsByOwnerId();
        getRooms();

        Notification.open({
          type: status === 200 ? "success" : "error",
          message,
        });
      });
    }

    function handleGetCategoryById(value) {
      if (
        value !== TIPO_CATEGORIA.CATEGORIA_OUTRAS &&
        value !== TIPO_CATEGORIA.CATEGORIA_CRIADA &&
        value !== TIPO_CATEGORIA.CATEGORIA_TODAS
      ) {
        ChatRoomService.getCategoryById(value).then(({ data }) => {
          const { SubCategories } = data;
          setShowSubCategorie(true);
          setAllSubCategories(SubCategories);
        });
      }
    }

    function handleOtherCategories(value) {
      setNewCategory(value === TIPO_CATEGORIA.CATEGORIA_OUTRAS);
      setShowSubCategorie(false);
      handleGetCategoryById(value);
    }

    function handleCreateSharedLink(_id) {
      RoomService.CreateSharedLink(_id, token).then(async ({ data }) => {
        const { message, status, description, inviteLink } = data;

        await navigator.clipboard.writeText(inviteLink);

        Notification.open({
          type: status === 200 ? "success" : "error",
          message,
          description,
        });
      });
    }

    const MoreActionsRoom = (_id, title, visible) => (
      <Menu>
        {!visible && (
          <Menu.Item
            key='1'
            onClickCapture={(e) => {
              handleCreateSharedLink(_id);
              e.stopPropagation();
            }}
          >
            <Row align='middle'>
              <FeatherIcons icon='share-2' size={15} />
              <MenuLabelItem>Criar Convite</MenuLabelItem>
            </Row>
          </Menu.Item>
        )}

        <Menu.Item
          key='2'
          onClickCapture={(e) => {
            navigate(`/view/project/${_id}`);
            e.stopPropagation();
          }}
        >
          <Row align='middle'>
            <FeatherIcons icon='share' size={15} />
            <MenuLabelItem>Visualizar</MenuLabelItem>
          </Row>
        </Menu.Item>

        <Menu.Item
          key='3'
          onClickCapture={(e) => {
            setCandidaciesActive({ active: true, roomId: _id });
            e.stopPropagation();
          }}
        >
          <Row align='middle'>
            <FeatherIcons icon='users' size={15} />
            <MenuLabelItem>Candidaturas</MenuLabelItem>
          </Row>
        </Menu.Item>

        <Menu.Item
          key='4'
          onClickCapture={(e) => {
            handleLockProject(_id, visible);
            e.stopPropagation();
          }}
        >
          <Row align='middle'>
            <FeatherIcons icon={visible ? "lock" : "unlock"} size={15} />
            <MenuLabelItem>
              {visible ? "Privar" : "Tornar Visível"}
            </MenuLabelItem>
          </Row>
        </Menu.Item>

        <Menu.Item
          key='5'
          onClickCapture={() => {
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
              <b>{title.length > 10 ? title.substr(0, 10) + "..." : title}</b> ?
            </span>
          }
          onConfirm={() => handleDeleteRoom(_id)}
          okText='Sim'
          cancelText='Não'
        >
          <Menu.Item key='6'>
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
      tabRooms?.array &&
      tabRooms?.array.map(
        ({
          _id,
          title,
          description,
          CategorieTitle,
          Icon,
          categoryId,
          newCategory,
          subCategories,
          visible,
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
            visible={visible}
            _id={_id}
            CategorieTitle={CategorieTitle}
            subCategories={subCategories}
            allSubCategories={allSubCategories}
            tagRender={TagRender}
            showSubCategorie={showSubCategorie}
          />
        )
      )
    );
  }, [
    hasntRooms,
    tabRooms?.array,
    _id,
    token,
    getRoomsByOwnerId,
    navigate,
    setCandidaciesActive,
    setRoomId,
    categories,
    newCategoryState,
    viewMode,
    showConfirmButton,
    darkPallete,
    allSubCategories,
    showSubCategorie,
    getRooms,
  ]);

  return (
    <Card bordered={false}>
      <Row justify='space-between' gutter={[10, 10]}>
        {!hasntRooms && tabRooms?.array && !tabRooms.loading ? (
          <HeaderTabRoomsCandidacies
            headerTitle='Meus Projetos'
            tabRooms={tabRooms}
            handleFilterRoom={handleFilterRoom}
            allRooms={allRooms}
            darkPallete={darkPallete}
          />
        ) : (
          !tabRooms?.loading &&
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

      <Row>
        {hasntRooms && (
          <NoProjectInfo darkPallete={darkPallete} hasntRooms={hasntRooms} />
        )}

        {listRooms}
      </Row>
    </Card>
  );
};

export default RoomsTab;
