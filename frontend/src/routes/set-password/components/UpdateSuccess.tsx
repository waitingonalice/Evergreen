import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { Button, Text } from "@waitingonalice/design-system";
import { clientRoutes } from "~/constants";

export const UpdateSuccess = () => (
  <section className="flex flex-col text-center items-center gap-y-4">
    <CheckCircleIcon className="text-primary-main w-24" />
    <Text type="subhead-2" className="text-secondary-5">
      Your password has been successfully updated.
    </Text>
    <Button variant="primaryLink">
      <a href={clientRoutes.root}>Back to login page</a>
    </Button>
  </section>
);
