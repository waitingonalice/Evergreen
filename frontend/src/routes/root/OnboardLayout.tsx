import { Outlet } from "react-router-dom";
import { Text } from "~/components";

const RootLayout = () => (
  <div className="flex flex-col lg:h-screen lg:flex-row">
    <div className="flex h-screen flex-col items-center justify-center p-8 text-center lg:h-full lg:w-1/3 lg:items-start lg:text-start">
      <Outlet />
    </div>

    <div className="bg-primary flex h-auto flex-col p-4 lg:w-2/3">
      <div className="flex h-screen flex-col items-center justify-center text-center">
        <Text
          type="h1"
          className="text-important mb-16 text-[60px] font-extrabold lg:text-[96px]"
        >
          Expense Tracker
        </Text>
        <Text type="h3" className="text-important">
          A platform to manage your expenses.
        </Text>
      </div>
      <footer className="flex justify-center gap-x-4">
        <a href="https://github.com/waitingonalice/Expense-tracker">
          <img
            alt="github"
            src="/github-mark.svg"
            width={24}
            className="text-primary"
          />
        </a>
        <a href="https://www.linkedin.com/in/wilson-sie-6a3485155/">
          <img
            alt="linkedIn"
            src="/linkedIn.svg"
            width={24}
            className="text-primary"
          />
        </a>
      </footer>
    </div>
  </div>
);
export default RootLayout;
