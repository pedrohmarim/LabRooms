import React, { useState } from "react";
import * as HomeService from "./services/home.service";
import { Button } from "../../antd_components";

export default function Home() {
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
    <>
      <Button onClick={register}>To testando</Button>
      {message && <h1>{message}</h1>}
    </>
  );
}
