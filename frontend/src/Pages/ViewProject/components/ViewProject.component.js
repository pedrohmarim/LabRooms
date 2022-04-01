import React from "react";
import { FeatherIcons, Row } from "../../../antd_components";
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
                  {currentRoom?.title} •
                </ProjectTitle>

                <RoomCategory color={darkPallete.white}>
                  <FeatherIcons icon={roomCategoryData?.Icon} size={15} />
                  <CategoryText>{roomCategoryData?.Title}</CategoryText>
                </RoomCategory>
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
