import React from "react";
import { FeatherIcons, Row } from "../../../antd_components";
import TagRender from "../../../GlobalComponents/TagRender/TagRender.component";
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

export default function ViewProject({
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
              <Row align='middle'>
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

                {currentRoom?.ownerName && !currentRoom?.newCategory && (
                  <>
                    <ProjectTitle margin='0 8px' color={darkPallete.white}>
                      •
                    </ProjectTitle>
                    {currentRoom?.subCategories &&
                      currentRoom?.subCategories.map((data) => (
                        <TagRender label={data} margin='10px 5px' />
                      ))}
                  </>
                )}
              </Row>
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
