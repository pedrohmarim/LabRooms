import React from "react";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
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

SwiperCore.use([EffectCoverflow, Pagination]);

const SwiperComp = ({ arrayToRender }) => {
  return (
    <Swiper
      effect={"slide"}
      grabCursor
      freeMode
      centeredSlides
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        modifier: 1,
        slideShadows: false,
      }}
      pagination={false}
      className='mySwiper'
    >
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
                  <RoomItem background={darkPallete.lightblueOpacity}>
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
                        src={`${
                          window.location.href.split(":3000")[0]
                        }:4000/${imagePath}`}
                        preview={false}
                      />
                    )}

                    {!ownerName && (
                      <RoomImage
                        height={210}
                        src={`${
                          window.location.href.split(":3000")[0]
                        }:4000/${imagePath}`}
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
