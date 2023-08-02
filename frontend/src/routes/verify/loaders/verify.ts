import { useQuery } from "react-query";
import { apiRoutes } from "~/constants";
import { request } from "~/utils/fetch";

interface VerifyUserResponseType {
  data: {
    email: string;
  };
}

export const useVerifyUser = (token: string) =>
  useQuery({
    queryFn: () =>
      request<VerifyUserResponseType, undefined>({
        url: apiRoutes.auth.verify(token),
        method: "GET",
      }),
    retry: false,
  });
