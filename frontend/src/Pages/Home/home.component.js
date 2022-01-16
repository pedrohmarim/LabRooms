import React, { useState } from "react";
import * as HomeService from "./services/home.service";
import { Button } from "../../antd_components";
import { darkPallete } from "../../styles/pallete";
import Header from "../../GlobalComponents/Header/Header.component";

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

  return (
    <>
      <Header Link={Link} />
    </>
  );
}
