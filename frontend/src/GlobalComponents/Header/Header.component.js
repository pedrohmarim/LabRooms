import React from "react";
import { Row, Col, Image, Button, Divider, Icons } from "../../antd_components";
import Logo from "../../assets/logo.png";
import { darkPallete } from "../../styles/pallete";

const Header = ({ Link }) => {
  const { darkBackground, green, white } = darkPallete;

  return (
    <>
      <Row
        align='middle'
        justify='space-between'
        style={{ padding: "15px 15px 0 15px" }}
      >
        <Link to='/'>
          <Image src={Logo} alt='Logo' height={44} preview={false} />
        </Link>

        <Col>
          <Button
            icon={<Icons.UserOutlined />}
            color={darkBackground}
            backgroundcolor={green}
            style={{ marginRight: "10px" }}
          >
            Registrar
          </Button>
          <Button
            icon={<Icons.LoginOutlined />}
            color={darkBackground}
            backgroundcolor={green}
          >
            Entrar
          </Button>
        </Col>
      </Row>
      <Divider
        style={{ border: "1px solid rgba(255,255,255,0.05)", margin: "18px 0" }}
      />
    </>
  );
};

export default Header;
