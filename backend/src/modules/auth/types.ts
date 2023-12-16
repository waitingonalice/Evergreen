export interface forgotPasswordRequestBody {
  email: string;
}

export type LoginInputValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type RefreshTokenRequestBody = {
  refreshToken: string;
};

export interface DecodedToken {
  id: string;
  rememberMe: boolean;
}

export interface RegisterType {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  country: string;
}

export interface SetPasswordRequestBody {
  password: string;
  confirmPassword: string;
}

export enum JwtErrorMessage {
  EXPIRED = "jwt expired",
  INVALID = "invalid token",
}

export interface DecodedVerifyTokenType {
  data: {
    email: string;
    country: string;
  };
}
