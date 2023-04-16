import clsx from "clsx";

interface ButtonProps {
  className?: string;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  value?: string;
  id: string;
  children: React.ReactNode;
  onClickHandlder?: () => void;
}

const FormButton = ({
  type,
  id,
  value,
  onClickHandlder,
  children,
  disabled,
  className,
}: ButtonProps) => (
  <button
    id={id}
    type={type || "button"}
    className={clsx(
      "text-md inline-flex items-center rounded-lg border border-transparent bg-blue-600 px-4 py-2 font-semibold text-white shadow-sm transition-all duration-200 focus:ring-2 focus:ring-offset-1 first-letter:focus:outline-none enabled:hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-30",

      className
    )}
    disabled={disabled}
    value={value}
    onClick={onClickHandlder && onClickHandlder}
  >
    {children}
  </button>
);

export default FormButton;
