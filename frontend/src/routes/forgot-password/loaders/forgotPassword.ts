import { useMutation } from "react-query";
import { apiRoutes } from "~/constants";
import { request } from "~/utils";

interface ForgotPasswordInput {
  email: string;
}

interface ForgotPasswordResponse {
  result: "ok";
}

export const useForgotPassword = () =>
  useMutation({
    mutationFn: (input: ForgotPasswordInput) =>
      request<ForgotPasswordResponse, ForgotPasswordInput>({
        url: apiRoutes.auth.forgotPassword,
        input,
        method: "POST",
      }),
  });
