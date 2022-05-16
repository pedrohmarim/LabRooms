import React, { useContext } from "react";
import { Layout, Tooltip } from "../../antd_components";
import { HomeOutlined, UserOutlined, LoginOutlined } from "@ant-design/icons";
import { Menu, SiderStyled, MenuItem, AsideLogo } from "./styles";
import LogoIcon from "../../assets/logoIcon.png";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const Aside = ({ darkPallete, SelectedItem }) => {
  const navigate = useNavigate();
  const IconStyle = {
    fontSize: "18pt",
    marginTop: "8px",
  };

  const { user } = useContext(UserContext);

  return (
    <Layout hasSider>
      <SiderStyled collapsed>
        <Menu defaultSelectedKeys={[SelectedItem]} color={darkPallete.white}>
          <Link to='/'>
            <AsideLogo src={LogoIcon} height={90} alt='Logo' />
          </Link>
          <Tooltip title='Home' placement='right' color={darkPallete.lightblue}>
            <MenuItem
              key='1'
              eventKey='1'
              icon={<HomeOutlined style={IconStyle} />}
              onClick={() => navigate("/")}
            />
          </Tooltip>

          {user !== null &&
            window.location.pathname.split("/")[1] !== "profile" && (
              <Tooltip
                title='Meu perfil'
                placement='right'
                color={darkPallete.lightblue}
              >
                <MenuItem
                  key='2'
                  eventKey='2'
                  icon={<UserOutlined style={IconStyle} />}
                  onClick={() => navigate(`/profile/${user?._id}`)}
                />
              </Tooltip>
            )}

          {user === null && (
            <Tooltip
              title='Fazer login'
              placement='right'
              color={darkPallete.lightblue}
            >
              <MenuItem
                key='2'
                eventKey='2'
                icon={<LoginOutlined style={IconStyle} />}
                onClick={() => navigate("/signin")}
              />
            </Tooltip>
          )}
        </Menu>
      </SiderStyled>
    </Layout>
  );
};

export default Aside;
