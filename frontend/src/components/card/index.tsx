import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => (
  <div
    className={clsx(
      `bg-secondary-1 shadow-xl rounded-md p-6 flex flex-col`,
      className
    )}
  >
    {children}
  </div>
);
