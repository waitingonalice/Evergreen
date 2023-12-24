const authRoute = (toPath: string) => `/app${toPath}`;
const api = process.env.NEXT_PUBLIC_ENDPOINT_URL;

export const clientRoutes = {
  root: "/",
  auth: {
    login: "/login",
  },
  profile: { index: authRoute("/profile") },
  dashboard: {
    index: authRoute("/dashboard"),
  },
  codeEditor: {
    index: authRoute("/playground"),
  },
};

export const apiRoutes = {
  auth: {
    login: `${api}auth/login`,
    refreshToken: `${api}auth/refresh-token`,
  },
};
