const appRoute = (toPath: string) =>
  `${process.env.NEXT_PUBLIC_URL}/app${toPath}`;
const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_URL;
export const clientRoutes = {
  auth: {
    login: `${process.env.NEXT_PUBLIC_URL}/login`,
    logout: `${process.env.NEXT_PUBLIC_URL}/logout`,
  },
  profile: { index: appRoute("/profile") },
  dashboard: {
    index: appRoute("/dashboard"),
  },
};

export const apiRoutes = {
  auth: {
    refreshToken: `${endpoint}/auth/refresh-token`,
  },
  collections: {
    addCollection: `${endpoint}/api/v1/collections`,
    executeCode: `${endpoint}/api/v1/execute`,
  },
};
