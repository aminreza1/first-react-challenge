import React, { createContext, useEffect, useReducer, useState } from "react";
import LocalStorageService from "../../services/local-storage-service";
import AuthReducer from "./auth-reducer";

export type AuthDataType = {
  token: string;
  isAuth: boolean;
  user: {
    id: number;
    name: string;
  };
};

export const AuthContext = createContext({
  authData: {} as AuthDataType,
  login: (token: string, userID: number, userName: string) => {},
  logout: () => {},
});

const AuthContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // const [authState, setAuthState] = useState({} as AuthDataType);

  const [authState, authDispatch] = useReducer(AuthReducer, {} as AuthDataType);

  useEffect(() => {
    authDispatch({ type: "INIT" });
    
    // const token = store.Get("token");
    // const userID = store.GetNumber("userID");
    // const userName = store.Get("userName");

    // setAuthState({
    //   isAuth: token && token.length > 0 ? true : false,
    //   token: token,
    //   user: {
    //     id: userID,
    //     name: userName,
    //   },
    // });
  }, []);

  const myLogin = (token: string, userID: number, userName: string) => {
    authDispatch({
      type: "LOGIN",
      payload: {
        token: token,
        userID: userID + "",
        userName: userName,
      },
    });
    // store.Add([
    //   { key: "token", value: "123" },
    //   { key: "userID", value: "1" },
    //   { key: "userName", value: "امین رضا" },
    // ]);

    // setAuthState({
    //   isAuth: true,
    //   token: "123",
    //   user: {
    //     id: 1,
    //     name: "امین رضا",
    //   },
    // });
  };

  const myLogout = () => {
    authDispatch({
      type: "LOGOUT",
    });
    // store.RemoveRange(["token", "userID", "userName"]);
    // setAuthState({
    //   isAuth: false,
    //   token: "",
    //   user: {
    //     id: 0,
    //     name: "",
    //   },
    // });
  };

  return (
    <AuthContext.Provider
      value={{
        login: myLogin,
        logout: myLogout,
        authData: authState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
