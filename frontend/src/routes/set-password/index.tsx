import { useState } from "react";
import { z } from "zod";
import { Alert, Button, Input, Spinner, Text } from "~/components";
import { VALID_PASSWORD } from "~/constants";
import { errorMap, useForm } from "~/utils";
import { UpdateSuccess } from "./components/UpdateSuccess";
import {
  SetPasswordInputType,
  useResetPassword,
} from "./loaders/resetPassword";

const passwordSchema = (fields: SetPasswordInputType) =>
  z.object({
    password: z
      .string()
      .min(1)
      .min(8, { message: "Password is too short" })
      .max(14, { message: "Password is too long" })
      .regex(VALID_PASSWORD, {
        message:
          "Password should contain at least one number, one uppercase character and one lowercase character",
      }),
    confirmPassword: z
      .string()
      .min(1)
      .refine((val) => val === fields?.password, {
        message: "Passwords do not match",
      }),
  });

const ResetPassword = () => {
  const params = new URLSearchParams(window.location.search);
  const [fields, setFields] = useState<SetPasswordInputType>({
    password: "",
    confirmPassword: "",
  });
  const { validate, ref, onSubmitValidate } = useForm({
    zod: passwordSchema(fields),
    data: fields,
  });
  const { mutate: resetPassword, error, data, isLoading } = useResetPassword();

  const handleOnSubmit = () => {
    try {
      const success = onSubmitValidate();
      if (success) {
        const token = params.get("code");
        if (!token) throw new Error("Invalid token");
        resetPassword({ ...fields, token });
        params.delete("code");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
      }
    }
  };
  return (
    <div className="w-full max-w-md">
      <Alert
        show={Boolean(errorMap(error))}
        title={errorMap(error)}
        className="mb-12"
        type="error"
      />
      {data?.result ? (
        <UpdateSuccess />
      ) : (
        <section className="flex flex-col gap-y-4">
          <Text type="subhead-1" className="text-primary box mb-4 font-bold">
            Sign Up
          </Text>
          <Input
            id="password"
            label={{ text: "New Password", required: true }}
            ref={ref}
            onChange={(e) =>
              setFields((prev) => ({
                ...prev,
                [e.target.id]: e.target.value,
              }))
            }
            value={fields.password}
            validate={validate}
            isPassword
          />
          <Input
            id="confirmPassword"
            label={{ text: "Confirm Password", required: true }}
            ref={ref}
            onChange={(e) =>
              setFields((prev) => ({
                ...prev,
                [e.target.id]: e.target.value,
              }))
            }
            value={fields.confirmPassword}
            validate={validate}
          />
          <Button
            disabled={isLoading}
            onClick={handleOnSubmit}
            className="mt-4"
          >
            {isLoading ? <Spinner /> : "Submit"}
          </Button>
        </section>
      )}
    </div>
  );
};

export default ResetPassword;
