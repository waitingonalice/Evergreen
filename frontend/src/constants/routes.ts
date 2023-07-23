export const api = import.meta.env.VITE_APP_API_URL;

export const clientRoutes = {
  root: "/",
  login: "/login",
  register: "/register",
};

export const apiRoutes = {
  auth: {
    register: `${api}/auth/register`,
    verify: (token: string) => `${api}/auth/verify/${token}`,
  },
};
