import jwt from "jsonwebtoken";
import { ErrorEnum } from "~/constants/enum";
import { Rest, db } from "~/utils";

type RequestBody = {
  refreshToken: string;
};

interface DecodedToken {
  id: string;
  rememberMe: boolean;
}

const router = Rest.express.Router();

router.get("/refreshToken", async (req, res) => {
  const input: RequestBody = req.body;

  try {
    if (!process.env.SESSION_SECRET) throw new Error("SESSION_SECRET not set");
    const decoded = jwt.verify(input.refreshToken, process.env.SESSION_SECRET);
    const { id } = decoded as DecodedToken;
    const user = await db.account.findUnique({ where: { id } });
    if (!user) throw new Error(ErrorEnum.INVALID_REFRESH_TOKEN);
    const { id: userId, country, firstName, lastName, active, email } = user;

    const auth = jwt.sign(
      {
        data: {
          userId,
          country,
          firstName,
          lastName,
          verified: active,
          email,
        },
      },
      process.env.SESSION_SECRET,
      { expiresIn: "15min" }
    );
    return res.status(200).json({ result: { auth } });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).json({ code: err.message });
    }
    return res.status(500).json({ code: ErrorEnum.INTERNAL_SERVER_ERROR });
  }
});

export default router;
