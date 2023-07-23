import { useMutation } from "react-query";
import { CountryEnum, apiRoutes } from "~/constants";
import { request } from "~/utils/fetch";

export interface RegisterUserInputType {
  firstName?: string;
  lastName?: string;
  country?: CountryEnum;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface RegisterUserResponseType {
  data: {
    id: string;
    firstName: string;
    lastName: string;
    country: CountryEnum;
  };
}
export const useRegisterUser = () =>
  useMutation({
    mutationFn: (input: RegisterUserInputType) =>
      request<RegisterUserResponseType, RegisterUserInputType>({
        url: apiRoutes.auth.register,
        method: "POST",
        input,
      }),
  });
