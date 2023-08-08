import { useMutation } from "react-query";
import { apiRoutes } from "~/constants";
import { request } from "~/utils/fetch";

type InputValuesKeys = "email" | "password" | "rememberMe";

export type InputValuesType = Record<InputValuesKeys, string | boolean>;

interface LoginResponseType {
  result: {
    tokens: {
      auth: string;
      refresh: string;
    };
  };
}

export const useLogin = () =>
  useMutation({
    mutationFn: (input: InputValuesType) =>
      request<LoginResponseType, InputValuesType>({
        url: apiRoutes.auth.login,
        method: "POST",
        input,
      }),
  });
