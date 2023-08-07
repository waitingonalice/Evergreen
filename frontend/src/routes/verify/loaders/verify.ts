import { apiRoutes } from "~/constants";
import { request, useFetch } from "~/utils/fetch";

interface VerifyUserResponseType {
  result: {
    email: string;
  };
}

export const useVerifyUser = (token: string) =>
  useFetch({
    queryKey: ["verify", token],
    queryFn: () =>
      request<VerifyUserResponseType, undefined>({
        url: apiRoutes.auth.verify(token),
        method: "GET",
      }),
  });
