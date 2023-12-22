import jwtDecode from "jwt-decode";
import { apiRoutes, clientRoutes } from "~/constants";
import { removeCookie, setCookie } from "./cookie";

interface RefreshAuthTokenResponse {
  result: {
    auth: string;
  };
}

interface RefreshAuthTokenArgType {
  authToken: string;
  refreshToken: string;
}

export const jwt = <T>(...args: Parameters<typeof jwtDecode>) => {
  try {
    const result = jwtDecode<T>(...args);
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const refreshAuthToken = async (tokens: RefreshAuthTokenArgType) => {
  try {
    const { authToken, refreshToken } = tokens;
    const decodedAuth = jwtDecode<{ exp: number }>(authToken);
    if (authToken && refreshToken) {
      const authExpired = decodedAuth.exp * 1000 < Date.now();
      if (!authExpired) return;
      const res = await fetch(apiRoutes.auth.refreshToken, {
        method: "GET",
        body: JSON.stringify({ refreshToken }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: RefreshAuthTokenResponse = await res.json();
      setCookie("authToken", data.result.auth);
    }
  } catch (err) {
    window.location.assign(`${clientRoutes.auth.login}?expired`);
    console.error(err);
  }
};

export const logout = () => {
  removeCookie("refreshToken");
  removeCookie("authToken");
};
