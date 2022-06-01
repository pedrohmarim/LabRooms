import React, { createContext, useState, useEffect, useCallback } from "react";
import Cookie from "js-cookie";
import { Notification } from "../antd_components/";
import * as HomeService from "../Pages/Home/services/home.service";
import * as CreateRoomService from "../Pages/CreateRoom/services/CreateRoom.service";
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
  const [allUsers, setAllUsers] = useState();
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

  const [currentRoom, setCurrentRoom] = useState();
  const [loadPage, setLoadPage] = useState(false);

  const [disabledApplyBtn, setDisabledApplyBtn] = useState();

  const token = Cookie.get("token");

  function handleExpiredSession(message) {
    Cookie.remove("token");

    Notification.open({
      type: "error",
      message,
    });
  }

  const handleVerifyApply = useCallback((userId, ownerRoomId, roomId) => {
    if (userId !== ownerRoomId) {
      HomeService.handleVerifyApply(userId, roomId).then(({ data }) => {
        const { applied } = data;
        setDisabledApplyBtn(applied);
      });
    }
  }, []);

  const getRoomById = useCallback(
    (roomId) => {
      HomeService.getRoomById(roomId)
        .then(({ data }) => {
          const { visible, owner } = data;

          if (
            (!visible && token && user?._id !== owner) ||
            (!visible && !token)
          )
            setCurrentRoom(null);

          setCurrentRoom(data);
          setLoadPage(true);
        })
        .catch(() => setCurrentRoom(null));
    },
    [token, user]
  );

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
        setViewUserLoading(false);
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
      HomeService.getCurrentUser(token)
        .then(({ data }) => {
          setUser(data);
          setLoading(false);
        })
        .catch(({ response }) => {
          const { status, data } = response;
          if (status === 403) handleExpiredSession(data?.message);
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

        setAllUsers(arrayWithIcon);
        setUsers(arrayWithIcon);
        setLoadingUsers(loading);
      });
    }
  }, [token]);

  useEffect(() => {
    if (user && token) {
      HomeService.getUsers(user?._id).then(({ data }) => {
        const { arrayWithIcon, loading } = data;

        setAllUsers(arrayWithIcon);
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
        setLoadPage,
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
        setDisabledApplyBtn,
        getUserById,
        getCategoryById,
        getRoomsByOwnerId,
        getRooms,
        getRoomById,
        handleVerifyApply,
        tabRooms,
        allUsers,
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
        loadPage,
        currentRoom,
        disabledApplyBtn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
