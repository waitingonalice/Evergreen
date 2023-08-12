export const api = import.meta.env.VITE_ENDPOINT_URL;
const authRoute = (toPath: string) => `/tracker${toPath}`;

export const clientRoutes = {
  root: "/",
  auth: {
    login: "/login",
    register: "/register",
    verify: "/verify",
    forgotPassword: "/forgot-password",
  },

  dashboard: {
    index: authRoute("/dashboard"),
  },
};

export const apiRoutes = {
  auth: {
    register: `${api}auth/register`,
    verify: (token: string) => `${api}auth/verify/${token}`,
    login: `${api}auth/login`,
    refreshToken: `${api}auth/refresh-token`,
    forgotPassword: `${api}auth/forgot-password`,
  },
};
