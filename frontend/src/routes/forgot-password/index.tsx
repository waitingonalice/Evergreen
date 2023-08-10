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
    // TOOD: integrate error handling
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <div className="flex flex-col gap-y-8 w-full">
      <Text type="subhead-1" className="text-primary">
        Forgot Password
      </Text>

      <div className="flex flex-col gap-y-6">
        {data?.result ? (
          <>
            <CheckCircleIcon className="w-20 h-20 text-primary mt-8" />
            <Text type="body" className="mb-8">
              A link to reset your password has been sent to your email address.
            </Text>
          </>
        ) : (
          <>
            <Text className="text-dark" type="body">
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
            <Button className="w-full mt-2" onClick={handleClick}>
              {isLoading ? <Spinner /> : "Next"}
            </Button>
            <Button variant="primaryLink" className="mb-2">
              <a href={clientRoutes.auth.login}>Back</a>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
