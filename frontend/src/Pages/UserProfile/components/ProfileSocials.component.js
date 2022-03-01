import React from "react";
import {
  Row,
  Breadcrumb,
  Image,
  Col,
  FeatherIcons,
} from "../../../antd_components";
import UserImage from "../../../assets/userImage.jpg";
import { Loading } from "../../../GlobalComponents/Loading/Loading.component";
import {
  StyledBreadCrumb,
  StyledCol,
  UserInfoTitle,
  StyledButton,
  UserInfoSpan,
  StyledDivider,
  SocialContainer,
  StyledSocial,
} from "../UserProfile.component.styled";

export default function ProfileSocials({ darkPallete, user }) {
  return (
    <Row justify='center' gutter={[16, 16]}>
      {user ? (
        <>
          <StyledBreadCrumb span={24}>
            <Breadcrumb color={window.innerWidth < 1024 && darkPallete.white} />
          </StyledBreadCrumb>

          <Image src={UserImage} height={120} />

          <StyledCol span={24}>
            <UserInfoTitle level={4} color={darkPallete.white}>
              {user?.username}
            </UserInfoTitle>

            {user?.biography && (
              <UserInfoSpan color={darkPallete.white}>
                {user.biography}
              </UserInfoSpan>
            )}

            <UserInfoSpan color={darkPallete.white}>
              Membro desde {user?.createdAt}
            </UserInfoSpan>
          </StyledCol>

          <StyledButton
            margin='0 0 10px 0'
            color={darkPallete.white}
            backgroundcolor={darkPallete.lightblue}
            width={200}
            height={35}
          >
            Enviar Mensagem
          </StyledButton>

          <StyledDivider />

          {window.innerWidth > 1024 && (
            <Col span={24}>
              <Row justify='space-around'>
                <SocialContainer>
                  <FeatherIcons icon='github' size={16} />
                  <StyledSocial>GitHub</StyledSocial>
                </SocialContainer>
                <UserInfoSpan>trilp123</UserInfoSpan>
              </Row>
            </Col>
          )}
        </>
      ) : (
        Loading("#000")
      )}
    </Row>
  );
}
