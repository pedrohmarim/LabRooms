import React, { useEffect } from "react";
import * as S from "./Notfound.styled";
import NotFoundAnimation from "../../assets/notfound_animation.json";
import lottieWeb from "lottie-web";
import { darkPallete } from "../../styles/pallete";
import Header from "../../GlobalComponents/Header/Header.component";

export default function NotFound() {
  const { white } = darkPallete;

  document.getElementsByTagName("title")[0].innerText =
    "LabRooms | Página não encontrada";

  useEffect(() => {
    lottieWeb.loadAnimation({
      container: document.getElementById("lottieContainer"),
      animationData: NotFoundAnimation,
    });
  }, []);

  return (
    <>
      <Header fromNotFound />
      <S.NotFoundContainer
        color={white}
        backgroundcolor='#000'
        id='lottieContainer'
      >
        <S.SpanNotFound>Página não encontrada.</S.SpanNotFound>
      </S.NotFoundContainer>
    </>
  );
}
