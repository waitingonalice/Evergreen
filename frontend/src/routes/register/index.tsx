import { useState } from "react";
import { z } from "zod";
import { Alert, Button, FormSelect, Input, Spinner, Text } from "~/components";
import { VALID_PASSWORD, clientRoutes, countryOptions } from "~/constants";
import { errorMap, useForm } from "~/utils";
import { RegistrationSuccess } from "./component/RegistrationSuccess";
import { RegisterUserInputType, useRegisterUser } from "./loaders/registerUser";

const registrationSchema = (fields: RegisterUserInputType | undefined) =>
  z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z
      .string()
      .min(1)
      .email({ message: "This field must must contain a valid Email" }),
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
    country: z.string().min(1),
  });

const Register = () => {
  const [fields, setFields] = useState<RegisterUserInputType>({});
  const { ref, onSubmitValidate, validate } = useForm({
    zod: registrationSchema(fields),
    data: fields,
  });
  const { mutate: createAccount, isLoading, error, data } = useRegisterUser();

  const handleInputOnChange = (id: string, value: string) =>
    setFields((prev) => ({ ...prev, [id]: value }));

  const handleSubmit = () => {
    const success = onSubmitValidate();
    if (success) createAccount(fields);
  };

  return (
    <div className="w-full max-w-md">
      <Alert
        className="mb-12"
        title={errorMap(error)}
        show={Boolean(errorMap(error))}
        type="error"
      />

      {data?.result ? (
        <RegistrationSuccess />
      ) : (
        <div className="flex flex-col gap-y-4">
          <Text type="subhead-1" className="text-primary box mb-4 font-bold">
            Sign Up
          </Text>
          <Input
            id="firstName"
            label={{ text: "First Name", required: true }}
            validate={validate}
            ref={ref}
            placeholder="John"
            onChange={(e) => handleInputOnChange(e.target.id, e.target.value)}
            value={fields.firstName ?? ""}
            className="w-full"
          />
          <Input
            id="lastName"
            label={{ text: "Last Name", required: true }}
            validate={validate}
            ref={ref}
            placeholder="Appleseed"
            onChange={(e) => handleInputOnChange(e.target.id, e.target.value)}
            value={fields.lastName ?? ""}
            className="w-full"
          />
          <Input
            id="email"
            label={{ text: "Email", required: true }}
            validate={validate}
            ref={ref}
            placeholder="johnappleseed@xyz.com"
            onChange={(e) => handleInputOnChange(e.target.id, e.target.value)}
            value={fields.email ?? ""}
          />
          <Input
            id="password"
            label={{ text: "Password", required: true }}
            validate={validate}
            ref={ref}
            onChange={(e) => handleInputOnChange(e.target.id, e.target.value)}
            value={fields.password ?? ""}
            isPassword
          />

          <Input
            id="confirmPassword"
            label={{ text: "Confirm Password", required: true }}
            validate={validate}
            ref={ref}
            onChange={(e) => handleInputOnChange(e.target.id, e.target.value)}
            value={fields.confirmPassword ?? ""}
            isPassword
          />
          <FormSelect
            id="country"
            label={{ text: "Country", required: true }}
            options={countryOptions}
            placeholder="Select a country"
            validate={validate}
            ref={ref}
            onChange={(e) => handleInputOnChange(e.target.id, e.target.value)}
          />
          <div className="mt-2 w-full items-center gap-x-2 flex justify-between">
            <Button id="cancel" variant="primaryLink" className="w-fit">
              <a href={clientRoutes.auth.login}>Cancel</a>
            </Button>
            <Button
              id="regsiter"
              variant="primary"
              className="w-fit"
              onClick={handleSubmit}
            >
              {isLoading ? <Spinner /> : "Register"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
