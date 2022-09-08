import React, { useContext, useEffect } from "react";
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import { UserContext } from "../../../../Context/UserContext";

const DashboardTab = ({ dashboardActive }) => {
  const {
    getDashboardUsers,
    dashboardUsers,
    setDashboardUsers,
    updateDashBoard,
  } = useContext(UserContext);

  useEffect(() => {
    getDashboardUsers(dashboardActive.selectedRowKeys);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardActive.selectedRowKeys]);

  function handleCardMove(_card, source, destination) {
    const updatedBoard = moveCard(dashboardUsers, source, destination);
    updateDashBoard(updatedBoard, dashboardUsers._id);
    setDashboardUsers(updatedBoard);
  }

  return (
    <>
      {dashboardUsers?.columns?.length > 0 && (
        <Board onCardDragEnd={handleCardMove} disableColumnDrag>
          {dashboardUsers}
        </Board>
      )}
    </>
  );
};

export default DashboardTab;
