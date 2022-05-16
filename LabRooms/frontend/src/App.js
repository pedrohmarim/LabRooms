import React from "react";
import Routes from "./Routes";
import "antd/dist/antd.css";

const App = () => {
  console.log("URL API1", `${window.location.href.split(":3000")[0]}:4000`);
  console.log("URL API2", `${window.location.href}/imagem123`);
  return <Routes />;
};

export default App;
