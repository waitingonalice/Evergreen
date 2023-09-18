import clsx from "clsx";
import Topbar from "./Topbar";

interface ContentProps {
  children: React.ReactNode;
  className?: string;
}

export const Main = ({ children, className }: ContentProps) => (
  <div className={className}>{children}</div>
);

const Content = ({ children, className }: ContentProps) => (
  <section className={clsx("min-w-[1024px] pl-28 py-6 pr-8", className)}>
    {children}
  </section>
);

Main.Header = Topbar;
Main.Content = Content;