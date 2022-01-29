import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentID, setCurrentID] = useState();

  return (
    <UserContext.Provider
      value={{
        currentID,
        setCurrentID,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
