import React, { useState } from "react";
import * as HomeService from "./services/home.service";
import { Button } from "../../antd_components";
import { darkPallete } from "../../styles/pallete";

export default function Home() {
  const { whiteText, greenText, darkBackground } = darkPallete;
  const [message, setMessage] = useState(false);

  const DTO = {
    nome: "Pedro",
    sobrenome: "Marim",
  };

  function register() {
    HomeService.register(DTO).then((res) => {
      const { message } = res.data;
      setMessage(message);
    });
  }

  return (
    <div style={{ backgroundColor: darkBackground }}>
      <h1 style={{ color: greenText }}>What is Lorem Ipsum?</h1>
      <p style={{ color: whiteText }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
      <Button
        onClick={register}
        backgroundColor={greenText}
        hoverColor={darkBackground}
        height='45px'
        width='150px'
      >
        Cadastrar
      </Button>
      {message && <h1>{message}</h1>}
    </div>
  );
}
