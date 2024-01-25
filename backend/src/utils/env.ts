export class Env {
  static PORT = parseInt(process.env.PORT ?? "", 10);

  static SESSION_SECRET = process.env.SESSION_SECRET || "";

  static SUPPORT_EMAIL_ADDRESS = process.env.SUPPORT_EMAIL_ADDRESS || "";

  static SUPPORT_EMAIL_PASSWORD = process.env.SUPPORT_EMAIL_PASSWORD || "";

  static CODE_JUDGE =
    process.env.CODE_JUDGE_URL || "https://judge0-ce.p.rapidapi.com";

  static RAPID_API_KEY = process.env.RAPID_API_KEY || "";

  static RAPID_API_HOST = process.env.RAPID_API_HOST || "";
}
