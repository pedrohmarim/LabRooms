import React, { useState, useEffect, useContext } from "react";
import Logo from "../../assets/logo1.png";
import { darkPallete } from "../../styles/pallete";
import { UserContext } from "../../Context/UserContext";
import { ButtonText } from "../../Pages/Home/components/Rooms/styles";
import { HeaderContainer, MenuLabelItem, StyledRow } from "./Header.styled";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import {
  Row,
  Col,
  Image,
  Button,
  FeatherIcons,
  Menu,
  Dropdown,
  Tooltip,
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
      <Link to={`/profile/${user?._id}`}>
        <Menu.Item>
          <Row align='middle' justify='start'>
            <FeatherIcons icon='user' size={15} />
            <MenuLabelItem>Perfil</MenuLabelItem>
          </Row>
        </Menu.Item>
      </Link>
      <Link to={{ pathname: `/profile/${user?._id}`, search: "projects=true" }}>
        <Menu.Item>
          <Row align='middle' justify='start'>
            <FeatherIcons icon='folder' size={15} />
            <MenuLabelItem>Projetos</MenuLabelItem>
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
      <StyledRow align='middle' justify='space-between'>
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
              <Tooltip
                title={window.innerWidth < 1024 && "Entrar"}
                defaultVisible={window.innerWidth < 1024}
                color={darkPallete.lightblue}
              >
                <Button
                  icon={<FeatherIcons icon='log-in' size={18} />}
                  color={white}
                  backgroundcolor={lightblue}
                  onMouseEnter={() => setExpandLogin(true)}
                  onMouseLeave={() => setExpandLogin(false)}
                >
                  {ExpandLogin && <ButtonText>Entrar</ButtonText>}
                </Button>
              </Tooltip>
            </Link>
          ) : (
            !fromNotFound &&
            user && (
              <Dropdown
                overlay={MoreActionsRoom}
                trigger={window.innerWidth < 1024 ? "click" : "hover"}
              >
                <Button
                  icon={<FeatherIcons icon='user' size={18} />}
                  color={white}
                  backgroundcolor={lightblue}
                  onMouseEnter={() => setExpandLogin(true)}
                  onMouseLeave={() => setExpandLogin(false)}
                />
              </Dropdown>
            )
          )}
        </Col>
      </StyledRow>
    </HeaderContainer>
  );
};

export default Header;
