
import React, { lazy } from "react";
import * as Icons from "@ant-design/icons";

const HomeComponent = lazy(() => import("../Pages/Home/Home.component"));
const SignupComponent = lazy(() => import("../Pages/Signup/Signup.component"));
const NotFoundComponent = lazy(() =>
  import("../Pages/NotFound/notfound.component")
);

const routes =[
    { path: "/", name: <Icons.HomeOutlined />, Component: <HomeComponent /> },
    { path: "/signup", name: "Registro", Component: <SignupComponent /> },
    {
      path: "*",
      name: "Página não Encontrada",
      Component: <NotFoundComponent />
    }
  ];

export default routes