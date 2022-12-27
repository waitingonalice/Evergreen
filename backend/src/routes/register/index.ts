import type { Request, Response } from "express";
import { Rest, db } from "~/utils";
import { api } from "~/constants/routes";

Rest.dotenv.config({ path: __dirname + "/.env" });
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT, 10);

const app = Rest.express();
app.use(Rest.cors());
app.use(Rest.express.json());
app.use(Rest.helmet());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.post(api.register, (req: Request, res: Response) => {
  return res.json({ test: 1 });
});
