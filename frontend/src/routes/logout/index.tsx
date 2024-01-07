import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { clientRoutes } from "~/constants";
import { logout } from "~/utils";

const Logout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    switch (location.search) {
      case "?expired":
        logout();
        return navigate(`${clientRoutes.auth.login}?expired`, {
          replace: true,
        });

      default:
        logout();
        return navigate(`${clientRoutes.auth.login}?logout`, { replace: true });
    }
  }, []);
  return <></>;
};

export default Logout;
