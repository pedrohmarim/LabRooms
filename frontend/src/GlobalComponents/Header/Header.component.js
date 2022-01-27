import React, { useState } from "react";
import { Row, Col, Image, Button, Icons } from "../../antd_components";
import Logo from "../../assets/logo1.png";
import { darkPallete } from "../../styles/pallete";
import { HeaderContainer } from "./Header.styled";
import { Link } from "react-router-dom";

const Header = () => {
  const [expandLogin, setExpandLogin] = useState();
  const [expandRegister, setExpandRegister] = useState();
  const { lightblue, white } = darkPallete;

  return (
    <HeaderContainer>
      <Row
        align='middle'
        justify='space-between'
        style={{ padding: "0 15px", position: "" }}
      >
        <Link to='/'>
          <Image src={Logo} alt='Logo' height={100} preview={false} />
        </Link>

        {window.location.pathname === "/" && (
          <Col>
            <Link to='/signup'>
              <Button
                icon={<Icons.UserOutlined />}
                color={white}
                backgroundcolor={lightblue}
                style={{ marginRight: "10px" }}
                onMouseEnter={() => setExpandRegister(true)}
                onMouseLeave={() => setExpandRegister(false)}
              >
                {expandRegister && "Registrar"}
              </Button>
            </Link>
            <Button
              icon={<Icons.LoginOutlined />}
              color={white}
              backgroundcolor={lightblue}
              onMouseEnter={() => setExpandLogin(true)}
              onMouseLeave={() => setExpandLogin(false)}
            >
              {expandLogin && "Entrar"}
            </Button>
          </Col>
        )}
      </Row>
    </HeaderContainer>
  );
};

export default Header;
