import cookies from "js-cookie";

export const setCookie = (
  key: string,
  value: string,
  options?: Parameters<typeof cookies["set"]>[2]
) => {
  cookies.set(key, value, {
    secure: true,
    sameSite: "strict",
    httpOnly: true,
    ...options,
  });
};
