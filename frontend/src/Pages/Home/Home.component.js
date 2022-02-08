import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import Cookie from "js-cookie";
import * as HomeService from "./services/home.service";
import Header from "../../GlobalComponents/Header/Header.component";
import Background from "../../assets/videoback.mp4";
import BackgroundMobile from "../../assets/backgroundMobile.mp4";
import LandingPageInfofrom from "./components/LandingPageInfo/LandingPageInfo.component";
import { Container } from "./Home.styled";
import HomeArrow from "./components/HomeArrow/HomeArrow.component";
import Rooms from "./components/Rooms/Rooms.component";
import { darkPallete } from "../../styles/pallete";

export default function Home() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const token = Cookie.get("token");

    if (token) {
      HomeService.getCurrentUser(token).then((res) => {
        const { data } = res;
        setUser(data);
      });
    }
  }, [setUser]);

  const [searchValue, setSearchValue] = useState();

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
          pallete={darkPallete}
          intoRooms={handleScrollToRooms}
        />
        <video loop autoPlay muted id='video-container'>
          <source
            src={window.innerWidth > 1024 ? Background : BackgroundMobile}
            type='video/mp4'
          />
        </video>
        <HomeArrow />
      </Container>

      <Rooms pallete={darkPallete} searchValue={searchValue} user={user} />
    </>
  );
}
