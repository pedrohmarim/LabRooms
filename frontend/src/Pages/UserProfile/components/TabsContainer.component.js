import React from "react";
import { Card } from "../UserProfile.component.styled";
import { Tabs } from "../../../antd_components";
import UserInfoTab from "./Tabs/UserInfoTab.component";
import RoomsTab from "./Tabs/RoomsTab.component";

export default function TabUserInfo({ user, darkPallete, navigate, token }) {
  const { TabPane } = Tabs;

  return (
    <Card
      bodyStyle={{ display: "none" }}
      bordered={false}
      title={
        <Tabs defaultActiveKey='1'>
          <TabPane tab='Meu Perfil' key='1'>
            <UserInfoTab
              darkPallete={darkPallete}
              user={user}
              token={token}
              navigate={navigate}
            />
          </TabPane>

          <TabPane tab='Minhas Salas' key='2'>
            <RoomsTab
              darkPallete={darkPallete}
              user={user}
              token={token}
              navigate={navigate}
            />
          </TabPane>
        </Tabs>
      }
    />
  );
}
