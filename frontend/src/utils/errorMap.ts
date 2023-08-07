// eslint-disable-next-line consistent-return
export const errorMap = (error: unknown): string | undefined => {
  if (error instanceof Error) {
    switch (error.message) {
      case "400000":
        return "Bad Request";
      case "400001":
        return "This email already exists.";
      case "400002":
        return "Empty request body.";
      case "400003":
        return "An invalid email was provided.";
      case "400004":
        return "Failed to create account.";
      case "400005":
        return "This email has already been verified.";
      case "400006":
        return "Invalid token";
      case "400007":
        return "Expired token";
      case "400008":
        return "Password mismatch";
      case "401000":
        return "Unauthorized access";
      case "404000":
        return "Resource Not Found";
      case "404001":
        return "Invalid email provided.";
      default:
        return "Internal Server Error";
    }
  }
};
