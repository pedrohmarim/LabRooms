import React, { useState } from "react";
import { Layout, FeatherIcons } from "../../antd_components";
import { darkPallete } from "../../styles/pallete";
import { Menu, SiderStyled } from "./styles";

const Aside = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { SubMenu } = Menu;

  return (
    <Layout hasSider>
      <SiderStyled
        collapsed={collapsed}
        onMouseLeave={() => setCollapsed(true)}
        onMouseEnter={() => setCollapsed(false)}
      >
        <Menu
          // defaultSelectedKeys={["1"]}
          mode='inline'
          color={darkPallete.white}
        >
          <Menu.Item key='1' icon={<FeatherIcons icon='user' />}>
            Option 1
          </Menu.Item>
          <Menu.Item key='2' icon={<FeatherIcons icon='user' />}>
            Option 2
          </Menu.Item>
          <SubMenu key='sub1' icon={<FeatherIcons icon='user' />} title='User'>
            <Menu.Item key='3'>Tom</Menu.Item>
            <Menu.Item key='4'>Bill</Menu.Item>
            <Menu.Item key='5'>Alex</Menu.Item>
          </SubMenu>
          <SubMenu key='sub2' icon={<FeatherIcons icon='user' />} title='Team'>
            <Menu.Item key='6'>Team 1</Menu.Item>
            <Menu.Item key='8'>Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key='9' icon={<FeatherIcons icon='user' />}>
            Files
          </Menu.Item>
        </Menu>
      </SiderStyled>
    </Layout>
  );
};

export default Aside;
