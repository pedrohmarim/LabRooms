import React from "react";
import { Layout, Tooltip } from "../../antd_components";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, SiderStyled, MenuItem } from "./styles";
import LogoIcon from "../../assets/logoIcon.png";
import { Link, useNavigate } from "react-router-dom";

const Aside = ({ darkPallete }) => {
  const navigate = useNavigate();

  const IconStyle = {
    fontSize: "18pt",
    marginTop: "8px",
  };

  return (
    <Layout hasSider>
      <SiderStyled collapsed>
        <Menu defaultSelectedKeys={["1"]} color={darkPallete.white}>
          <Link to='/'>
            <img
              src={LogoIcon}
              height={90}
              alt='Logo'
              style={{ zIndex: 999, position: "absolute", top: 0, left: 0 }}
            />
          </Link>
          <Tooltip title='Home' placement='right' color={darkPallete.lightblue}>
            <MenuItem
              eventKey='1'
              icon={<HomeOutlined style={IconStyle} />}
              onClick={() => navigate("/")}
            />
          </Tooltip>
          <Tooltip
            title='Meu perfil'
            placement='right'
            color={darkPallete.lightblue}
          >
            <MenuItem eventKey='2' icon={<UserOutlined style={IconStyle} />} />
          </Tooltip>
        </Menu>
      </SiderStyled>
    </Layout>
  );
};

export default Aside;
