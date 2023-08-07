import { useEffect, useState } from "react";
import { z } from "zod";
import { Button, Checkbox, Input, Spinner, Text } from "~/components";
import { clientRoutes } from "~/constants";
import { useForm } from "~/utils";
import { setCookie } from "~/utils/cookie";
import { InputValuesType, useLogin } from "./loaders/login";

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email Address is required." }).email(),
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
  const { mutate: login, isLoading, data: { result } = {} } = useLogin();
  const handleOnChange = (
    key: keyof InputValuesType,
    value: string | boolean
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const success = onSubmitValidate();
    if (success) login(values);
  };
  console.log(result);

  useEffect(() => {
    if (result) setCookie("authToken", JSON.stringify(result.tokens.auth));
  }, [result]);

  return (
    <div className="flex flex-col w-full gap-y-4 items-center lg:items-start">
      <Text type="subhead-1" className="text-primary mb-4">
        Login
      </Text>
      <Input
        className="w-full sm:w-1/2 lg:w-full"
        id="email"
        onChange={(e) => handleOnChange("email", e.currentTarget.value)}
        label={{ text: "Email Address", required: true }}
        value={values.email as string}
        validate={validate}
        ref={ref}
      />
      <Input
        className="w-full sm:w-1/2 lg:w-full"
        id="password"
        onChange={(e) => handleOnChange("password", e.currentTarget.value)}
        label={{ text: "Password", required: true }}
        value={values.password as string}
        isPassword
        validate={validate}
        ref={ref}
      />
      <Checkbox
        className="w-full sm:w-1/2 lg:w-full"
        id="rememberMe"
        label="Keep me logged in"
        onChange={(value) => handleOnChange("rememberMe", value)}
        value={values.rememberMe as boolean}
      />
      <Button
        className="min-w-fit w-full lg:w-full sm:w-1/2 mt-2"
        onClick={handleSubmit}
      >
        {isLoading ? <Spinner /> : "Login"}
      </Button>
      <div className="flex flex-col-reverse lg:flex-row justify-between w-full sm:w-1/2 lg:w-full gap-y-4 mt-2">
        <Button variant="primaryLink">
          <a href={clientRoutes.auth.forgotPassword}>Forgot password?</a>
        </Button>
        <Button variant="primaryLink">
          <a href={clientRoutes.auth.register}>Create account</a>
        </Button>
      </div>
    </div>
  );
};

export default Login;
