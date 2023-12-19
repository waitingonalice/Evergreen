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
    index: authRoute("/playground"),
  },
};
