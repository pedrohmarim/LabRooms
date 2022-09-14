import React, { useCallback, useContext, useEffect } from "react";
import Board, { moveCard } from "@lourenci/react-kanban";
import { StyledRow } from "../../UserProfile.component.styled";
import "@lourenci/react-kanban/dist/styles.css";
import { TitleStyled } from "../../../Home/components/Rooms/styles";
import { UserContext } from "../../../../Context/UserContext";
import HeaderTabRoomsCandidacies from "../../../../GlobalComponents/HeaderTabRoomsCandidacies/HeaderTabRoomsCandidacies.component";
import {
  Card,
  DashboardCard,
  CategorySpan,
} from "../../UserProfile.component.styled";
import { Link } from "react-router-dom";
import {
  Row,
  Form,
  Col,
  FeatherIcons,
  Tooltip,
} from "../../../../antd_components";

const DashboardTab = ({
  dashboardActive,
  setDashboardActive,
  tabRooms,
  darkPallete,
}) => {
  const [form] = Form.useForm();
  const {
    getDashboardUsers,
    dashboardUsers,
    setDashboardUsers,
    updateDashBoard,
    screenSize,
  } = useContext(UserContext);

  function handleCardMove(_card, source, destination) {
    const updatedBoard = moveCard(dashboardUsers, source, destination);
    updateDashBoard(updatedBoard, dashboardUsers._id);
    setDashboardUsers(updatedBoard);
  }

  const handleFilterRoom = useCallback(
    (roomId) => {
      getDashboardUsers(dashboardActive?.selectedRowKeys, roomId);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dashboardActive]
  );

  useEffect(() => {
    if (dashboardActive?.selectedRoomId)
      handleFilterRoom(dashboardActive?.selectedRoomId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardActive]);

  return (
    <Card bordered={false}>
      <Form form={form}>
        <Row justify='space-between' gutter={[10, 10]}>
          <HeaderTabRoomsCandidacies
            fromCandidacies
            headerTitle='Dashboard de Candidatos'
            tabRooms={tabRooms}
            darkPallete={darkPallete}
            handleFilterRoom={(roomId) => {
              handleFilterRoom(roomId);
              setDashboardActive(null);
            }}
          />
        </Row>
      </Form>

      {dashboardUsers?.columns?.length > 0 ? (
        <Board
          onCardDragEnd={handleCardMove}
          disableColumnDrag
          renderCard={({ title, id, category, icon }) => (
            <DashboardCard gutter={[0, 2]}>
              <Col span={24}>
                <Row align='middle' justify='space-between'>
                  <Col span={22}>{title}</Col>

                  <Col span={2}>
                    <Tooltip title='Ver Perfil' color={darkPallete.lightblue}>
                      <Link
                        to={{
                          pathname: `/profile/${id}`,
                          search: "fromCandidacies=true",
                        }}
                      >
                        <FeatherIcons
                          icon='eye'
                          size={20}
                          className='clickableIcon'
                        />
                      </Link>
                    </Tooltip>
                  </Col>
                </Row>
              </Col>

              <Col>
                <Row align='middle'>
                  <FeatherIcons icon={icon} size={16} className='colorgray' />
                  <CategorySpan>{category}</CategorySpan>
                </Row>
              </Col>
            </DashboardCard>
          )}
        >
          {dashboardUsers}
        </Board>
      ) : (
        <>
          <StyledRow align='middle' justify='center'>
            <TitleStyled
              level={5}
              color={
                screenSize?.dynamicWidth < 1024 ? darkPallete.white : "#000"
              }
            >
              Não há candidatos registrados para este Dashboard.
            </TitleStyled>
          </StyledRow>

          <StyledRow align='middle' justify='center'>
            Selecione alguns registros na seção 'Candidatos'.
          </StyledRow>
        </>
      )}
    </Card>
  );
};

export default DashboardTab;
