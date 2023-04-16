import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { clientRoutes } from "~/constants";

interface ButtonLinkProps {
  children: React.ReactNode;
  to: string;
}

const ButtonLink = ({ children, to }: ButtonLinkProps) => (
  <div className="border-borderColor flex w-full justify-between rounded-md border-2 p-3 hover:border-blue-500">
    <a href={to} className="text-important font-bold">
      {children}
    </a>
    <ChevronRightIcon width={20} className="stroke-2 text-blue-500" />
  </div>
);

const Root = () => (
  <div className="flex h-screen">
    <div className="bg-layerOne flex h-full w-1/3 flex-col justify-center p-8">
      <div className="mb-8 flex flex-col gap-y-2">
        <p className="text-sm font-semibold text-gray-200">
          Welcome to Expense Tracker!
        </p>
      </div>
      <div className="flex w-full flex-col gap-y-3 ">
        <ButtonLink to={clientRoutes.login}>Login</ButtonLink>
        <ButtonLink to={clientRoutes.register}>Sign Up</ButtonLink>
      </div>
    </div>
    <div className="flex w-2/3 items-center justify-center bg-cyan-400 transition duration-300 ease-out">
      <h1 className="text-layerThree text-center font-mono font-bold">
        A platform to centralise your expenses.
      </h1>
    </div>
  </div>
);
export default Root;
