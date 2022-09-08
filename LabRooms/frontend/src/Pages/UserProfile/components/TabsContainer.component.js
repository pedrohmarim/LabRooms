import React, { useState, useContext } from "react";
import { Card } from "../UserProfile.component.styled";
import { Tabs } from "../../../antd_components";
import UserInfoTab from "./Tabs/UserInfoTab.component";
import RoomsTab from "./Tabs/RoomsTab.component";
import CandidaciesTab from "./Tabs/CandidaciesTab.component";
import DashboardTab from "./Tabs/DashboardTab.component";
import { UserContext } from "../../../Context/UserContext";
import { TIPO_CADASTRO } from "../../../Helpers/TipoCadastro";
import { TIPO_CATEGORIA } from "../../../Helpers/TipoCategoria";

export default function TabUserInfo({
  user,
  darkPallete,
  navigate,
  token,
  viewMode,
  activeKey,
  setCandidaciesActive,
  setDashboardActive,
  candidaciesActive,
  dashboardActive,
  setActiveKey,
}) {
  const [_id, setRoomId] = useState(null);
  const [collapseDisabled, setCollapseDisabled] = useState(false);
  const { TabPane } = Tabs;
  const {
    setTabRooms,
    tabRooms,
    categories,
    allRooms,
    hasntRooms,
    getRoomsByOwnerId,
    getRooms,
  } = useContext(UserContext);

  function handleFilterRoom(roomSelectId) {
    if (roomSelectId === TIPO_CATEGORIA.CATEGORIA_TODAS) {
      setTabRooms({ array: allRooms });
      setRoomId(null);
    } else {
      const filteredRoom = allRooms.find(({ _id }) => _id === roomSelectId);
      const { _id } = filteredRoom;
      setTabRooms({ array: [filteredRoom] });
      setRoomId(_id);
    }
  }

  return (
    <Card
      bodyStyle={{ display: "none" }}
      bordered={false}
      title={
        <Tabs
          defaultActiveKey='1'
          activeKey={activeKey}
          onTabClick={(activeKey) => {
            if (activeKey === "2") setCollapseDisabled(false);
            setActiveKey(activeKey);
          }}
        >
          <TabPane tab={viewMode ? "Perfil" : "Meu Perfil"} key='1'>
            <UserInfoTab
              darkPallete={darkPallete}
              user={user}
              token={token}
              navigate={navigate}
              viewMode={viewMode}
            />
          </TabPane>

          {!viewMode && user?.accountType === TIPO_CADASTRO.EMPRESA && (
            <>
              <TabPane tab='Meus Projetos' key='2'>
                <RoomsTab
                  setCollapseDisabled={(value) => setCollapseDisabled(value)}
                  collapseDisabled={collapseDisabled}
                  getRooms={getRooms}
                  getRoomsByOwnerId={getRoomsByOwnerId}
                  hasntRooms={hasntRooms}
                  darkPallete={darkPallete}
                  handleFilterRoom={handleFilterRoom}
                  categories={categories}
                  setRoomId={setRoomId}
                  _id={_id}
                  tabRooms={tabRooms}
                  token={token}
                  navigate={navigate}
                  setCandidaciesActive={setCandidaciesActive}
                />
              </TabPane>

              <TabPane tab='Candidatos' key='3'>
                <CandidaciesTab
                  setDashboardActive={setDashboardActive}
                  roomId={candidaciesActive?.roomId}
                  darkPallete={darkPallete}
                  token={token}
                  hasntRooms={hasntRooms}
                  tabRooms={tabRooms}
                />
              </TabPane>

              <TabPane tab='Dashboard' key='4'>
                <DashboardTab dashboardActive={dashboardActive} />
              </TabPane>
            </>
          )}
        </Tabs>
      }
    />
  );
}
