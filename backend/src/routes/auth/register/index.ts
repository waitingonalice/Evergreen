import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { ErrorEnum } from "~/constants/enum";
import { Rest, isEmptyObjectValue } from "~/utils";
import { sendEmailVerification } from "./middleware/emailVerification";
import { RegisterProps, register } from "./middleware/registerHash";

const router = Rest.express.Router();

router.post("/register", async (req: Request, res: Response) => {
  const requestBody: RegisterProps = req.body;
  try {
    if (isEmptyObjectValue(requestBody)) throw new Error(ErrorEnum.EMPTY_BODY);
    const registerData = await register(requestBody);
    await sendEmailVerification(registerData);
    return res.json({
      data: registerData,
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
      return res.status(500).json({ code: err.message });
    return res.status(500).json({ code: ErrorEnum.INTERNAL_SERVER_ERROR });
  }
});

export default router;
