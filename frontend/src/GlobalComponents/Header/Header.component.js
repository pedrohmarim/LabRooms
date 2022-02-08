import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Image, Button, FeatherIcons } from "../../antd_components";
import Logo from "../../assets/logo1.png";
import { darkPallete } from "../../styles/pallete";
import { UserContext } from "../../Context/UserContext";
import { HeaderContainer } from "./Header.styled";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";

const Header = ({ fromNotFound }) => {
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
  }, []);

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
          {!fromNotFound && !user ? (
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
              <Button
                onClick={() => {
                  window.location.reload();
                  Cookie.remove("token");
                }}
                icon={<FeatherIcons icon='log-out' size={18} />}
                color={white}
                backgroundcolor={lightblue}
                style={{ marginRight: "10px" }}
                onMouseEnter={() => setExpandLogin(true)}
                onMouseLeave={() => setExpandLogin(false)}
              >
                {ExpandLogin && <span style={{ marginLeft: "5px" }}>Sair</span>}
              </Button>
            )
          )}
        </Col>
      </Row>
    </HeaderContainer>
  );
};

export default Header;
