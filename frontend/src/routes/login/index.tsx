import {
  Button,
  Checkbox,
  Form,
  Link,
  Text,
} from "@waitingonalice/design-system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Input, Spinner } from "~/components";
import { clientRoutes } from "~/constants";
import { setCookie, useForm } from "~/utils";
import { MessageBox } from "./components/MessageBox";
import { useRememberMe } from "./hooks/useRememberMe";
import { InputValuesType, useLogin } from "./loaders/login";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email Address is required." })
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required." }),
});

const Login = () => {
  const [values, setValues] = useState<InputValuesType>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const { validate, ref, onSubmitValidate } = useForm({
    zod: loginSchema,
    data: values,
  });
  const navigate = useNavigate();
  const { mutate: login, isLoading, data: { result } = {}, error } = useLogin();

  const handleOnChange = (
    key: keyof InputValuesType,
    value: string | boolean
  ) => setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    const success = onSubmitValidate();
    if (success) {
      login(values);
      navigate(clientRoutes.auth.login, { replace: true });
    }
  };

  useRememberMe();
  useEffect(() => {
    if (result) {
      setCookie("authToken", result.tokens.auth);
      setCookie(
        "refreshToken",
        result.tokens.refresh,
        ...(values.rememberMe ? [{ expires: 30 }] : []) // if rememberMe is true, set cookie expiry to 30 days
      );
      navigate(clientRoutes.dashboard.index);
    }
  }, [result]);

  return (
    <div className="flex flex-col w-full gap-y-4 max-w-md">
      <MessageBox error={error} />
      <Text type="subhead-1" className="text-primary-main mb-4">
        Login
      </Text>
      <Form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <Input
          className="w-full"
          id="email"
          onChange={(e) => handleOnChange("email", e.currentTarget.value)}
          label={{ text: "Email Address", required: true }}
          value={values.email as string}
          validate={validate}
          ref={ref}
        />
        <Input
          className="w-full"
          id="password"
          onChange={(e) => handleOnChange("password", e.currentTarget.value)}
          label={{ text: "Password", required: true }}
          value={values.password as string}
          isPassword
          validate={validate}
          ref={ref}
        />
        <div className="flex justify-between w-full gap-x-2">
          <Checkbox
            id="rememberMe"
            label="Remember me"
            onChange={(value) => handleOnChange("rememberMe", value)}
            checked={values.rememberMe as boolean}
          />
          <Link to={clientRoutes.auth.forgotPassword}>Forgot password?</Link>
        </div>
        <Button type="submit" className="w-full mt-2">
          {isLoading ? <Spinner /> : "Sign in"}
        </Button>
      </Form>

      <div className="flex gap-x-1 justify-center">
        <Text className="whitespace-nowrap" type="button">
          Don&apos;t have an account?
        </Text>
        <Link to={clientRoutes.auth.register}>Sign up</Link>
      </div>
    </div>
  );
};

export default Login;
