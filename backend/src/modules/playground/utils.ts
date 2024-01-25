import { Env } from "~/utils";

export const rapidAPIHeaders = {
  "X-RapidAPI-Key": Env.RAPID_API_KEY,
  "X-RapidAPI-Host": Env.RAPID_API_HOST,
};
