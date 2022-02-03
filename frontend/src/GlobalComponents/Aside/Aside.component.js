import React, { useState } from "react";
import { Layout, Menu, Icons } from "../../antd_components";
import { darkPallete } from "../../styles/pallete";

const Aside = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { Sider } = Layout;
  const { SubMenu } = Menu;

  return (
    <Layout style={{ position: "absolute", zIndex: 999 }}>
      <Sider
        collapsed={collapsed}
        onMouseLeave={() => setCollapsed(true)}
        onMouseEnter={() => setCollapsed(false)}
      >
        <Menu
          // defaultSelectedKeys={["1"]}
          mode='inline'
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#000",
            color: darkPallete.white,
          }}
        >
          <Menu.Item key='1' icon={<Icons.PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key='2' icon={<Icons.DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <SubMenu key='sub1' icon={<Icons.UserOutlined />} title='User'>
            <Menu.Item key='3'>Tom</Menu.Item>
            <Menu.Item key='4'>Bill</Menu.Item>
            <Menu.Item key='5'>Alex</Menu.Item>
          </SubMenu>
          <SubMenu key='sub2' icon={<Icons.TeamOutlined />} title='Team'>
            <Menu.Item key='6'>Team 1</Menu.Item>
            <Menu.Item key='8'>Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key='9' icon={<Icons.FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
};

export default Aside;
