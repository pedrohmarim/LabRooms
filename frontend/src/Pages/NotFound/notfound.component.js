import React, { useEffect } from "react";
import * as S from "./notfound.styled";
import NotFoundAnimation from "../../assets/notfound_animation.json";
import lottieWeb from "lottie-web";
import { darkPallete } from "../../styles/pallete";

export default function NotFound() {
  const { lightblue, white } = darkPallete;

  useEffect(() => {
    lottieWeb.loadAnimation({
      container: document.getElementById("lottieContainer"),
      animationData: NotFoundAnimation,
    });
  }, []);

  return (
    <S.NotFoundContainer
      color={white}
      backgroundcolor={lightblue}
      id='lottieContainer'
    >
      <S.SpanNotFound>Página não encontrada.</S.SpanNotFound>
    </S.NotFoundContainer>
  );
}
