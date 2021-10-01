import React, { useState } from "react";
import api from "./services/backAPI";

export default function App() {
  const [message, setMessage] = useState(false);

  function register() {
    api
      .post("/test", {
        headers: {
          DTO: {
            nome: "Pedro",
            sobrenome: "Marim",
          },
        },
      })
      .then((res) => {
        const { message } = res.data;
        setMessage(message);
      });
  }

  return (
    <>
      <button onClick={register}>Cadastrar</button>
      {message && <h1>{message}</h1>}
    </>
  );
}
