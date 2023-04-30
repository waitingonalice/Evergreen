import { z } from "zod";
import { Button, Input } from "~/components";

const testSchema = z.object({
  firstName: z.number({
    invalid_type_error: "Expected a number",
    required_error: "Expected a value",
  }),
  lastName: z.string({
    required_error: "Expected a value",
    invalid_type_error: "Expected a string",
  }),
});

const Register = () => (
  // TODO: Add onSubmit handler to form and validate inputs
  <form className="flex w-full flex-col gap-y-4">
    <Input
      id="firstName"
      label={{ text: "First Name", required: true }}
      rules={testSchema}
    />
    <Input
      id="lastName"
      label={{ text: "Last Name", required: true }}
      rules={testSchema}
    />
    <Input
      id="username"
      label={{ text: "Username", required: true }}
      rules={testSchema}
    />
    <Input
      id="password"
      label={{ text: "Password", required: true }}
      rules={testSchema}
    />
    <Input
      id="country"
      label={{ text: "Country", required: true }}
      rules={testSchema}
    />
    <div className="mt-2 flex justify-between">
      <Button
        id="cancel"
        variant="secondaryLink"
        type="button"
        className="w-fit"
      >
        Cancel
      </Button>
      <Button id="regsiter" variant="secondary" type="submit" className="w-fit">
        Register
      </Button>
    </div>
  </form>
);

export default Register;
