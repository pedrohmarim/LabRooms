import React, { useEffect, useCallback, useState } from "react";
import { Card, StyledRow } from "../../UserProfile.component.styled";

import { Loading } from "../../../../GlobalComponents/Loading/Loading.component";
import HeaderTabRoomsCandidacies from "../../../../GlobalComponents/HeaderTabRoomsCandidacies/HeaderTabRoomsCandidacies.component";
import * as CandidaciesService from "../../services/Candidacies.service";
import { ModalButton } from "../../../ViewProject/ViewProject.component.styled";
import { Link } from "react-router-dom";
import { TitleStyled } from "../../../Home/components/Rooms/styles";
import {
  Row,
  Form,
  Table,
  FeatherIcons,
  Button,
  Tooltip,
  PopConfirm,
  Notification,
} from "../../../../antd_components";

const CandidaciesTab = ({
  darkPallete,
  token,
  hasntRooms,
  tabRooms,
  allRooms,
  roomId,
}) => {
  const [form] = Form.useForm();
  const [responseGrid, setResponseGrid] = useState();
  const [showTable, setShowTable] = useState(false);
  const [loadingDataSource, setLoadingDataSource] = useState();

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
        const { success, message} = data;

        Notification.open({
          type: success ? "success" : "error",
          message,
        });
      }
    );
  }

  const columns = [
    {
      title: "Nome",
      dataIndex: "username",
      key: "username",
      render(value) {
        return <>{value}</>;
      },
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      render(value) {
        return <>{value}</>;
      },
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
      dataIndex: "userId",
      key: "Excluir",
      width: 100,
      render: (value, dataIndex) => {
        return (
          <Button.Group>
            <Tooltip title='Ver Perfil'>
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

            <Tooltip title='Excluir Candidato'>
              <PopConfirm
                placement='topLeft'
                title='Deseja realmente excluir?'
                onConfirm={() => {
                  handleDeleteCandidate(dataIndex?.candidacieId)
                  handleFilterRoom(dataIndex?.roomId)
                }}
                okText='Sim'
                cancelText='Não'
              >
                <Button
                  type='ghost'
                  icon={
                    <FeatherIcons
                      icon='trash-2'
                      size={18}
                      className='alert-icon'
                    />
                  }
                  shape='circle'
                />
              </PopConfirm>
            </Tooltip>
          </Button.Group>
        );
      },
    },
  ];

  return (
    <Card bordered={false}>
      <Form form={form}>
        <Row justify='space-between' gutter={[10, 10]}>
          {!hasntRooms && tabRooms?.array && !tabRooms.loading ? (
            <HeaderTabRoomsCandidacies
              roomId={roomId}
              fromCandidacies
              headerTitle='Meus Candidatos'
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
      </Form>

      {!responseGrid && (
        <StyledRow align='middle' justify='center'>
          <TitleStyled
            level={5}
            color={window.innerWidth < 1024 ? darkPallete.white : "#000"}
          >
            Selecione um Projeto para Visualizar suas Candidaturas
          </TitleStyled>
        </StyledRow>
      )}

      {showTable && (
        <Table
          locale={{
            emptyText: <Row justify='center'>{responseGrid?.errorMessage}</Row>,
          }}
          size='middle'
          dataSource={responseGrid?.formattedCandidacies}
          columns={columns}
          loading={loadingDataSource}
        />
      )}
    </Card>
  );
};

export default CandidaciesTab;
