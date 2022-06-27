import React from "react";
import { Link } from "react-router-dom";
import { SocialList } from "./Tabs/sessions/SocialList.component";
import { Row, Breadcrumb, Image, Col, Tooltip } from "../../../antd_components";
import { MontaUrlDominio } from "../../../Helpers/UrlDominio";
import {
  StyledBreadCrumb,
  StyledCol,
  UserInfoTitle,
  UserInfoSpan,
  StyledDivider,
  StyledButton,
  UserInfoBio,
  SocialIcon,
} from "../UserProfile.component.styled";

export default function ProfileSocials({
  darkPallete,
  user,
  isViewProject,
  ownerId,
}) {
  return (
    <>
      {user && (
        <Row justify='center' gutter={[16, 16]}>
          <StyledBreadCrumb span={24}>
            <Breadcrumb color={window.innerWidth < 1024 && darkPallete.white} />
          </StyledBreadCrumb>

          <Image
            style={{ objectFit: "cover" }}
            width={200}
            src={`${MontaUrlDominio()}${user?.imagePath}`}
            height={200}
          />

          <StyledCol span={24}>
            <UserInfoTitle level={4}>{user?.username}</UserInfoTitle>

            {user?.biography && (
              <UserInfoBio color={darkPallete.white}>
                {user.biography}
              </UserInfoBio>
            )}

            <UserInfoSpan color={darkPallete.white}>
              Membro desde {user?.createdAt}
            </UserInfoSpan>
          </StyledCol>

          {Object.keys(user?.socials).length > 0 && (
            <Col span={24}>
              <Row justify='center'>
                {SocialList(user?.socials, isViewProject).map(
                  (item) =>
                    item.link && (
                      <SocialIcon
                        href={item.link}
                        target='_blank'
                        rel='noreferrer'
                      >
                        <Tooltip
                          placement='bottom'
                          title={`Ir para ${item.tooltip}`}
                          color={darkPallete.lightblue}
                        >
                          {item.icon}
                        </Tooltip>
                      </SocialIcon>
                    )
                )}
              </Row>
            </Col>
          )}

          {isViewProject && (
            <Tooltip
              title='Ir para o Perfil do Usuário'
              color={darkPallete.lightblue}
              placement='bottom'
            >
              <Link to={`/profile/${ownerId}`}>
                <StyledButton
                  htmlType='submit'
                  backgroundcolor={darkPallete.lightblue}
                  height='35'
                  width='200'
                  color={darkPallete.white}
                >
                  Ver Perfil
                </StyledButton>
              </Link>
            </Tooltip>
          )}

          {!isViewProject && <StyledDivider />}
        </Row>
      )}
    </>
  );
}
