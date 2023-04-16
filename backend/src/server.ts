import type { Request, Response } from "express";
import { Rest } from "~/utils";
import { registerRoute } from "./routes";
import { api } from "~/constants/routes";

Rest.dotenv.config({ path: `${__dirname}/.env` });
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT, 10);

const app = Rest.express();
app.use(Rest.cors());
app.use(Rest.express.json());
app.use(Rest.helmet());

app.get("/", (req: Request, res: Response) =>
  res.send("<h1>Expense tracker API</h1>")
);

app.use(api.auth, registerRoute);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
