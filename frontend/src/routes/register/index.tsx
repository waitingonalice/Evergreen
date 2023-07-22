import { useState } from "react";
import { z } from "zod";
import { Button, FormSelect, Input, Text } from "~/components";
import { CountryEnum, clientRoutes, countryOptions } from "~/constants";
import { useForm } from "~/utils";

interface FieldTypes {
  firstName?: string;
  lastName?: string;
  country?: CountryEnum;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

let password: string;
const registrationSchema = () =>
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
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+$/, {
        message:
          "Password should contain at least one number, one uppercase character and one lowercase character",
      })
      .refine((val) => (password = val)),
    confirmPassword: z
      .string()
      .min(1)
      .refine((val) => val === password, { message: "Passwords do not match" }),
    country: z.string().min(1),
  });

const Register = () => {
  const [fields, setFields] = useState<FieldTypes>();
  const { ref, onSubmitValidate, validate } = useForm({
    zod: registrationSchema(),
    data: fields ?? {},
  });

  const handleInputOnChange = (id: string, value: string) =>
    setFields((prev) => ({ ...prev, [id]: value }));

  const handleSubmit = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const success = onSubmitValidate();
  };

  return (
    <div className="flex w-full flex-col gap-y-4 sm:w-1/2 lg:w-full">
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
      />
      <Input
        id="lastName"
        label={{ text: "Last Name", required: true }}
        validate={validate}
        ref={ref}
        placeholder="Appleseed"
        onChange={(e) => handleInputOnChange(e.target.id, e.target.value)}
      />
      <Input
        id="email"
        type="email"
        label={{ text: "Email", required: true }}
        validate={validate}
        ref={ref}
        placeholder="johnappleseed@xyz.com"
        onChange={(e) => handleInputOnChange(e.target.id, e.target.value)}
      />
      <Input
        id="password"
        type="password"
        label={{ text: "Password", required: true }}
        validate={validate}
        ref={ref}
        onChange={(e) => handleInputOnChange(e.target.id, e.target.value)}
      />

      <Input
        id="confirmPassword"
        type="password"
        label={{ text: "Confirm Password", required: true }}
        validate={validate}
        ref={ref}
        onChange={(e) => handleInputOnChange(e.target.id, e.target.value)}
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
      <div className="mt-2 flex justify-between">
        <Button id="cancel" variant="primaryLink" className="w-fit">
          <a href={clientRoutes.root}>Cancel</a>
        </Button>
        <Button
          id="regsiter"
          variant="primary"
          className="w-fit"
          onClick={handleSubmit}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default Register;
