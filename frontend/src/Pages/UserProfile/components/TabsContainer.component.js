import React, { useState, useContext } from "react";
import { Card } from "../UserProfile.component.styled";
import { Tabs } from "../../../antd_components";
import UserInfoTab from "./Tabs/UserInfoTab.component";
import RoomsTab from "./Tabs/RoomsTab.component";
import CandidaciesTab from "./Tabs/CandidaciesTab.component";
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
  setActiveKey,
  candidaciesActive,
}) {
  const [_id, setRoomId] = useState();
  const { TabPane } = Tabs;
  const {
    setTabRooms,
    tabRooms,
    categories,
    allRooms,
    hasntRooms,
    getRoomsByOwnerId,
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
          activeKey={activeKey}
          onTabClick={(activeKey) => {
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
                  getRoomsByOwnerId={getRoomsByOwnerId}
                  hasntRooms={hasntRooms}
                  darkPallete={darkPallete}
                  handleFilterRoom={handleFilterRoom}
                  categories={categories}
                  allRooms={allRooms}
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
                  roomId={candidaciesActive?.roomId}
                  darkPallete={darkPallete}
                  token={token}
                  hasntRooms={hasntRooms}
                  tabRooms={tabRooms}
                  allRooms={allRooms}
                />
              </TabPane>
            </>
          )}
        </Tabs>
      }
    />
  );
}
