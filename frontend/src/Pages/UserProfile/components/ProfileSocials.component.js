import React from "react";
import {
  Row,
  Breadcrumb,
  Image,
  Col,
  Typography,
  Button,
  Divider,
  FeatherIcons,
} from "../../../antd_components";
import UserImage from "../../../assets/userImage.jpg";
import { Loading } from "../../../GlobalComponents/Loading/Loading.component";

export default function ProfileSocials({ darkPallete, user }) {
  const { Title } = Typography;

  return (
    <Row justify='center' gutter={[16, 16]}>
      {user ? (
        <>
          <Col span={24}>
            <Breadcrumb />
          </Col>

          <Image src={UserImage} height={120} />

          <Col span={24} style={{ textAlign: "center" }}>
            <Title level={4}>{user?.username}</Title>
            <Typography style={{ color: "#A0ACBC" }}>
              Junior developer
            </Typography>
            <Typography style={{ color: "#A0ACBC" }}>
              Porto Ferreira, SP
            </Typography>
            <Typography style={{ color: "#A0ACBC" }}>
              Membro desde{" "}
              {new Intl.DateTimeFormat("pt-BR").format(user?.createdAt.format)}
            </Typography>
          </Col>

          <Button
            color={darkPallete.white}
            backgroundcolor={darkPallete.lightblue}
            width={200}
            height={35}
          >
            Enviar Mensagem
          </Button>

          <Divider
            style={{
              margin: "5px 0 0 0",
              border: "solid 1px rgba(191, 191, 191, 0.7)",
            }}
          />

          <Col span={24}>
            <Row justify='space-around'>
              <Typography
                style={{
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FeatherIcons icon='github' size={16} />
                <span style={{ margin: "2px 0 0 2px" }}> GitHub</span>
              </Typography>
              <Typography style={{ color: "#A0ACBC" }}>trilp123</Typography>
            </Row>
          </Col>
        </>
      ) : (
        Loading("#000")
      )}
    </Row>
  );
}
