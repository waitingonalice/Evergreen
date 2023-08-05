export const api = import.meta.env.VITE_ENDPOINT_URL;

export const clientRoutes = {
  root: "/",
  login: "/login",
  register: "/register",
  verify: "/verify",
};

export const apiRoutes = {
  auth: {
    register: `${api}auth/register`,
    verify: (token: string) => `${api}auth/verify/${token}`,
  },
};
