import { z } from "zod";
import { Button, FormSelect, Input, Text } from "~/components";
import { clientRoutes, countryOptions } from "~/constants";
import { useForm } from "~/utils";

let password: string;
const registrationSchema = z.object({
  firstName: z
    .string({
      required_error: "This field is required",
      invalid_type_error: "Expected an alphabetic string",
    })
    .regex(/^[a-zA-Z]+$/, {
      message: "This field contains invalid characters",
    }),
  lastName: z
    .string({
      required_error: "This field is required",
      invalid_type_error: "Expected an alphabetic string",
    })
    .regex(/^[a-zA-Z]+$/, {
      message: "This field contains invalid characters",
    }),
  email: z
    .string({
      required_error: "This field is required",
      invalid_type_error: "This field must must contain a valid Email",
    })
    .email({ message: "This field must must contain a valid Email" }),
  password: z
    .string({ required_error: "This field is required" })
    .min(8, { message: "Password is too short" })
    .max(14, { message: "Password is too long" })
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+$/, {
      message:
        "Password should contain at least one number, one uppercase character and one lowercase character",
    })
    .refine((val) => (password = val)),
  confirmPassword: z
    .string({ required_error: "This field is required" })
    .refine((val) => val === password, { message: "Passwords do not match" }),
  country: z.string({ required_error: "This field is required" }),
});

const Register = () => {
  const { addRefs, onSubmit, validate } = useForm(registrationSchema);

  const handleSubmit = () => console.log("submit");

  return (
    // TODO: Add onSubmit handler to form and validate inputs
    <form
      className="flex w-full flex-col gap-y-4 sm:w-1/2 lg:w-full"
      onSubmit={(e) => onSubmit(handleSubmit, e)}
    >
      <Text type="subhead-1" className="text-primary box mb-4 font-bold">
        Sign Up
      </Text>
      <Input
        id="firstName"
        label={{ text: "First Name", required: true }}
        validate={validate}
        ref={addRefs}
        placeholder="John"
      />
      <Input
        id="lastName"
        label={{ text: "Last Name", required: true }}
        validate={validate}
        ref={addRefs}
        placeholder="Appleseed"
      />
      <Input
        id="email"
        type="email"
        label={{ text: "Email", required: true }}
        validate={validate}
        ref={addRefs}
        placeholder="johnappleseed@xyz.com"
      />
      <Input
        id="password"
        type="password"
        label={{ text: "Password", required: true }}
        validate={validate}
        ref={addRefs}
      />

      <Input
        id="confirmPassword"
        type="password"
        label={{ text: "Confirm Password", required: true }}
        validate={validate}
        ref={addRefs}
      />
      <FormSelect
        id="country"
        label={{ text: "Country", required: true }}
        options={countryOptions}
        placeholder="Select a country"
        validate={validate}
        ref={addRefs}
      />
      <div className="mt-2 flex justify-between">
        <Button
          id="cancel"
          variant="primaryLink"
          type="button"
          className="w-fit"
        >
          <a href={clientRoutes.root}>Cancel</a>
        </Button>
        <Button id="regsiter" variant="primary" type="submit" className="w-fit">
          Register
        </Button>
      </div>
    </form>
  );
};

export default Register;
