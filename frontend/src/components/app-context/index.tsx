import { createContext, useContext, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { GetUserType, useGetUser } from "./loaders/user";

interface AppContextProps {
  user?: GetUserType["result"];
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
export const App = () => {
  const { data } = useGetUser();
  const value = useMemo(() => ({ user: data?.result }), [data?.result]);

  return (
    <AppContext.Provider value={value}>
      <Outlet />
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
