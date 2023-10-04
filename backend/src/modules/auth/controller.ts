/* eslint-disable no-console */
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ErrorEnum } from "~/constants/enum";
import { prisma } from "~/db";
import { forgotPasswordTemplate } from "~/template/forgot-password";
import { setPasswordTemplate } from "~/template/set-password";
import { emailVerificationTemplate } from "~/template/verify";
import {
  DecodedToken,
  DecodedVerifyTokenType,
  JwtErrorMessage,
  LoginInputValues,
  RefreshTokenRequestBody,
  RegisterType,
  SetPasswordRequestBody,
  forgotPasswordRequestBody,
} from "./types";
import {
  generateAuthToken,
  generateRefreshToken,
  passwordHash,
  sendEmailVerification,
} from "./util";
import { emailSchema, passwordSchema, registrationSchema } from "./validation";

export const handleForgotPassword = async (req: Request, res: Response) => {
  const { email }: forgotPasswordRequestBody = req.body;
  try {
    const verifyUserByEmail = async (email: string) => {
      const result = emailSchema.safeParse(email);
      if (!result.success) throw new Error(result.error.errors[0].message);
      const user = await prisma.account.findUnique({ where: { email } });
      if (!user) throw new Error(ErrorEnum.INVALID_EMAIL);
      return user;
    };

    const user = await verifyUserByEmail(email);
    const token =
      process.env.SESSION_SECRET &&
      jwt.sign({ data: { id: user.id } }, process.env.SESSION_SECRET, {
        expiresIn: "30min",
      });

    await sendEmailVerification(
      user.email,
      forgotPasswordTemplate(
        user.firstName,
        `${process.env.DOMAIN_URL}/set-password?code=${token}`
      ),
      "Reset password"
    );

    return res.status(200).json({ result: "ok" });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return res.status(400).json({ code: err.message });
    }
    return res.status(500).json({ code: ErrorEnum.INTERNAL_SERVER_ERROR });
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const input = req.body as LoginInputValues;

    const verifyCredentials = async (input: LoginInputValues) => {
      const user = await prisma.account.findUnique({
        where: { email: input.email },
      });
      if (!user) throw new Error(ErrorEnum.INVALID_LOGIN_CRED);

      if (user && !user.active) throw new Error(ErrorEnum.EMAIL_NOT_VERIFIED);

      const passwordMatch = await bcrypt.compare(input.password, user.password);
      if (!passwordMatch) throw new Error(ErrorEnum.INVALID_LOGIN_CRED);
      return user;
    };

    const user = await verifyCredentials(input);

    if (!process.env.SESSION_SECRET) throw new Error("SESSION_SECRET not set");
    const auth = generateAuthToken(user, process.env.SESSION_SECRET);
    const refresh = generateRefreshToken(
      user,
      input.rememberMe,
      process.env.SESSION_SECRET
    );

    console.log(
      `User:${user.email} successfully logged in at: ${new Date(Date.now())}`
    );
    return res.status(200).json({
      result: {
        tokens: {
          auth,
          refresh,
        },
        id: user.id,
        country: user.country,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(401).json({ code: error.message });
    return res.status(500).json({ code: ErrorEnum.INTERNAL_SERVER_ERROR });
  }
};

export const handleRefreshToken = async (req: Request, res: Response) => {
  const input: RefreshTokenRequestBody = req.body;

  try {
    if (!process.env.SESSION_SECRET) throw new Error("SESSION_SECRET not set");
    const decoded = jwt.verify(input.refreshToken, process.env.SESSION_SECRET);
    const { id } = decoded as DecodedToken;

    const user = await prisma.account.findUnique({ where: { id } });
    if (!user) throw new Error(ErrorEnum.INVALID_REFRESH_TOKEN);

    const auth = generateAuthToken(user, process.env.SESSION_SECRET);
    return res.status(200).json({ result: { auth } });
  } catch (err) {
    if (err instanceof Error)
      return res.status(401).json({ code: err.message });
    return res.status(500).json({ code: ErrorEnum.INTERNAL_SERVER_ERROR });
  }
};

export const handleRegister = async (req: Request, res: Response) => {
  const requestBody: RegisterType = req.body;
  try {
    const validate = registrationSchema.safeParse(requestBody);
    // always display the first error in the list
    if (!validate.success) throw new Error(validate.error.errors[0].message);

    const createUser = async (input: RegisterType) => {
      const { email, country, firstName, lastName, confirmPassword } = input;
      const token =
        process.env.SESSION_SECRET &&
        jwt.sign({ data: { email, country } }, process.env.SESSION_SECRET, {
          expiresIn: "24h",
        });
      if (!token) throw new Error(ErrorEnum.INTERNAL_SERVER_ERROR);
      const hash = await passwordHash(confirmPassword);

      const account = await prisma.account.create({
        data: {
          email,
          country,
          firstName,
          lastName,
          password: hash,
        },
        select: {
          email: true,
          firstName: true,
          lastName: true,
          country: true,
        },
      });
      if (!account) throw new Error(ErrorEnum.CREATION_ACCOUNT_FAILED);
      return { account, token };
    };

    const registerData = await createUser(requestBody);
    await sendEmailVerification(
      registerData.account.email,
      emailVerificationTemplate(
        registerData.account.firstName,
        `${process.env.DOMAIN_URL}/verify?code=${registerData.token}`
      )
    );
    return res.json({
      result: registerData,
    });
  } catch (err: unknown) {
    // to catch prisma errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      switch (err.code) {
        case "P2002":
          return res.status(400).json({ code: ErrorEnum.DUPLICATE_EMAIL });
        default:
          return res.status(500).json({ code: err.message });
      }
    } else if (err instanceof Error)
      return res.status(400).json({ code: err.message });
    return res.status(500).json({ code: ErrorEnum.INTERNAL_SERVER_ERROR });
  }
};

export const handleSetPassword = async (req: Request, res: Response) => {
  try {
    const { password, confirmPassword } = req.body as SetPasswordRequestBody;
    const { token } = req.params;

    const verifyUserData = ({
      password,
      confirmPassword,
      token,
    }: SetPasswordRequestBody & { token: string }) => {
      const validate = passwordSchema.safeParse({ password, confirmPassword });
      if (!validate.success) throw new Error(validate.error.errors[0].message);

      if (!process.env.SESSION_SECRET)
        throw new Error("SESSION_SECRET is not defined");

      const decodedUserData = jwt.verify(token, process.env.SESSION_SECRET) as
        | JwtPayload
        | undefined;
      if (!decodedUserData) throw new Error(ErrorEnum.INVALID_TOKEN);
      return decodedUserData;
    };

    const decodedUserData = verifyUserData({
      password,
      confirmPassword,
      token,
    });

    const hashPassword = await passwordHash(confirmPassword);
    const user = await prisma.account.update({
      where: { id: decodedUserData?.data.id },
      data: { password: hashPassword },
      select: { firstName: true, email: true },
    });

    if (!user) throw new Error(ErrorEnum.INTERNAL_SERVER_ERROR);

    await sendEmailVerification(
      user.email,
      setPasswordTemplate(user.firstName, `${process.env.DOMAIN_URL}/login`)
    );

    return res.status(200).json({ result: "ok" });
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      switch (err.message) {
        case JwtErrorMessage.INVALID:
          return res.status(400).json({ code: ErrorEnum.INVALID_TOKEN });
        case JwtErrorMessage.EXPIRED:
          return res.status(400).json({ code: ErrorEnum.EXPIRED_TOKEN });
        default:
          break;
      }
    }
    if (err instanceof Error)
      return res.status(400).json({ code: err.message });

    return res.status(500).json({ code: ErrorEnum.INTERNAL_SERVER_ERROR });
  }
};

export const handleVerify = async (req: Request, res: Response) => {
  const jwtToken = req.params.token;

  const verifyUserByEmail = async (token: string) => {
    try {
      const decoded = (process.env.SESSION_SECRET &&
        jwt.verify(token, process.env.SESSION_SECRET)) as
        | DecodedVerifyTokenType
        | undefined;
      const email = decoded?.data.email || "";
      const account = await prisma.account.findUnique({
        where: { email },
        select: { active: true },
      });
      if (account?.active) {
        throw new Error(ErrorEnum.DUPLICATE_TOKEN);
      } else if (email) {
        const data = await prisma.account.update({
          where: { email },
          data: { active: true },
          select: { email: true },
        });
        return data;
      }
    } catch (err) {
      if (err instanceof jwt.JsonWebTokenError)
        switch (err.message) {
          case JwtErrorMessage.INVALID:
            return { code: ErrorEnum.INVALID_TOKEN };
          case JwtErrorMessage.EXPIRED:
            return { code: ErrorEnum.EXPIRED_TOKEN };
          default:
            break;
        }
      if (err instanceof Error) return { code: err.message };
    }
    return { code: ErrorEnum.INTERNAL_SERVER_ERROR };
  };

  const data = await verifyUserByEmail(jwtToken);
  if ("code" in data) return res.status(400).json({ code: data.code });
  return res.json({ result: data });
};
