import clsx from "clsx";
import { Text } from "~/components";
interface ButtonProps {
  className?: string;
  type?: "submit" | "button" | "reset";
  variant:
    | "errorLink"
    | "error"
    | "primary"
    | "primaryLink"
    | "secondary"
    | "secondaryLink";
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
}: ButtonProps) => {
  // TODO: fix this style
  const variantMapper = {
    errorLink: "text-red-500 hover:text-red-600",
    error: "bg-red-500 hover:bg-red-600",
    primary: "bg-blue-600 hover:bg-blue-500",
    primaryLink: "text-blue-600 hover:text-blue-500",
    secondary: "bg-gray-600 hover:bg-gray-500",
    secondaryLink: "text-gray-600 hover:text-gray-500",
  };
  console.log(variantMapper);
  return (
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
      <Text type="button">{children}</Text>
    </button>
  );
};

export default FormButton;
