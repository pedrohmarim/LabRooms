import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import TagRender from "../TagRender/TagRender.component";
import { darkPallete } from "../../styles/pallete";
import { Link } from "react-router-dom";
import NotFound from "../../assets/image_notfound.png";
import { MontaUrlDominio } from "../../Helpers/UrlDominio";
import SwiperCore, {
  EffectCoverflow,
  Pagination,
  Autoplay,
  Navigation,
} from "swiper";
import {
  FeatherIcons,
  Col,
  Progress,
  Row,
  Popover,
  Tabs,
  Tooltip,
} from "../../antd_components";
import {
  RoomItem,
  RoomTitle,
  ButtonText,
  RoomOwner,
  RoomImage,
  RoomOwnerImg,
  StyledRowTags,
  CategorieProject,
  ProgressIcon,
  ScoreList,
  RoomTitleRecommendation,
  StaticticSubtitle,
} from "../../Pages/Home/components/Rooms/styles";

SwiperCore.use([EffectCoverflow, Pagination, Autoplay, Navigation]);

const SwiperComp = ({ arrayToRender }) => {
  const [disabledItemClick, setDisabledItemClick] = useState(false);
  const { TabPane } = Tabs;

  const ItemScoreProgress = (
    totalSubMatches,
    priceScore,
    roomPrice,
    userPrice,
    hourprice,
    itemScore,
    roomTitle,
    roomId
  ) => (
    <Row>
      {roomId && (
        <Col span={24}>
          <Tooltip
            title='Visualizar Projeto'
            color={darkPallete.lightblue}
            placement='right'
          >
            <Link to={`view/project/${roomId}`}>
              <CategorieProject
                color={darkPallete.white}
                align='middle'
                justify='center'
              >
                <RoomTitleRecommendation hovercolor={darkPallete.lightblue}>
                  {roomTitle}
                </RoomTitleRecommendation>
              </CategorieProject>
            </Link>
          </Tooltip>
        </Col>
      )}

      <Col span={24}>
        <StaticticSubtitle color={darkPallete.white}>
          Porcentagem de Recomendação:
        </StaticticSubtitle>
      </Col>

      <Progress
        status='active'
        percent={itemScore}
        strokeColor='#24E500'
        style={{ width: "95%" }}
      />

      <StaticticSubtitle color={darkPallete.white} margintop='5px'>
        Avaliações:
      </StaticticSubtitle>

      <Col span={24}>
        <Row align='middle'>
          <FeatherIcons size={18} icon='tag' className='default-icon' />
          <ScoreList color={darkPallete.white}>{totalSubMatches}</ScoreList>
        </Row>
      </Col>

      <Col span={24}>
        <Row align='middle'>
          <FeatherIcons
            size={18}
            className='default-icon'
            icon={userPrice ? "user" : "home"}
          />

          <ScoreList color={darkPallete.white}>
            R$ {roomPrice || userPrice}
          </ScoreList>

          <FeatherIcons
            size={18}
            className='iconMarginLeft'
            icon='chevron-right'
          />

          <FeatherIcons
            size={18}
            className='default-icon'
            icon={userPrice ? "home" : "user"}
          />

          <ScoreList color={darkPallete.white}>R$ {hourprice}</ScoreList>

          <ScoreList color={darkPallete.white} className='iconMarginLeft'>
            ({priceScore}%)
          </ScoreList>
        </Row>
      </Col>
    </Row>
  );

  const SwiperOpt = arrayToRender?.length > 5 && {
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      modifier: 1,
      slideShadows: false,
    },
    mousewheel: { releaseOnEdges: true },
    hashNavigation: { watchState: true },
    loopedSlides: arrayToRender?.length,
    grabCursor: true,
    loop: true,
    effect: "slide",
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    centeredSlides: true,
    navigation: true,
    freeMode: true,
    pagination: {
      clickable: true,
    },
  };

  function handleCreateLink(accountType, _id) {
    if (disabledItemClick) return "";

    if (accountType) return `profile/${_id}`;
    return `view/project/${_id}`;
  }

  return (
    <Swiper slidesPerView='auto' freeMode grabCursor autoplay {...SwiperOpt}>
      {arrayToRender &&
        arrayToRender.map(
          ({
            title,
            _id,
            ownerName,
            username,
            biography,
            accountType,
            subCategories,
            newCategory,
            CategorieTitle,
            Icon,
            imagePath,
            itemScore,
            scoreTabs,
            hourprice,
            totalSubMatches,
            priceScore,
            roomPrice = false,
            userPrice = false,
          }) => (
            <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={3} key={_id}>
              <SwiperSlide>
                <Link to={handleCreateLink(accountType, _id)}>
                  <RoomItem
                    background={darkPallete.lightblueOpacity}
                    width={ownerName ? "220px" : "min-content"}
                  >
                    <RoomTitle
                      color={darkPallete.white}
                      margin={
                        scoreTabs?.length || itemScore
                          ? "0 20px 0 0px"
                          : "0 0px 0 0px"
                      }
                    >
                      {title || username}
                    </RoomTitle>

                    <ProgressIcon>
                      {(scoreTabs?.length || itemScore) && (
                        <Popover
                          onVisibleChange={(visible) =>
                            setDisabledItemClick(visible)
                          }
                          overlayInnerStyle={{
                            backgroundColor: darkPallete.backgroundBlue,
                          }}
                          content={
                            scoreTabs?.length ? (
                              <Tabs
                                tabBarStyle={
                                  scoreTabs?.length > 1
                                    ? {
                                        color: darkPallete.white,
                                        marginBottom: "6px",
                                      }
                                    : {
                                        display: "none",
                                      }
                                }
                              >
                                {scoreTabs.map(
                                  (
                                    {
                                      itemScore,
                                      totalSubMatches,
                                      priceScore,
                                      roomPrice,
                                      roomTitle,
                                      roomId,
                                    },
                                    index
                                  ) => (
                                    <TabPane
                                      tab={scoreTabs?.length > 1 && index + 1}
                                      key={index}
                                    >
                                      {ItemScoreProgress(
                                        totalSubMatches,
                                        priceScore,
                                        roomPrice,
                                        userPrice,
                                        hourprice,
                                        itemScore,
                                        roomTitle,
                                        roomId
                                      )}
                                    </TabPane>
                                  )
                                )}
                              </Tabs>
                            ) : (
                              <>
                                {ItemScoreProgress(
                                  totalSubMatches,
                                  priceScore,
                                  roomPrice,
                                  userPrice,
                                  hourprice,
                                  itemScore
                                )}
                              </>
                            )
                          }
                        >
                          <FeatherIcons icon='bar-chart' />
                        </Popover>
                      )}
                    </ProgressIcon>

                    {accountType && (
                      <CategorieProject
                        color={darkPallete.white}
                        align='middle'
                      >
                        <FeatherIcons icon={Icon} size={18} />
                        <ButtonText>{CategorieTitle}</ButtonText>
                      </CategorieProject>
                    )}

                    <RoomOwner
                      color={darkPallete.white}
                      margin={!ownerName ? "0 0 8px 0" : "0 0 8px 30px"}
                    >
                      {ownerName || biography || "Biografia não informada"}
                    </RoomOwner>

                    {ownerName && (
                      <RoomOwnerImg
                        alt='Image'
                        gap={2}
                        src={`${MontaUrlDominio()}${imagePath}`}
                        preview={false}
                      />
                    )}

                    {!ownerName && (
                      <RoomImage
                        fallback={NotFound}
                        src={`${MontaUrlDominio()}${imagePath}`}
                        preview={false}
                      />
                    )}

                    {!accountType && (
                      <CategorieProject
                        color={darkPallete.white}
                        align='middle'
                      >
                        <FeatherIcons icon={Icon} size={18} />
                        <ButtonText>{CategorieTitle}</ButtonText>
                      </CategorieProject>
                    )}

                    {ownerName && !newCategory ? (
                      <StyledRowTags align='middle'>
                        {subCategories &&
                          subCategories.map((data) => (
                            <TagRender label={data} margin='10px 5px' />
                          ))}
                      </StyledRowTags>
                    ) : (
                      ownerName &&
                      newCategory && (
                        <StyledRowTags align='middle'>
                          <TagRender label={newCategory} margin='10px 5px' />
                        </StyledRowTags>
                      )
                    )}
                  </RoomItem>
                </Link>
              </SwiperSlide>
            </Col>
          )
        )}
    </Swiper>
  );
};

export default SwiperComp;
