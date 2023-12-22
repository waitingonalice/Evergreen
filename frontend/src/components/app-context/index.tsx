import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { jwt } from "~/utils";
import { getCookie } from "~/utils/cookie";

interface AppContextProps {
  user?: {
    verified: string;
    firstName: string;
    lastName: string;
    country: string;
    userId: string;
    email: string;
  };
}

interface AuthToken {
  data: AppContextProps["user"];
  exp: number;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
export const App = () => {
  const [user, setUser] = useState<AppContextProps["user"]>();
  const authToken = getCookie("authToken");

  const value = useMemo(() => ({ user }), [user]);

  useEffect(() => {
    if (authToken) {
      const decodedAuthToken = jwt<AuthToken>(authToken);
      setUser(decodedAuthToken?.data);
    }
  }, []);

  return (
    <AppContext.Provider value={value}>
      <Outlet />
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
