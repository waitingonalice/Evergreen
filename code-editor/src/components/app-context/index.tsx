import { createContext, useContext, useEffect, useMemo, useState } from "react";
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

interface AppProps {
  children: React.ReactNode;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const App = ({ children }: AppProps) => {
  const [user, setUser] = useState<AppContextProps["user"]>();
  const authToken = getCookie("authToken");

  const value = useMemo(() => ({ user }), [user]);

  useEffect(() => {
    if (authToken) {
      const decodedAuthToken = jwt<AuthToken>(authToken);
      setUser(decodedAuthToken?.data);
    }
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
