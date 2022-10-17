import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
const cors = require("cors");

dotenv.config();
const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/api", (req, res) => {
  res.send("Express api page");
});

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening on port http://localhost:${port}`);
});
