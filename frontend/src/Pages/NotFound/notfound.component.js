import React, { useEffect } from "react";
import * as S from "./notfound.styled";
import NotFoundAnimation from "../../assets/notfound_animation.json";
import lottieWeb from "lottie-web";
import { darkPallete } from "../../styles/pallete";
import Header from "../../GlobalComponents/Header/Header.component";

export default function NotFound({ Link }) {
  const { white } = darkPallete;

  useEffect(() => {
    lottieWeb.loadAnimation({
      container: document.getElementById("lottieContainer"),
      animationData: NotFoundAnimation,
    });
  }, []);

  return (
    <>
      <Header Link={Link} />
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
