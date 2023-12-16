import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { clientRoutes } from "~/constants";
import { getCookie } from "~/utils/cookie";

const rememberMeForbiddenParams = ["?expired", "?logout"];

interface RefreshToken {
  data: {
    id: number;
    rememberMe: boolean;
  };
}
export const useRememberMe = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = getCookie("refreshToken");
    const authToken = getCookie("authToken");

    const redirectOnRememberMe = () => {
      if (!refreshToken || !authToken) return;
      const decodedRefreshToken = jwtDecode<RefreshToken>(refreshToken);
      // if remember me was selected and the user is not on the authenticated path, redirect to dashboard where the request handler in that page will validate the token
      if (
        authToken &&
        decodedRefreshToken.data.rememberMe &&
        !location.pathname.includes("app") &&
        !rememberMeForbiddenParams.includes(location.search)
      )
        navigate(clientRoutes.dashboard.index);
    };

    redirectOnRememberMe();
  }, []);
};
