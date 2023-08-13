/* eslint-disable no-console */
import type { Request, Response } from "express";
import { rest } from "~/utils";
import authenticationEndpoints from "./routes/auth";
import welcomeTemplate from "./template/welcome";

rest.dotenv.config({ path: `${__dirname}/.env` });
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT, 10);

const app = rest.express();
app.use(rest.cors());
app.use(rest.express.json());
app.use(rest.helmet());

app.get("/", (req: Request, res: Response) => res.send(welcomeTemplate));

authenticationEndpoints(app);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
