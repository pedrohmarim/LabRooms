import React from "react";

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
import UserImage from "../../../assets/userImage.jpg";
import { SocialList } from "./Tabs/sessions/SocialList.component";
import { Loading } from "../../../GlobalComponents/Loading/Loading.component";
import { Row, Breadcrumb, Image, Col, Tooltip } from "../../../antd_components";

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
              <UserInfoBio color={darkPallete.white}>
                {user.biography}
              </UserInfoBio>
            )}
            <UserInfoSpan color={darkPallete.white}>
              Membro desde {user?.createdAt}
            </UserInfoSpan>
          </StyledCol>

          <Col span={24}>
            <Row justify='center'>
              {SocialList &&
                SocialList(user?.socials).map(
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

          <Tooltip
            title='Ir para o Perfil do Usuário'
            color={darkPallete.lightblue}
            placement='bottom'
          >
            <StyledButton
              htmlType='submit'
              backgroundcolor={darkPallete.lightblue}
              height='35'
              width='200'
              color={darkPallete.white}
            >
              Ver Perfil
            </StyledButton>
          </Tooltip>

          <StyledDivider />
        </>
      ) : (
        Loading("#000")
      )}
    </Row>
  );
}
