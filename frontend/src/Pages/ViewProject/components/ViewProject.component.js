import React from "react";
import { FeatherIcons, Row } from "../../../antd_components";
import TagRender from "../../../GlobalComponents/TagRender/TagRender.component";
import { LoadingOutlined } from "@ant-design/icons";
import {
  Layout,
  RoomCategory,
  CategoryText,
} from "../../ChatRoom/components/styles";
import {
  HeaderStyled,
  ProjectTitle,
  ProjectDescription,
} from "../ViewProject.component.styled";
import { Loading } from "../../../GlobalComponents/Loading/Loading.component";
import { StyledRowTags } from "../../Home/components/Rooms/styles";
import { StyledButton } from "../../UserProfile/UserProfile.component.styled";
import { TIPO_CADASTRO } from "../../../Helpers/TipoCadastro";

export default function ViewProject({
  loggedAccountType,
  loadingApply,
  handleApply,
  currentRoom,
  darkPallete,
  roomCategoryData,
}) {
  const { Content } = Layout;

  return (
    <Layout>
      <Content>
        {currentRoom && roomCategoryData ? (
          <>
            <HeaderStyled>
              <Row align='middle' justify='space-between'>
                <Row>
                  <ProjectTitle color={darkPallete.white}>
                    {currentRoom?.title}
                  </ProjectTitle>

                  <ProjectTitle margin='0 8px' color={darkPallete.white}>
                    •
                  </ProjectTitle>

                  <RoomCategory color={darkPallete.white}>
                    <FeatherIcons icon={roomCategoryData?.Icon} size={15} />
                    <CategoryText>{roomCategoryData?.Title}</CategoryText>
                  </RoomCategory>
                </Row>

                {loggedAccountType === TIPO_CADASTRO.FREELANCER && (
                  <StyledButton
                    icon={loadingApply && <LoadingOutlined />}
                    onClick={handleApply}
                    htmlType='submit'
                    backgroundcolor={darkPallete.green}
                    height='35'
                    width='200'
                    color={darkPallete.white}
                  >
                    Me Candidatar
                  </StyledButton>
                )}
              </Row>

              {currentRoom?.ownerName && !currentRoom?.newCategory && (
                <StyledRowTags
                  align='middle'
                  margin='-15px 0 -8px 0'
                  scrollHeight='3px'
                >
                  {currentRoom?.subCategories &&
                    currentRoom?.subCategories.map((data) => (
                      <TagRender label={data} margin='10px 5px' />
                    ))}
                </StyledRowTags>
              )}
            </HeaderStyled>

            <ProjectDescription
              color={darkPallete.white}
              dangerouslySetInnerHTML={{ __html: currentRoom?.description }}
            />
          </>
        ) : (
          Loading(darkPallete.white, "15px 0 0 0")
        )}
      </Content>
    </Layout>
  );
}
