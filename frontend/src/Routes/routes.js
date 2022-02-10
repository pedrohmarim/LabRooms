import React, { lazy } from "react";
import { HomeOutlined } from "@ant-design/icons";

const HomeComponent = lazy(() => import("../Pages/Home/Home.component"));
const CreateRoomComponent = lazy(() =>
  import("../Pages/CreateRoom/CreateRoom.component")
);
const SignupComponent = lazy(() => import("../Pages/Signup/Signup.component"));
const SigninComponent = lazy(() => import("../Pages/Signin/Signin.component"));
const ChatRoom = lazy(() => import("../Pages/ChatRoom/ChatRoom.component"));
const NotFoundComponent = lazy(() =>
  import("../Pages/NotFound/notfound.component")
);

const routes = [
  { path: "/", name: <HomeOutlined />, Component: <HomeComponent /> },
  {
    path: "/createroom",
    name: "Criar Sala",
    Component: <CreateRoomComponent />,
  },
  { path: "/signup", name: "Registro", Component: <SignupComponent /> },
  { path: "/chatroom/:_id", name: "Chat", Component: <ChatRoom /> },
  { path: "/signin", name: "Entrar", Component: <SigninComponent /> },
  {
    path: "*",
    name: "Página não Encontrada",
    Component: <NotFoundComponent />,
  },
];

export default routes;
