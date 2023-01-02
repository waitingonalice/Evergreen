import { register } from "~/middleware";
export type RegisterProps = {
  // email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
};

export type RegisterDataType = Awaited<ReturnType<typeof register>>;
