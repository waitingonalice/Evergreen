import { useMutation } from "react-query";
import { apiRoutes } from "~/constants";
import { request } from "~/utils";

export interface SetPasswordInputType {
  password: string;
  confirmPassword: string;
}

interface SetPasswordResponseType {
  result: string;
}

export const useResetPassword = () =>
  useMutation({
    mutationFn: (input: SetPasswordInputType & { token: string }) =>
      request<SetPasswordResponseType, SetPasswordInputType>({
        url: apiRoutes.auth.resetPassword(input.token),
        input,
        method: "POST",
      }),
  });
