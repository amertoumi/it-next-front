import AuthState from "./AuthState";

import { API_HOST, API_AUTH_PATH } from "../../API";
import axios from "axios";
import ls from "local-storage";
import jwtDecode from "jwt-decode";
import Router from "next/router";

const authReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ERROR":
      return { ...state, errorMessage: action.payload };
    case "SIGNUP":
      return { ...state, errorMessage: "", token: action.payload.token };
    case "SIGNIN":
      return { ...state, errorMessage: "", token: action.payload };
    case "CLEAR_ERROR_MESSAGE":
      return { ...state, errorMessage: "" };
    case "IS_AUTH":
      return { token: null, errorMessage: "", currentUser: 0 };
    case "SIGNOUT":
      return { token: null, errorMessage: "", currentUser: 0 };
    case "USER":
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await ls.get("token");
  if (token) {
    dispatch({ type: "SIGNIN", payload: token });
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "CLEAR_ERROR_MESSAGE" });
};

const signin = (dispatch) => async (data) => {
  const URL = API_HOST + API_AUTH_PATH;
  try {
    const response = await axios.post(URL, data);
    await ls.set("token", response.data.token);
    const token = await ls.get("token");
    const { id: xx } = await jwtDecode(token);
    ls.set("currentUser", xx);
    dispatch({ type: "SIGNIN", payload: response.data.token });
    const { roles: role } = jwtDecode(token);

    if (role[0] === "ROLE_ADMIN") {
      Router.push("/admin/dashboard");
    } else if (role[0] === "ROLE_RECRUITER") {
      Router.push("/recruiter/profil");
    } else if (role[0] === "ROLE_USER") {
      Router.push("/user/profil");
    } else Router.push("/home");

    return true;
  } catch (error) {
    console.log("failed");
    dispatch({
      type: "ADD_ERROR",
      payload: "adresse e-mail ou mot de passe n'est pas valide",
    });
  }
};

const signout = (dispatch) => async () => {
  await ls.remove("token");
  ls.remove("currentUser");
  delete axios.defaults.headers["Authorization"];
  dispatch({ type: "SIGNOUT" });
  Router.push("/home");
};

function setAxiosToken() {
  const token = ls.get("token");
  const Axios = (axios.defaults.headers["Authorization"] = "Bearer  " + token);
  return Axios;
}

export function is_Authenticated(dispatch) {
  const token = ls.get("token");
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    //const {roles: role} = jwtDecode(token)
    if (expiration * 1000 > new Date().getTime()) {
      setAxiosToken(token);
    } else {
      Router.push("/home");
    }
  }
}

export const { Provider, Context } = AuthState(
  authReducer,
  { signin, signout, is_Authenticated, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "", currentUser: null }
);
