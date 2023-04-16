import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { register, sendEmailVerification, verify } from "~/middleware";
import { RegisterProps } from "~/types/register";
import { Rest, isEmptyObjectValue } from "~/utils";

const router = Rest.express.Router();

router.post("/register", async (req: Request, res: Response) => {
  const requestBody: RegisterProps = req.body;
  try {
    if (isEmptyObjectValue(requestBody))
      return res.status(400).json({ message: "400002" });
    const registerData = await register(requestBody);
    await sendEmailVerification(registerData);
    return res.json({
      data: registerData,
      message: "A verification link has been sent to your account.",
    });
  } catch (err: unknown) {
    // to catch prisma errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      switch (err.code) {
        case "P2002":
          return res.status(400).json({ message: "400001" });
        default:
      }
    }
    return res.status(500).json({ message: "500000" });
  }
});

router.get("/verify/:token", async (req: Request, res: Response) => {
  const jwtToken = req.params.token;
  const message = await verify(jwtToken);
  return res.json({ message });
});

export default router;
