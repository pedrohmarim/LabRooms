import React, { useState, useEffect } from "react";
import { Card } from "../UserProfile.component.styled";
import { Tabs } from "../../../antd_components";
import UserInfoTab from "./Tabs/UserInfoTab.component";
import RoomsTab from "./Tabs/RoomsTab.component";
import { useSearchParams } from "react-router-dom";

export default function TabUserInfo({
  user,
  darkPallete,
  navigate,
  token,
  viewMode,
}) {
  const { TabPane } = Tabs;
  const [searchParams] = useSearchParams();
  const [activeKey, setActiveKey] = useState("1");

  useEffect(() => {
    if (searchParams.get("projects")) setActiveKey("2");
  }, [searchParams]);

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
          <TabPane tab='Meu Perfil' key='1'>
            <UserInfoTab
              darkPallete={darkPallete}
              user={user}
              token={token}
              navigate={navigate}
              viewMode={viewMode}
            />
          </TabPane>

          {!viewMode && (
            <TabPane tab='Meus Projetos' key='2'>
              <RoomsTab
                darkPallete={darkPallete}
                user={user}
                token={token}
                navigate={navigate}
              />
            </TabPane>
          )}
        </Tabs>
      }
    />
  );
}
