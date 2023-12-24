import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button, Checkbox, Input, Spinner, Text } from "~/components";
import { clientRoutes } from "~/constants";
import { setCookie, useForm, useKeypress } from "~/utils";
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

  useKeypress("Enter", handleSubmit);
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
      <Text type="subhead-1" className="text-primary mb-4">
        Login
      </Text>
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
        <Button className="w-fit" variant="primaryLink">
          <a href={clientRoutes.auth.forgotPassword}>Forgot password?</a>
        </Button>
      </div>
      <Button className="w-full mt-2" onClick={handleSubmit}>
        {isLoading ? <Spinner /> : "Sign in"}
      </Button>
      <div className="flex gap-x-1 justify-center">
        <Text className="whitespace-nowrap" type="button">
          Don&apos;t have an account?
        </Text>
        <Button className="text-center" variant="primaryLink">
          <a href={clientRoutes.auth.register}>Sign up</a>
        </Button>
      </div>
    </div>
  );
};

export default Login;
