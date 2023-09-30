import clsx from "clsx";

interface GridProps {
  children: React.ReactNode;
  className?: string;
}

export const Grid = ({ children, className }: GridProps) => (
  <div className={clsx(className, "grid-cols-2 grid p-4 gap-x-20")}>
    {children}
  </div>
);
