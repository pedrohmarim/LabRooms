import React, { createContext, useState, useEffect } from "react";
import Cookie from "js-cookie";
import * as HomeService from "../Pages/Home/services/home.service";
import * as CreateRoomService from "../Pages/CreateRoom/services/createroom.service";
import { TIPO_CADASTRO } from "../Helpers/TipoCadastro";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const [rooms, setRooms] = useState();
  const [loadingRooms, setLoadingRooms] = useState(true);

  const [recomendedRooms, setRecomendedRooms] = useState();
  const [loadingRecomendedRooms, setLoadingRecomendedRooms] = useState(true);

  const [recomendedUsers, setRecomendedUsers] = useState();
  const [loadingRecomendedUsers, setLoadingRecomendedUsers] = useState(true);

  const [tabRooms, setTabRooms] = useState();
  const [categories, setCategories] = useState();
  const token = Cookie.get("token");

  useEffect(() => {
    if (token) {
      HomeService.getCurrentUser(token).then(({ data }) => {
        setUser(data);
        setLoading(false);
      });
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    HomeService.getRooms().then(({ data }) => {
      const { rooms, loading } = data;
      setRooms(rooms);
      setLoadingRooms(loading);
    });
  }, []);

  useEffect(() => {
    CreateRoomService.getCategories().then(({ data }) => {
      setCategories(data);
    });
  }, []);

  useEffect(() => {
    if (user && token) {
      if (user?.accountType === TIPO_CADASTRO.FREELANCER) {
        HomeService.getRecomendedRooms(
          user?.newCategory,
          user?.categoryId,
          user?.subCategories,
          token
        ).then(({ data }) => {
          const { recomendedRooms, loading } = data;
          setRecomendedRooms(recomendedRooms);
          setLoadingRecomendedRooms(loading);
        });
      }

      if (user?.accountType === TIPO_CADASTRO.EMPRESA) {
        HomeService.getRecomendedUsers(user?._id, token).then(({ data }) => {
          const { recomendedUsers, loading } = data;
          setRecomendedUsers(recomendedUsers);
          setLoadingRecomendedUsers(loading);
        });
      }
    }
  }, [user, token]);

  return (
    <UserContext.Provider
      value={{
        setUser,
        setLoadingRooms,
        setRooms,
        setTabRooms,
        tabRooms,
        user,
        loading,
        rooms,
        recomendedRooms,
        loadingRooms,
        loadingRecomendedRooms,
        categories,
        recomendedUsers,
        loadingRecomendedUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
