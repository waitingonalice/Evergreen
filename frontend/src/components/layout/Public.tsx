import { useRef } from "react";
import { Outlet } from "react-router-dom";
import { useCanvasGradient } from "~/utils/hooks/useCanvasGradient";
import { Text } from "../text";

const RootLayout = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useCanvasGradient(canvasRef);
  return (
    <div className="flex flex-col lg:h-screen lg:flex-row">
      <div className="flex h-screen flex-col items-center justify-center p-8 lg:h-full lg:w-1/2 relative">
        <Outlet />
      </div>
      <div className="lg:w-1/2 bg-primary-dark">
        <img
          src="/landing.svg"
          className="h-full w-full object-cover"
          alt="landing"
        />
      </div>
      <footer className="absolute flex gap-x-4 bottom-0 left-0 m-2">
        <a
          rel="noreferrer"
          target="_blank"
          href="https://github.com/waitingonalice/Expense-tracker"
        >
          <img alt="github" src="/github-mark.svg" width={24} />
        </a>
        <a
          rel="noreferrer"
          target="_blank"
          href="https://www.linkedin.com/in/wilson-sie-6a3485155/"
        >
          <img alt="linkedIn" src="/linkedIn.svg" width={24} />
        </a>
        <Text type="body">Expense Tracker&copy; 2023</Text>
      </footer>
    </div>
  );
};
export default RootLayout;
