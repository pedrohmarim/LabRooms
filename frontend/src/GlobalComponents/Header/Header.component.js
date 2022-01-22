import React, { useState } from "react";
import { Row, Col, Image, Button, Icons } from "../../antd_components";
import Logo from "../../assets/logo1.png";
import { darkPallete } from "../../styles/pallete";
import { HeaderContainer } from "./Header.styled";

const Header = ({ Link }) => {
  const [expandLogin, setExpandLogin] = useState();
  const [expandRegister, setExpandRegister] = useState();
  const { lightblue, white } = darkPallete;

  return (
    <HeaderContainer>
      <Row align='middle' justify='space-between' style={{ padding: "0 15px" }}>
        <Link to='/'>
          <Image src={Logo} alt='Logo' height={100} preview={false} />
        </Link>

        <Col>
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
      </Row>
    </HeaderContainer>
  );
};

export default Header;
