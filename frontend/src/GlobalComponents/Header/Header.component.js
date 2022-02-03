import React, { useState } from "react";
import { Row, Col, Image, Button, FeatherIcons } from "../../antd_components";
import Logo from "../../assets/logo1.png";
import { darkPallete } from "../../styles/pallete";
import { HeaderContainer } from "./Header.styled";
import { Link } from "react-router-dom";

const Header = () => {
  const [ExpandLogin, setExpandLogin] = useState();
  const { lightblue, white } = darkPallete;

  return (
    <HeaderContainer>
      <Row align='middle' justify='space-between' style={{ padding: "0 15px" }}>
        <Link to='/'>
          <Image src={Logo} alt='Logo' height={100} preview={false} />
        </Link>

        {window.location.pathname === "/" && (
          <Col>
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
          </Col>
        )}
      </Row>
    </HeaderContainer>
  );
};

export default Header;
