import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { Button, Link, Text } from "@waitingonalice/design-system";
import { useSearchParams } from "react-router-dom";
import { Spinner } from "~/components";
import { clientRoutes } from "~/constants";
import { errorMap } from "~/utils";
import { useVerifyUser } from "./loaders/verify";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const { isLoading, error } = useVerifyUser(searchParams.get("code") ?? "");

  return (
    <div className="flex flex-col items-center text-center justify-center w-full gap-y-4">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {errorMap(error) ? (
            <>
              <XCircleIcon className="text-error-main h-20 w-20" />
              <Text type="subhead-2">{errorMap(error)}</Text>
              <Link to={clientRoutes.auth.login}>Back to login page</Link>
            </>
          ) : (
            <>
              <CheckCircleIcon className="text-primary-main h-20 w-20" />
              <Text type="subhead-2">
                Account has been successfully verified.
              </Text>
              <Button variant="primaryLink">
                <a href={clientRoutes.auth.login}>Back to login page</a>
              </Button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Verify;
