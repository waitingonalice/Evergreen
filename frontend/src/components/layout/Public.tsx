import { useRef } from "react";
import { Outlet } from "react-router-dom";
import { Text } from "~/components";
import { useCanvasGradient } from "~/utils/hooks/useCanvasGradient";

const RootLayout = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useCanvasGradient(canvasRef);
  return (
    <div className="flex flex-col lg:h-screen lg:flex-row">
      <div className="flex h-screen flex-col items-center justify-center p-8 text-center lg:h-full lg:w-1/3 lg:items-start lg:text-start">
        <Outlet />
      </div>

      <div className="flex h-auto flex-col lg:w-2/3 w-full">
        <canvas ref={canvasRef} className="relative h-screen" />
        <div className="p-4 absolute flex h-screen flex-col items-center lg:w-2/3 w-full justify-center text-center">
          <img src="/logo.svg" alt="logo" className="w-20 h-20" />
          <Text type="h2" className="mb-16 text-dark">
            Expense Tracker
          </Text>
          <Text type="subhead-1" className="text-dark">
            A platform to manage your expenses.
          </Text>
          <footer className="flex justify-center gap-x-4 mt-10">
            <a href="https://github.com/waitingonalice/Expense-tracker">
              <img alt="github" src="/github-mark.svg" width={24} />
            </a>
            <a href="https://www.linkedin.com/in/wilson-sie-6a3485155/">
              <img alt="linkedIn" src="/linkedIn.svg" width={24} />
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
};
export default RootLayout;
