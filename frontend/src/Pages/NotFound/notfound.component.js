import React, { useEffect } from "react";
import * as S from "./notfound.styled";
import NotFoundAnimation from "../../assets/notfound_animation.json";
import lottieWeb from "lottie-web";
import { darkPallete } from "../../styles/pallete";

export default function NotFound() {
  const { darkBackground, greenText } = darkPallete;

  useEffect(() => {
    lottieWeb.loadAnimation({
      container: document.getElementById("lottieContainer"),
      animationData: NotFoundAnimation,
    });
  }, []);

  return (
    <S.NotFoundContainer
      color={greenText}
      backgroundcolor={darkBackground}
      id='lottieContainer'
    >
      <S.SpanNotFound>Página não encontrada.</S.SpanNotFound>
    </S.NotFoundContainer>
  );
}
