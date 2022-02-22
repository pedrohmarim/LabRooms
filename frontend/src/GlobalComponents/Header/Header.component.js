import React, { useState, useEffect, useContext } from "react";
import Logo from "../../assets/logo1.png";
import { darkPallete } from "../../styles/pallete";
import { UserContext } from "../../Context/UserContext";
import { HeaderContainer, MenuLabelItem } from "./Header.styled";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { HomeOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Image,
  Button,
  FeatherIcons,
  Menu,
  Dropdown,
} from "../../antd_components";

const Header = ({ fromNotFound }) => {
  const navigate = useNavigate();
  const [ExpandLogin, setExpandLogin] = useState();
  const [solidHeader, setSolidHeader] = useState(false);
  const { lightblue, white } = darkPallete;

  const { user } = useContext(UserContext);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) setSolidHeader(true);
      else setSolidHeader(false);
    };

    window.addEventListener("scroll", scrollListener);
  }, [user]);

  const MoreActionsRoom = (
    <Menu>
      <Link to='/'>
        <Menu.Item>
          <Row align='middle' justify='start'>
            <HomeOutlined />
            <MenuLabelItem>Home</MenuLabelItem>
          </Row>
        </Menu.Item>
      </Link>
      <Link to={`/profile/${user?.username}`}>
        <Menu.Item>
          <Row align='middle' justify='start'>
            <FeatherIcons icon='user' size={15} />
            <MenuLabelItem>Perfil</MenuLabelItem>
          </Row>
        </Menu.Item>
      </Link>
      <Menu.Item
        onClick={() => {
          Cookie.remove("token");
          navigate("/");
          window.location.reload();
        }}
      >
        <Row align='middle'>
          <FeatherIcons icon='log-out' size={15} />
          <MenuLabelItem>Sair</MenuLabelItem>
        </Row>
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderContainer solidHeader={solidHeader}>
      <Row align='middle' justify='space-between' style={{ padding: "0 15px" }}>
        <Link to='/'>
          <Image
            src={Logo}
            alt='Logo'
            height={solidHeader ? 74 : 100}
            preview={false}
          />
        </Link>

        <Col>
          {!fromNotFound && user === null ? (
            <Link to='/signin'>
              <Button
                icon={<FeatherIcons icon='log-in' size={18} />}
                color={white}
                backgroundcolor={lightblue}
                style={{ marginRight: "10px" }}
                onMouseEnter={() => setExpandLogin(true)}
                onMouseLeave={() => setExpandLogin(false)}
              >
                {ExpandLogin && (
                  <span style={{ marginLeft: "5px" }}>Entrar</span>
                )}
              </Button>
            </Link>
          ) : (
            !fromNotFound &&
            user && (
              <Dropdown overlay={MoreActionsRoom}>
                <Button
                  icon={<FeatherIcons icon='user' size={18} />}
                  color={white}
                  backgroundcolor={lightblue}
                  style={{ marginRight: "10px" }}
                  onMouseEnter={() => setExpandLogin(true)}
                  onMouseLeave={() => setExpandLogin(false)}
                />
              </Dropdown>
            )
          )}
        </Col>
      </Row>
    </HeaderContainer>
  );
};

export default Header;
