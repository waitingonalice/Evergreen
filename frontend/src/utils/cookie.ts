import cookies from "js-cookie";

export const setCookie = (
  key: string,
  value: string,
  options?: Parameters<typeof cookies["set"]>[2]
) => {
  cookies.set(key, value, {
    path: "/",
    secure: true,
    sameSite: "strict",
    httpOnly: false,
    ...options,
  });
};

export const getCookie = (key: string) => cookies.get(key);

export const removeCookie = (key: string) => cookies.remove(key);
