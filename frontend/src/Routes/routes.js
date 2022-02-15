import React, { lazy } from "react";
import { HomeOutlined } from "@ant-design/icons";

const CreateRoomComponent = lazy(() =>
  import("../Pages/CreateRoom/CreateRoom.component")
);
const NotFoundComponent = lazy(() =>
  import("../Pages/NotFound/Notfound.component")
);
const HomeComponent = lazy(() => import("../Pages/Home/Home.component"));
const SignupComponent = lazy(() => import("../Pages/Signup/Signup.component"));
const SigninComponent = lazy(() => import("../Pages/Signin/Signin.component"));
const ChatRoom = lazy(() => import("../Pages/ChatRoom/ChatRoom.component"));
const UserProfile = lazy(() =>
  import("../Pages/UserProfile/UserProfile.component")
);

const routes = [
  { path: "/", name: <HomeOutlined />, Component: <HomeComponent /> },
  {
    path: "*",
    name: "Página não Encontrada",
    Component: <NotFoundComponent />,
  },
  { path: "/signup", name: "Registro", Component: <SignupComponent /> },
  { path: "/signin", name: "Entrar", Component: <SigninComponent /> },
  {
    breadcrumb: "/chatroom",
    path: "/chatroom/:_id",
    name: "Chat",
    Component: <ChatRoom />,
  },
  {
    path: "/createroom",
    name: "Criar Sala",
    Component: <CreateRoomComponent />,
  },
  {
    breadcrumb: "/profile",
    path: "/profile/:username",
    name: "Perfil",
    Component: <UserProfile />,
  },
];

export default routes;
