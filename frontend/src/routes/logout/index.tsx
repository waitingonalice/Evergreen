import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { clientRoutes } from "~/constants";
import { logout } from "~/utils";

const Logout = () => {
  const location = useLocation();

  useEffect(() => {
    logout();
    switch (location.search) {
      case "?expired":
        return window.location.replace(`${clientRoutes.auth.login}?expired`);

      default:
        return window.location.replace(`${clientRoutes.auth.login}?logout`);
    }
  }, []);
  return <></>;
};

export default Logout;
