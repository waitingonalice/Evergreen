import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clientRoutes } from "~/constants";

const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(clientRoutes.auth.login);
  }, []);

  return <></>;
};

export default Root;
