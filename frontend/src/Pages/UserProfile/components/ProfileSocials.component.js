import React from "react";
import UserImage from "../../../assets/userImage.jpg";
import { Link } from "react-router-dom";
import { SocialList } from "./Tabs/sessions/SocialList.component";
import { Loading } from "../../../GlobalComponents/Loading/Loading.component";
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
import { Row, Breadcrumb, Image, Col, Tooltip } from "../../../antd_components";

export default function ProfileSocials({
  darkPallete,
  user,
  isViewProject,
  ownerId,
}) {
  return (
    <>
      {user ? (
        <Row justify='center' gutter={[16, 16]}>
          <StyledBreadCrumb span={24}>
            <Breadcrumb />
          </StyledBreadCrumb>

          <Image src={UserImage} height={120} />

          <StyledCol span={24}>
            <UserInfoTitle level={4} isViewProject={isViewProject}>
              {user?.username}
            </UserInfoTitle>

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
      ) : (
        Loading("#000")
      )}
    </>
  );
}
