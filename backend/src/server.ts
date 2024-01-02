import cors from "cors";
import dotenv from "dotenv";
import type { Request, Response } from "express";
import express from "express";
import helmet from "helmet";
import { routes } from "./constants/routes";
import AuthRouter from "./routes/auth";
import { V1Router } from "./routes/v1/v1.router";
import welcomeTemplate from "./template/welcome";

const initServer = () => {
  dotenv.config();
  if (!process.env.PORT) {
    process.exit(1);
  }
  const PORT: number = parseInt(process.env.PORT, 10);
  const app = express();

  const mountMiddleware = () => {
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
  };

  const mountRoutes = () => {
    app.get("/", (_: Request, res: Response) => res.send(welcomeTemplate));
    app.use(routes.auth, AuthRouter);
    app.use(routes.api.v1, V1Router);
  };

  mountMiddleware();
  mountRoutes();

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

initServer();
