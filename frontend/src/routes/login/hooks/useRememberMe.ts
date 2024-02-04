import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clientRoutes } from "~/constants";
import { getCookie, jwt } from "~/utils";

interface RefreshToken {
  data: {
    id: number;
    rememberMe: boolean;
  };
}
export const useRememberMe = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = getCookie("refreshToken");
    const authToken = getCookie("authToken");

    const redirectOnRememberMe = () => {
      if (!refreshToken || !authToken) return;
      const decodedRefreshToken = jwt<RefreshToken>(refreshToken);
      // if remember me was selected and the user is not on the authenticated path, redirect to dashboard where the request handler in that page will validate the token
      if (authToken && decodedRefreshToken?.data.rememberMe)
        navigate(clientRoutes.dashboard.index);
    };

    redirectOnRememberMe();
  }, []);
};
