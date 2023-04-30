import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { clientRoutes } from "~/constants";
import { Text, Button } from "~/components";

const Root = () => (
  <>
    <Text type="subhead-2" className="text-important mb-8">
      How would you like to connect?
    </Text>
    <div className="relative flex w-1/2 min-w-[280px] flex-col gap-y-4 lg:w-full">
      <Button type="button" id="signUp" variant="secondary">
        <a
          href={clientRoutes.login}
          className="flex items-center justify-between"
        >
          Login
          <ChevronRightIcon width={20} className="text-tertiary stroke-2" />
        </a>
      </Button>
      <Button type="button" id="signUp" variant="secondary">
        <a
          href={clientRoutes.register}
          className="flex items-center justify-between"
        >
          Sign Up
          <ChevronRightIcon width={20} className="text-tertiary stroke-2" />
        </a>
      </Button>
    </div>
  </>
);

export default Root;
