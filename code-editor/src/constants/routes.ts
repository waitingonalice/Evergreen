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
  billing: {
    index: authRoute("/billings"),
  },
  transactions: {
    index: authRoute("/transactions"),
    create: authRoute("/transactions/create"),
  },
  balance: {
    index: authRoute("/balances"),
  },
  kanban: {
    index: authRoute("/kanban"),
  },
  codeEditor: {
    index: authRoute("/playground"),
  },
};
