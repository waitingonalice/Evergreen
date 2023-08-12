import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { z } from "zod";
import { Button, Input, Spinner, Text } from "~/components";
import { clientRoutes } from "~/constants";
import { useForm } from "~/utils";
import { useForgotPassword } from "./loaders/forgotPassword";

const emailSchema = z.object({
  email: z.string().min(1).email({ message: "Invalid email address" }),
});

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const {
    mutate: forgotPassword,
    data,
    isLoading,
    error,
  } = useForgotPassword();
  const { onSubmitValidate, ref, validate } = useForm({
    zod: emailSchema,
    data: { email },
  });

  const handleClick = () => {
    const success = onSubmitValidate();
    if (success) forgotPassword({ email });
  };

  return (
    <div className="max-w-md w-full">
      <>
        {data?.result || error ? (
          <div className="flex flex-col gap-y-4 items-center">
            <CheckCircleIcon className="w-20 h-20 text-primary mt-8" />
            <Text type="subhead-2" className="text-center">
              A link to reset your password has been sent to your email address.
            </Text>
            <Button variant="primaryLink">
              <a href={clientRoutes.auth.login}>Back to login page</a>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-y-4">
            <Text type="subhead-1" className="text-primary">
              Forgot Password
            </Text>
            <Text className="text-dark my-4" type="body-bold">
              Enter your email for verification
            </Text>
            <Input
              className="w-full"
              placeholder="Email"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              label={{ text: "Email Address", required: true }}
              ref={ref}
              validate={validate}
            />
            <div className="flex justify-between items-center">
              <Button variant="primaryLink">
                <a href={clientRoutes.auth.login}>Back</a>
              </Button>
              <Button onClick={handleClick}>
                {isLoading ? <Spinner /> : "Next"}
              </Button>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default ForgotPassword;
