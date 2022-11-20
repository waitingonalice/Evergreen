import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = (rememberMe?: boolean) =>
  createCookieSessionStorage({
    cookie: {
      name: "user_session",
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secrets: ["secretSession"],
      secure: process.env.NODE_ENV === "production",
      maxAge: rememberMe ? 60 * 60 * 24 * 30 : undefined,
    },
  });
