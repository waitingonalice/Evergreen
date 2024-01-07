export const api = import.meta.env.VITE_ENDPOINT_URL;
const appRoute = (toPath: string) => `/app${toPath}`;

export const clientRoutes = {
  root: "/",
  auth: {
    login: "/login",
    logout: "/logout",
    register: "/register",
    verify: "/verify",
    forgotPassword: "/forgot-password",
    resetPassword: "/set-password",
  },

  profile: { index: appRoute("/profile") },
  dashboard: {
    index: appRoute("/dashboard"),
  },
  codeEditor: {
    index: import.meta.env.VITE_PLAYGROUND_URL,
  },
};

export const apiRoutes = {
  auth: {
    register: `${api}/auth/register`,
    verify: (token: string) => `${api}/auth/verify/${token}`,
    login: `${api}/auth/login`,
    refreshToken: `${api}/auth/refresh-token`,
    forgotPassword: `${api}/auth/forgot-password`,
    resetPassword: (token: string) => `${api}/auth/set-password/${token}`,
  },
};
