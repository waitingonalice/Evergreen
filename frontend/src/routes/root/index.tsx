import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { Button, Text } from "~/components";
import { clientRoutes } from "~/constants";

const Root = () => (
  <>
    <Text type="subhead-2" className="text-secondary mb-8">
      Welcome!
    </Text>
    <div className="relative flex w-1/2 min-w-[280px] flex-col gap-y-4 lg:w-full">
      <Button id="signUp" variant="primary">
        <a
          href={clientRoutes.auth.login}
          className="flex items-center justify-between w-full"
        >
          Login
          <ChevronRightIcon width={20} className="text-green-500 stroke-2" />
        </a>
      </Button>

      <Button id="signUp" variant="primary">
        <a
          href={clientRoutes.auth.register}
          className="flex items-center justify-between w-full"
        >
          Sign Up
          <ChevronRightIcon width={20} className="text-green-500 stroke-2" />
        </a>
      </Button>
    </div>
  </>
);

export default Root;
