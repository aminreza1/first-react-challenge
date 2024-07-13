import LocalStorageService from "../../services/local-storage-service";
import { AuthDataType } from "./auth-context";

type AuthReducerActionType = {
  type: string;
  payload?: any;
};

const AuthReducer = (state: AuthDataType, action: AuthReducerActionType) => {
  const store = new LocalStorageService();
  switch (action.type) {
    case "INIT":
      const token = store.Get("token");
      const userID = store.GetNumber("userID");
      const userName = store.Get("userName");

      return {
        isAuth: token && token.length > 0 ? true : false,
        token: token,
        user: {
          id: userID,
          name: userName,
        },
      };
    case "LOGIN":
      store.Add([
        { key: "token", value: action.payload.token ?? "" },
        { key: "userID", value: action.payload.userID },
        { key: "userName", value: action.payload.userName },
      ]);

      return {
        isAuth: true,
        token: action.payload.token ?? "",
        user: {
          id: action.payload.userID,
          name: action.payload.userName,
        },
      };

    case "LOGOUT":
      store.RemoveRange(["token", "userID", "userName"]);
      return {
        isAuth: false,
        token: "",
        user: {
          id: 0,
          name: "",
        },
      };

    default:
      throw new Error();
  }
};

export default AuthReducer;
