export interface UserType {
  id: string;
  country: string;
  firstName: string;
  lastName: string;
  active: boolean;
  email: string;
}

export interface DecodedAuthTokenType {
  data: {
    userId: string;
    country: string;
    firstName: string;
    lastName: string;
    verified: boolean;
    email: string;
  };
  exp: number;
}
