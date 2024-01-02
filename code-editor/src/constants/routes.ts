const appRoute = (toPath: string) =>
  `${process.env.NEXT_PUBLIC_URL}/app${toPath}`;
const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_URL;
export const clientRoutes = {
  auth: {
    login: `${process.env.NEXT_PUBLIC_URL}/login`,
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
  },
};
