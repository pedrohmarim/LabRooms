import React from "react";
import { FeatherIcons, Row, Tooltip } from "../../../antd_components";
import TagRender from "../../../GlobalComponents/TagRender/TagRender.component";
import { LoadingOutlined } from "@ant-design/icons";
import { Loading } from "../../../GlobalComponents/Loading/Loading.component";
import { StyledRowTags } from "../../Home/components/Rooms/styles";
import { StyledButton } from "../../UserProfile/UserProfile.component.styled";
import { TIPO_CADASTRO } from "../../../Helpers/TipoCadastro";
import {
  HeaderStyled,
  ProjectTitle,
  ProjectDescription,
  HourPriceContainer,
  Price,
  Layout,
  RoomCategory,
  CategoryText,
} from "../ViewProject.component.styled";

export default function ViewProject({
  token,
  setVisible,
  loggedAccountType,
  loadingApply,
  setCaptchaVisible,
  currentRoom,
  darkPallete,
  roomCategoryData,
  disabledApplyBtn,
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
                  <ProjectTitle color={darkPallete.white} margin='0 8px 0 0'>
                    {currentRoom?.title} •
                  </ProjectTitle>

                  <RoomCategory color={darkPallete.white}>
                    <FeatherIcons icon={roomCategoryData?.Icon} size={15} />
                    <CategoryText>{roomCategoryData?.Title}</CategoryText>
                  </RoomCategory>
                </Row>

                {((token && loggedAccountType === TIPO_CADASTRO.FREELANCER) ||
                  !token) && (
                  <Tooltip
                    title={
                      disabledApplyBtn
                        ? "Você já Enviou uma Candidatura para Esta Vaga."
                        : "Enviar Candidatura"
                    }
                    color={darkPallete.lightblue}
                  >
                    <StyledButton
                      icon={loadingApply && <LoadingOutlined />}
                      onClick={() =>
                        token ? setCaptchaVisible(true) : setVisible(true)
                      }
                      htmlType='submit'
                      backgroundcolor={!disabledApplyBtn && darkPallete.green}
                      height='35'
                      width='200'
                      color={darkPallete.white}
                      disabled={disabledApplyBtn}
                    >
                      {disabledApplyBtn
                        ? "Candidatura Enviada"
                        : "Me Candidatar"}
                    </StyledButton>
                  </Tooltip>
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
                  <HourPriceContainer>
                    Preço/Hora: <Price>{`R$ ${currentRoom?.hourprice}`}</Price>{" "}
                  </HourPriceContainer>
                </StyledRowTags>
              )}
            </HeaderStyled>

            <ProjectDescription
              margintop={
                currentRoom?.ownerName && !currentRoom?.newCategory
                  ? "-15px"
                  : "0"
              }
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
