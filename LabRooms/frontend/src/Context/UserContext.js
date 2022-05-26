import React, { createContext, useState, useEffect, useCallback } from "react";
import Cookie from "js-cookie";
import * as HomeService from "../Pages/Home/services/home.service";
import * as CreateRoomService from "../Pages/CreateRoom/services/createroom.service";
import * as UserProfileService from "../Pages/UserProfile/services/UserProfile.service";
import { TIPO_CADASTRO } from "../Helpers/TipoCadastro";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [hasntRooms, setHasntRooms] = useState();
  const [allRooms, setAllRooms] = useState();

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

  const [viewUser, setViewUser] = useState();
  const [viewUserLoading, setViewUserLoading] = useState(true);
  const [viewMode, setIsViewMode] = useState(false);

  const [tabRooms, setTabRooms] = useState();
  const [categories, setCategories] = useState();

  const [categorie, setCategorie] = useState();

  const token = Cookie.get("token");

  const getRoomsByOwnerId = useCallback(() => {
    if (user) {
      const { _id } = user;
      if (user?.accountType === TIPO_CADASTRO.EMPRESA && _id && token) {
        UserProfileService.getRoomsByOwnerId(_id, token).then(({ data }) => {
          const { loading, errorMessage, arrayWithIcon } = data;

          if (errorMessage) {
            setHasntRooms({ loading, errorMessage });
          } else {
            setHasntRooms(null);
            setTabRooms({ array: arrayWithIcon, loading });
            setAllRooms(arrayWithIcon);
          }
        });
      }
    }
  }, [token, user]);

  const getCategoryById = useCallback((_id) => {
    setCategorie(null);
    UserProfileService.getCategoryById(_id).then(({ data }) => {
      if (data) setCategorie(data);
    });
  }, []);

  const getRooms = useCallback(() => {
    HomeService.getRooms().then(({ data }) => {
      const { arrayWithIcon, loading } = data;
      setRooms(arrayWithIcon);
      setLoadingRooms(loading);
    });
  }, []);

  const getUserById = useCallback(
    (_id) => {
      setViewUser(null);
      if (user && _id === user?._id) {
        setViewUser(user);
        setIsViewMode(false);
      } else if ((user && _id !== user?._id) || !token) {
        HomeService.getUserById(_id).then(({ data }) => {
          if (data) {
            const { user, loading } = data;
            setViewUserLoading(loading);
            setViewUser(user);
            setIsViewMode(true);
          }
        });
      }
    },
    [token, user]
  );

  useEffect(() => {
    getRoomsByOwnerId();
  }, [getRoomsByOwnerId]);

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
    getRooms();
  }, [getRooms]);

  useEffect(() => {
    CreateRoomService.getCategories().then(({ data }) => {
      setCategories(data);
    });
  }, []);

  useEffect(() => {
    if (!token) {
      HomeService.getUsers(undefined).then(({ data }) => {
        const { arrayWithIcon, loading } = data;
        setUsers(arrayWithIcon);
        setLoadingUsers(loading);
      });
    }
  }, [token]);

  useEffect(() => {
    if (user && token) {
      HomeService.getUsers(user?._id).then(({ data }) => {
        const { arrayWithIcon, loading } = data;
        setUsers(arrayWithIcon);
        setLoadingUsers(loading);
      });

      if (user?.accountType === TIPO_CADASTRO.FREELANCER) {
        HomeService.getRecomendedRooms(user?.categoryId, token).then(
          ({ data }) => {
            const { arrayWithIcon, loading } = data;
            setRecomendedRooms(arrayWithIcon);
            setLoadingRecomendedRooms(loading);
          }
        );
      }

      if (user?.accountType === TIPO_CADASTRO.EMPRESA) {
        HomeService.getRecomendedUsers(user?._id, token).then(({ data }) => {
          const { arrayWithIcon, loading } = data;
          setRecomendedUsers(arrayWithIcon);
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
        getUserById,
        getCategoryById,
        getRoomsByOwnerId,
        getRooms,
        tabRooms,
        viewUserLoading,
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
        allRooms,
        hasntRooms,
        viewMode,
        viewUser,
        categorie,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
