import { useMutation } from "react-query";
import { apiRoutes } from "~/constants";
import { request } from "~/utils/fetch";

type InputValuesKeys = "email" | "password" | "rememberMe";

export type InputValuesType = Record<InputValuesKeys, string | boolean>;

export const useLogin = () =>
  useMutation({
    mutationFn: (input: InputValuesType) =>
      request({ url: apiRoutes.auth.login, method: "POST", input }),
  });
