import React, { useState, useEffect, useContext } from "react";
import Logo from "../../assets/logo1.png";
import { darkPallete } from "../../styles/pallete";
import { UserContext } from "../../Context/UserContext";
import { ButtonText } from "../../Pages/Home/components/Rooms/styles";
import { HeaderContainer, MenuLabelItem, StyledRow } from "./Header.styled";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { TIPO_CADASTRO } from "../../Helpers/TipoCadastro";
import { MontaUrlDominio } from "../../Helpers/UrlDominio";
import { Loading } from "../Loading/Loading.component";
import {
  Row,
  Col,
  Image,
  Button,
  Avatar,
  FeatherIcons,
  Menu,
  Dropdown,
  Tooltip,
} from "../../antd_components";

const Header = ({ fromNotFound, fromUserProfile }) => {
  const navigate = useNavigate();
  const [ExpandLogin, setExpandLogin] = useState();
  const [solidHeader, setSolidHeader] = useState(false);
  const { lightblue, white } = darkPallete;

  const { user, loading, screenSize } = useContext(UserContext);

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

      {user?.accountType === TIPO_CADASTRO.EMPRESA && (
        <Link
          to={{ pathname: `/profile/${user?._id}`, search: "projects=true" }}
        >
          <Menu.Item>
            <Row align='middle' justify='start'>
              <FeatherIcons icon='folder' size={15} />
              <MenuLabelItem>Projetos</MenuLabelItem>
            </Row>
          </Menu.Item>
        </Link>
      )}

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
    <HeaderContainer
      solidHeader={solidHeader}
      fromUserProfile={fromUserProfile}
    >
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
          {loading && Loading(darkPallete.white)}
          {!fromNotFound && user === null && !loading ? (
            <Link to='/signin'>
              <Tooltip
                title={screenSize?.dynamicWidth < 1024 && "Entrar"}
                defaultVisible={screenSize?.dynamicWidth < 1024}
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
            user &&
            !loading && (
              <Dropdown
                placement='bottomRight'
                overlay={MoreActionsRoom}
                trigger={screenSize?.dynamicWidth < 1024 ? "click" : "hover"}
              >
                <Avatar
                  style={{
                    cursor: "pointer",
                    border: "solid 1px rgba(255, 255, 255, 0.2)",
                  }}
                  size={50}
                  alt='Image'
                  src={`${MontaUrlDominio()}${user?.imagePath}`}
                  preview={false}
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
