import React, { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Header from "../../GlobalComponents/Header/Header.component";
import Background from "../../assets/videoback.mp4";
import BackgroundMobile from "../../assets/backgroundMobile.mp4";
import LandingPageInfofrom from "./components/LandingPageInfo/LandingPageInfo.component";
import { Container } from "./Home.styled";
import HomeArrow from "./components/HomeArrow/HomeArrow.component";
import Rooms from "./components/Rooms/Rooms.component";
import { darkPallete } from "../../styles/pallete";

export default function Home() {
  const {
    user,
    loading,
    rooms,
    recomendedRooms,
    loadingRooms,
    loadingRecomendedRooms,
    categories,
    recomendedUsers,
    loadingRecomendedUsers,
    users,
    loadingUsers,
    screenSize,
  } = useContext(UserContext);

  const [searchValue, setSearchValue] = useState();

  document.getElementsByTagName("title")[0].innerText = "LabRooms | Home";

  function handleScrollToRooms(searchValue) {
    if (searchValue) {
      setSearchValue(searchValue);
      document
        .getElementById("rooms")
        .scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  return (
    <>
      <Header />

      <Container>
        <LandingPageInfofrom
          screenSize={screenSize?.dynamicWidth}
          pallete={darkPallete}
          intoRooms={handleScrollToRooms}
        />
        <video loop autoPlay muted id='video-container'>
          <source
            src={
              screenSize?.dynamicWidth > 1024 ? Background : BackgroundMobile
            }
            type='video/mp4'
          />
        </video>
        <HomeArrow />
      </Container>

      <Rooms
        pallete={darkPallete}
        searchValue={searchValue}
        userContext={{
          user,
          loading,
          rooms,
          recomendedRooms,
          loadingRooms,
          loadingRecomendedRooms,
          categories,
          recomendedUsers,
          loadingRecomendedUsers,
          users,
          loadingUsers,
        }}
      />
    </>
  );
}
