import React from "react";
// import * as HomeService from "./services/home.service";
import Header from "../../GlobalComponents/Header/Header.component";
import Background from "../../assets/videoback.mp4";
import BackgroundMobile from "../../assets/backgroundMobile.mp4";
import LandingPageInfofrom from "./components/LandingPageInfo/LandingPageInfo.component";
import { Container } from "./home.styled";
import HomeArrow from "./components/HomeArrow/HomeArrow.component";
import Rooms from "./components/Rooms/Rooms.component";
import { darkPallete } from "../../styles/pallete";

export default function Home({ Link }) {
  // const { whiteText, greenText, darkBackground } = darkPallete;
  // const [message, setMessage] = useState(false);

  // const DTO = {
  //   nome: "Pedro",
  //   sobrenome: "Marim",
  // };

  // function register() {
  //   HomeService.register(DTO).then((res) => {
  //     const { message } = res.data;
  //     setMessage(message);
  //   });
  // }
  function handleScrollToRooms() {
    document
      .getElementById("rooms")
      .scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <>
      <Header Link={Link} />

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
        <HomeArrow intoRooms={handleScrollToRooms} />
      </Container>

      <Rooms pallete={darkPallete} />
    </>
  );
}
