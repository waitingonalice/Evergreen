import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { Button, Text } from "~/components";
import { clientRoutes } from "~/constants";

export const RegistrationSuccess = () => (
  <div className="flex flex-col text-center items-center gap-y-4">
    <CheckCircleIcon className="text-primary w-24" />
    <Text type="subhead-2" className="text-dark">
      Thank you for registering with Expense Tracker. A confirmation email has
      been sent to your email address.
    </Text>
    <Button variant="primaryLink">
      <a href={clientRoutes.root}>Back to login page</a>
    </Button>
  </div>
);
