/* eslint-disable no-console */
import type { Request, Response } from "express";
import { Rest } from "~/utils";
import authenticationEndpoints from "./routes/auth";
import welcomeTemplate from "./template/welcome";

Rest.dotenv.config({ path: `${__dirname}/.env` });
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT, 10);

const app = Rest.express();
app.use(Rest.cors());
app.use(Rest.express.json());
app.use(Rest.helmet());

app.get("/", (req: Request, res: Response) => res.send(welcomeTemplate));

authenticationEndpoints(app);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
