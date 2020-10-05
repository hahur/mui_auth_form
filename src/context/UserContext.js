import React, { useContext, createContext, useReducer } from "react";

export const UserContext = createContext();

export const UserProvider = ({ reducer, initialState, children }) => {
  return (
    <UserContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </UserContext.Provider>
  );
};

export const UseStateValue = () => useContext(UserContext);
