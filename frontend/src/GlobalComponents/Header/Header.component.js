import React, { useState, useEffect, useContext, useRef } from "react";
import Logo from "../../assets/logo1.png";
import { darkPallete } from "../../styles/pallete";
import { UserContext } from "../../Context/UserContext";
import { HeaderContainer, HeaderMenu, MenuLabelItem } from "./Header.styled";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";
import { Row, Col, Image, Button, FeatherIcons } from "../../antd_components";
import { ControlledMenu, MenuItem, useMenuState } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

const Header = ({ fromNotFound }) => {
  const [ExpandLogin, setExpandLogin] = useState();
  const [solidHeader, setSolidHeader] = useState(false);
  const ref = useRef(null);
  const { toggleMenu, ...menuProps } = useMenuState({ transition: true });
  const { lightblue, white } = darkPallete;

  const { user } = useContext(UserContext);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) setSolidHeader(true);
      else setSolidHeader(false);
    };

    window.addEventListener("scroll", scrollListener);
  }, [user]);

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
              <>
                <HeaderMenu ref={ref} onMouseEnter={() => toggleMenu(true)}>
                  <Button
                    icon={<FeatherIcons icon='user' size={18} />}
                    color={white}
                    backgroundcolor={lightblue}
                    style={{ marginRight: "10px" }}
                    onMouseEnter={() => setExpandLogin(true)}
                    onMouseLeave={() => setExpandLogin(false)}
                  />
                </HeaderMenu>

                <ControlledMenu
                  {...menuProps}
                  anchorRef={ref}
                  onMouseLeave={() => toggleMenu(false)}
                  onClose={() => toggleMenu(false)}
                >
                  <MenuItem>
                    <FeatherIcons icon='user' size={15} />
                    <MenuLabelItem>Perfil</MenuLabelItem>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      window.location.reload();
                      Cookie.remove("token");
                    }}
                  >
                    <FeatherIcons icon='log-out' size={15} />
                    <MenuLabelItem>Sair</MenuLabelItem>
                  </MenuItem>
                </ControlledMenu>
              </>
            )
          )}
        </Col>
      </Row>
    </HeaderContainer>
  );
};

export default Header;
