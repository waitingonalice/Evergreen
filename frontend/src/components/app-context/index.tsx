import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { clientRoutes } from "~/constants";
import { getCookie } from "~/utils/cookie";

interface AppContextProps {
  user?: {
    verified: string;
    firstName: string;
    lastName: string;
    country: string;
    userId: string;
  };
}

interface AuthToken {
  data: AppContextProps["user"];
  exp: number;
}

interface RefreshToken {
  id: number;
  rememberMe: boolean;
}

const rememberMeForbiddenParams = ["?expired", "?logout"];

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
export const App = () => {
  const [user, setUser] = useState<AppContextProps["user"]>();
  const location = useLocation();
  const navigate = useNavigate();
  const refreshToken = getCookie("refreshToken");
  const authToken = getCookie("authToken");

  const value = useMemo(() => ({ user }), [user]);

  const redirectOnRememberMe = () => {
    if (!refreshToken) return;
    const decodedRefreshToken = jwtDecode<RefreshToken>(refreshToken);
    // if remember me was selected and the user is not on the authenticated path, redirect to dashboard where the request handler in that page will refresh the token
    if (
      decodedRefreshToken &&
      decodedRefreshToken.rememberMe &&
      !location.pathname.includes("tracker") &&
      !rememberMeForbiddenParams.includes(location.search)
    )
      navigate(clientRoutes.dashboard.index);
  };

  useEffect(() => {
    if (authToken) {
      const decodedAuthToken = jwtDecode<AuthToken>(authToken);
      setUser(decodedAuthToken.data);
      redirectOnRememberMe();
    }
  }, []);

  return (
    <AppContext.Provider value={value}>
      <Outlet />
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
