import { useQuery } from "react-query";
import { apiRoutes } from "~/constants";
import { request } from "~/utils/fetch";

interface VerifyUserResponseType {
  result: {
    email: string;
  };
}

export const useVerifyUser = (token: string) =>
  useQuery({
    queryKey: ["verify", token],
    queryFn: () =>
      request<VerifyUserResponseType, undefined>({
        url: apiRoutes.auth.verify(token),
        method: "GET",
      }),
  });
