import { useLocation } from "react-router-dom";
import { Alert } from "~/components";
import { errorMap } from "~/utils";

interface MessageBoxProps {
  error: unknown;
}

export const MessageBox = ({ error }: MessageBoxProps) => {
  const location = useLocation();
  const className = "mb-4";
  if (error) {
    return (
      <Alert
        className={className}
        show={Boolean(errorMap(error))}
        title={errorMap(error)}
        type="error"
      />
    );
  }
  switch (location.search) {
    case "?expired": {
      return (
        <Alert
          className={className}
          show={Boolean(location.search)}
          title="Session expired, please login again."
          type="warning"
        />
      );
    }
    case "?logout":
      return (
        <Alert
          className={className}
          show={Boolean(location.search)}
          title="Account successfully signed out."
          type="success"
        />
      );

    default:
      return null;
  }
};
