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

  const [users, setUsers] = useState();
  const [loadingUsers, setLoadingUsers] = useState(true);

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

    CreateRoomService.getCategories().then(({ data }) => {
      setCategories(data);
    });
  }, []);

  useEffect(() => {
    if (!token) {
      HomeService.getUsers(undefined).then(({ data }) => {
        const { users, loading } = data;
        setUsers(users);
        setLoadingUsers(loading);
      });
    }
  }, [token]);

  useEffect(() => {
    if (user && token) {
      HomeService.getUsers(user?._id).then(({ data }) => {
        const { users, loading } = data;
        setUsers(users);
        setLoadingUsers(loading);
      });

      if (user?.accountType === TIPO_CADASTRO.FREELANCER) {
        HomeService.getRecomendedRooms(user?.categoryId, token).then(
          ({ data }) => {
            const { recomendedRooms, loading } = data;
            setRecomendedRooms(recomendedRooms);
            setLoadingRecomendedRooms(loading);
          }
        );
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
        setLoadingRecomendedRooms,
        setLoadingRecomendedUsers,
        setRecomendedUsers,
        setRecomendedRooms,
        setLoadingUsers,
        setUsers,
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
        users,
        loadingUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
