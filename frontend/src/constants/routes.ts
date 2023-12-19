export const api = import.meta.env.VITE_ENDPOINT_URL;
const authRoute = (toPath: string) => `/app${toPath}`;

export const clientRoutes = {
  root: "/",
  auth: {
    login: "/login",
    register: "/register",
    verify: "/verify",
    forgotPassword: "/forgot-password",
    resetPassword: "/set-password",
  },

  profile: { index: authRoute("/profile") },

  dashboard: {
    index: authRoute("/dashboard"),
  },
  codeEditor: {
    // TODO: update this
    index: "http://localhost:3001/app/playground",
  },
};

export const apiRoutes = {
  auth: {
    register: `${api}auth/register`,
    verify: (token: string) => `${api}auth/verify/${token}`,
    login: `${api}auth/login`,
    refreshToken: `${api}auth/refresh-token`,
    forgotPassword: `${api}auth/forgot-password`,
    resetPassword: (token: string) => `${api}auth/set-password/${token}`,
  },
};
