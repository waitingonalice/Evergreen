import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { Button, Text } from "~/components";
import { clientRoutes } from "~/constants";

const Root = () => (
  <>
    <Text type="subhead-2" className="text-dark mb-8">
      How would you like to connect?
    </Text>
    <div className="relative flex w-1/2 min-w-[280px] flex-col gap-y-4 lg:w-full">
      <Button id="signUp" variant="primary">
        <a
          href={clientRoutes.login}
          className="flex items-center justify-between"
        >
          Login
          <ChevronRightIcon width={20} className="text-green-500 stroke-2" />
        </a>
      </Button>

      <Button id="signUp" variant="primary">
        <a
          href={clientRoutes.register}
          className="flex items-center justify-between"
        >
          Sign Up
          <ChevronRightIcon width={20} className="text-green-500 stroke-2" />
        </a>
      </Button>
    </div>
  </>
);

export default Root;
