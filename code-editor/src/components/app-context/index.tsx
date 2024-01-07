import {
  Toaster,
  useToast,
} from "@waitingonalice/design-system/components/toast";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCookie, jwt } from "~/utils";

interface AppContextProps {
  user?: {
    verified: string;
    firstName: string;
    lastName: string;
    country: string;
    userId: string;
    email: string;
  };
  renderToast: ReturnType<typeof useToast>["renderToast"];
  dismissToast: ReturnType<typeof useToast>["dismiss"];
  updateToast: ReturnType<typeof useToast>["update"];
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
  const {
    renderToast,
    dismiss: dismissToast,
    update: updateToast,
  } = useToast();
  const authToken = getCookie("authToken");

  const value = useMemo(
    () => ({ user, renderToast, dismissToast, updateToast }),
    [user]
  );

  useEffect(() => {
    if (authToken) {
      const decodedAuthToken = jwt<AuthToken>(authToken);
      setUser(decodedAuthToken?.data);
    }
  }, []);

  return (
    <AppContext.Provider value={value}>
      {children}
      <Toaster />
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
