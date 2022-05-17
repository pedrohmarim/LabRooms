import React from "react";
import SwiperCore, {
  EffectCoverflow,
  Pagination,
  Autoplay,
  Navigation,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { FeatherIcons, Col } from "../../antd_components";
import TagRender from "../TagRender/TagRender.component";
import { darkPallete } from "../../styles/pallete";
import { Link } from "react-router-dom";
import {
  RoomItem,
  RoomTitle,
  ButtonText,
  RoomOwner,
  RoomImage,
  RoomOwnerImg,
  StyledRowTags,
  CategorieProject,
} from "../../Pages/Home/components/Rooms/styles";
import { MontaUrlDominio } from "../../Helpers/UrlDominio";

SwiperCore.use([EffectCoverflow, Pagination, Autoplay, Navigation]);

const SwiperComp = ({ arrayToRender }) => {
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
      delay: 2500,
      disableOnInteraction: false,
    },
    centeredSlides: true,
    navigation: true,
    freeMode: true,
    pagination: {
      clickable: true,
    },
  };

  return (
    <Swiper slidesPerView='auto' freeMode grabCursor {...SwiperOpt}>
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
          }) => (
            <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={3} key={_id}>
              <SwiperSlide>
                <Link
                  to={accountType ? `profile/${_id}` : `view/project/${_id}`}
                >
                  <RoomItem
                    background={darkPallete.lightblueOpacity}
                    width={ownerName ? "220px" : "min-content"}
                  >
                    <RoomTitle color={darkPallete.white}>
                      {title || username}
                    </RoomTitle>

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
                      margin={!ownerName ? "0 0 15px 0" : "0 0 15px 30px"}
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
