import React, { useEffect, useCallback, useState, useContext } from "react";
import { UserContext } from "../../../../Context/UserContext";
import { Card, StyledRow } from "../../UserProfile.component.styled";
import { Loading } from "../../../../GlobalComponents/Loading/Loading.component";
import HeaderTabRoomsCandidacies from "../../../../GlobalComponents/HeaderTabRoomsCandidacies/HeaderTabRoomsCandidacies.component";
import * as CandidaciesService from "../../services/Candidacies.service";
import { ModalButton } from "../../../ViewProject/ViewProject.component.styled";
import { Link } from "react-router-dom";
import { TitleStyled } from "../../../Home/components/Rooms/styles";
import NoProjectInfo from "../../../../GlobalComponents/NoProjectInfo/NoProjectInfo.component";
import {
  Row,
  Form,
  Table,
  FeatherIcons,
  Button,
  Tooltip,
  PopConfirm,
  Notification,
  Col,
} from "../../../../antd_components";

const CandidaciesTab = ({
  darkPallete,
  token,
  hasntRooms,
  tabRooms,
  roomId,
  setDashboardActive,
}) => {
  const { screenSize } = useContext(UserContext);
  const [form] = Form.useForm();
  const [responseGrid, setResponseGrid] = useState();
  const [showTable, setShowTable] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState();
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
      setSelectedRoomId(roomId);
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
        message:
          "Selecione ao menos um candidato para prosseguir para o dashboard.",
      });

      return;
    }

    setDashboardActive({ active: true, selectedRowKeys, selectedRoomId });

    selectedRowKeys.forEach((userId) => {
      CandidaciesService.deleteCandidacieById(userId, token);

      handleFilterRoom(roomId);
    });
  }

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
      render({ Icon, CategorieTitle }) {
        return (
          <Row align='middle'>
            <FeatherIcons icon={Icon} size={15} />
            <ModalButton>{CategorieTitle}</ModalButton>
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
      render: (value, dataIndex) => (
        <Button.Group>
          <Tooltip title='Ver Perfil' color={darkPallete.lightblue}>
            <Link
              to={{
                pathname: `/profile/${value}`,
                search: "fromCandidacies=true",
              }}
            >
              <Button
                type='ghost'
                shape='circle'
                icon={<FeatherIcons icon='eye' size={18} />}
              />
            </Link>
          </Tooltip>

          <Tooltip title='Enviar E-mail' color={darkPallete.lightblue}>
            <Link to='#'>
              <Button
                type='ghost'
                shape='circle'
                icon={<FeatherIcons icon='mail' size={18} />}
              />
            </Link>
          </Tooltip>

          <Tooltip
            placement='left'
            title='Rejeitar Candidato. Está Ação Irá excluir o Registro deste Candidato.'
            color={darkPallete.lightblue}
          >
            <PopConfirm
              placement='topLeft'
              title='Deseja realmente Excluir?'
              onConfirm={() => {
                handleDeleteCandidate(value);
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
        </Button.Group>
      ),
    },
  ];

  return (
    <Card bordered={false}>
      {!hasntRooms && tabRooms?.array && !tabRooms.loading ? (
        <>
          <Form form={form}>
            <Row justify='space-between' gutter={[10, 10]}>
              <HeaderTabRoomsCandidacies
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
                      screenSize?.dynamicWidth < 1024
                        ? darkPallete.white
                        : "#000"
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
        <>
          {Loading(
            screenSize?.dynamicWidth < 1024 ? darkPallete.white : "#000"
          )}
        </>
      )}
    </Card>
  );
};

export default CandidaciesTab;
