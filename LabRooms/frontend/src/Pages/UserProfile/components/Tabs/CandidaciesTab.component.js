import React, { useEffect, useCallback, useState } from "react";
import { Card, StyledRow } from "../../UserProfile.component.styled";
import { Loading } from "../../../../GlobalComponents/Loading/Loading.component";
import HeaderTabRoomsCandidacies from "../../../../GlobalComponents/HeaderTabRoomsCandidacies/HeaderTabRoomsCandidacies.component";
import * as CandidaciesService from "../../services/Candidacies.service";
import { ModalButton } from "../../../ViewProject/ViewProject.component.styled";
import { Link } from "react-router-dom";
import { TitleStyled } from "../../../Home/components/Rooms/styles";
import NoProjectInfo from "../../../../GlobalComponents/NoProjectInfo/NoProjectInfo.component";
import { MenuLabelItem } from "../../../../GlobalComponents/Header/Header.styled";
import {
  Row,
  Form,
  Table,
  FeatherIcons,
  Button,
  Tooltip,
  PopConfirm,
  Notification,
  Dropdown,
  Col,
  Menu,
} from "../../../../antd_components";

const CandidaciesTab = ({
  darkPallete,
  token,
  hasntRooms,
  tabRooms,
  roomId,
  setDashboardActive,
}) => {
  const [form] = Form.useForm();
  const [responseGrid, setResponseGrid] = useState();
  const [showTable, setShowTable] = useState(false);
  const [loadingDataSource, setLoadingDataSource] = useState();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) =>
    setSelectedRowKeys(newSelectedRowKeys);

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleFilterRoom = useCallback(
    (roomId) => {
      setShowTable(true);
      setLoadingDataSource(true);
      CandidaciesService.getCandidaciesByRoomId(roomId, token).then(
        ({ data }) => {
          setLoadingDataSource(data?.loading);
          setResponseGrid(data);
        }
      );
    },
    [token]
  );

  useEffect(() => {
    if (roomId) {
      form.setFieldsValue({ roomFilter: roomId });
      handleFilterRoom(roomId);
    }
  }, [form, roomId, handleFilterRoom]);

  function handleDeleteCandidate(candidacieId) {
    CandidaciesService.deleteCandidacieById(candidacieId, token).then(
      ({ data }) => {
        const { success, message } = data;

        Notification.open({
          type: success ? "success" : "error",
          message,
        });
      }
    );
  }

  function handleConfirmSelectedCandidacies() {
    if (selectedRowKeys.length === 0) {
      Notification.open({
        type: "info",
        message: "Selecione ao menos um candidato para prosseguir.",
      });

      return;
    }

    setDashboardActive({ active: true, selectedRowKeys });
  }

  const TableActions = (value) => (
    <Menu>
      <Link
        to={{
          pathname: `/profile/${value}`,
          search: "fromCandidacies=true",
        }}
      >
        <Menu.Item key='1'>
          <Row align='middle'>
            <FeatherIcons icon='eye' size={15} />
            <MenuLabelItem>Ver Perfil</MenuLabelItem>
          </Row>
        </Menu.Item>
      </Link>

      <Link to='#'>
        <Menu.Item key='2'>
          <Row align='middle'>
            <FeatherIcons icon='mail' size={15} />
            <MenuLabelItem>E-mail</MenuLabelItem>
          </Row>
        </Menu.Item>
      </Link>
    </Menu>
  );

  const columns = [
    {
      title: "Nome",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Habilidade Principal",
      dataIndex: "skill",
      key: "skill",
      render({ Icon, Title }) {
        return (
          <Row align='middle'>
            <FeatherIcons icon={Icon} size={15} />
            <ModalButton>{Title}</ModalButton>
          </Row>
        );
      },
    },
    {
      title: "Ações",
      dataIndex: "key",
      align: "center",
      key: "Excluir",
      fixed: "right",
      width: 100,
      render: (value, dataIndex) => {
        return (
          <Button.Group>
            <Tooltip title='Aceitar Candidato' color={darkPallete.lightblue}>
              <PopConfirm
                placement='topLeft'
                title='Deseja realmente Aceitar?'
                onConfirm={() => {}}
                okText='Sim'
                cancelText='Não'
              >
                <Button
                  type='ghost'
                  icon={
                    <FeatherIcons
                      icon='check'
                      size={18}
                      className='confirm-icon'
                    />
                  }
                  shape='circle'
                />
              </PopConfirm>
            </Tooltip>

            <Tooltip
              title='Rejeitar Candidato. Está Ação Irá excluir o Registro deste Candidato.'
              color={darkPallete.lightblue}
            >
              <PopConfirm
                placement='topLeft'
                title='Deseja realmente Excluir?'
                onConfirm={() => {
                  handleDeleteCandidate(dataIndex?.candidacieId);
                  handleFilterRoom(dataIndex?.roomId);
                }}
                okText='Sim'
                cancelText='Não'
              >
                <Button
                  type='ghost'
                  shape='circle'
                  icon={
                    <FeatherIcons icon='x' size={18} className='alert-icon' />
                  }
                />
              </PopConfirm>
            </Tooltip>

            <Tooltip title='Mais Opções' color={darkPallete.lightblue}>
              <Dropdown overlay={TableActions(value)} placement='bottomRight'>
                <Button
                  type='ghost'
                  shape='circle'
                  icon={<FeatherIcons icon='more-vertical' size={18} />}
                />
              </Dropdown>
            </Tooltip>
          </Button.Group>
        );
      },
    },
  ];

  return (
    <Card bordered={false}>
      {!hasntRooms && tabRooms?.array && !tabRooms.loading ? (
        <>
          <Form form={form}>
            <Row justify='space-between' gutter={[10, 10]}>
              <HeaderTabRoomsCandidacies
                roomId={roomId}
                fromCandidacies
                headerTitle='Meus Candidatos'
                tabRooms={tabRooms}
                handleFilterRoom={handleFilterRoom}
                darkPallete={darkPallete}
              />
            </Row>
          </Form>

          {hasntRooms ? (
            <NoProjectInfo darkPallete={darkPallete} hasntRooms={hasntRooms} />
          ) : (
            !showTable && (
              <StyledRow align='middle' justify='center'>
                <Col>
                  <TitleStyled
                    level={5}
                    color={
                      window.innerWidth < 1024 ? darkPallete.white : "#000"
                    }
                  >
                    Selecione um Projeto para Exibir suas Candidaturas
                  </TitleStyled>
                </Col>
              </StyledRow>
            )
          )}

          {showTable && !hasntRooms && (
            <>
              <Table
                locale={{
                  emptyText: (
                    <Row justify='center'>{responseGrid?.errorMessage}</Row>
                  ),
                }}
                size='middle'
                dataSource={responseGrid?.formattedCandidacies}
                columns={columns}
                loading={loadingDataSource}
                rowSelection={rowSelection}
              />

              <Row justify='end'>
                <Button
                  color={darkPallete.white}
                  backgroundcolor={darkPallete.lightblue}
                  onClick={handleConfirmSelectedCandidacies}
                >
                  Confirmar
                </Button>
              </Row>
            </>
          )}
        </>
      ) : (
        <>{Loading(window.innerWidth < 1024 ? darkPallete.white : "#000")}</>
      )}
    </Card>
  );
};

export default CandidaciesTab;
