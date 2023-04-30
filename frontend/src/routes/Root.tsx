import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { clientRoutes } from "~/constants";
import { Text } from "~/components";

interface ButtonLinkProps {
  children: React.ReactNode;
  to: string;
}

const ButtonLink = ({ children, to }: ButtonLinkProps) => (
  <a
    href={to}
    className="border-important hover:border-secondary flex justify-between rounded-md border-2 p-3"
  >
    <Text type="button" className="text-important">
      {children}
    </Text>
    <ChevronRightIcon width={20} className="text-secondary stroke-2" />
  </a>
);

const Root = () => (
  <div className="flex flex-col lg:h-screen lg:flex-row">
    <div className="bg-primary flex h-screen flex-col items-center justify-center p-8 text-center lg:h-full lg:w-1/3 lg:items-start lg:text-start">
      <Text type="subhead-2" className="text-important mb-8">
        How would you like to connect?
      </Text>
      <div className="flex w-1/2 min-w-[280px] flex-col gap-y-3 lg:w-full">
        <ButtonLink to={clientRoutes.login}>Login</ButtonLink>
        <ButtonLink to={clientRoutes.register}>Sign Up</ButtonLink>
      </div>
    </div>

    <div className="flex h-auto flex-col p-4 lg:w-2/3">
      <div className="flex h-screen flex-col items-center justify-center text-center">
        <Text
          type="h1"
          className="text-dark mb-16 text-[60px] font-extrabold lg:text-[96px]"
        >
          Expense Tracker
        </Text>
        <Text type="h3" className="text-dark">
          A platform to manage your expenses.
        </Text>
      </div>
      <footer className="flex justify-center gap-x-4">
        <a href="https://github.com/waitingonalice/Expense-tracker">
          <img src="public/github-mark.svg" width={24} />
        </a>
        <a href="https://www.linkedin.com/in/wilson-sie-6a3485155/">
          <img src="public/linkedIn.svg" width={24} />
        </a>
      </footer>
    </div>
  </div>
);
export default Root;
