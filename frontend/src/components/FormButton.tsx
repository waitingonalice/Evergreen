import clsx from "clsx";
import { Text } from "~/components";

interface ButtonProps {
  className?: string;

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
  onClick?: () => void;
}

const FormButton = ({
  id,
  value,
  onClick,
  children,
  disabled,
  variant = "primary",
  className,
}: ButtonProps) => {
  // Primary to be used on white background
  // Secondary to be used on green background

  const baseStyle =
    "whitespace-nowrap transition-all duration-100 disabled:cursor-not-allowed disabled:opacity-30";

  const baseStyleButton =
    "px-4 py-2 first-letter:focus:outline-none shadow-sm rounded-md";

  const variantMapper = {
    primary: clsx(
      "bg-primary hover:enabled:bg-secondary text-important active:enabled:bg-tertiary",
      baseStyleButton
    ),
    secondary: clsx(
      "bg-important text-primary hover:enabled:bg-green-50 active:enabled:bg-green-100 border-2 border-primary",
      baseStyleButton
    ),
    error: clsx(
      "bg-errorMain text-important hover:enabled:bg-errorSecondary active:enabled:bg-errorTertiary",
      baseStyleButton
    ),
    primaryLink: "hover:text-secondary text-primary",
    secondaryLink: "hover:text-standard text-important",
    errorLink: "text-errorMain hover:text-errorSecondary",
  };

  return (
    <button
      id={id}
      // eslint-disable-next-line react/button-has-type
      type="button"
      className={clsx(baseStyle, variantMapper[variant], className)}
      disabled={disabled}
      value={value}
      onClick={onClick && onClick}
    >
      <Text type="button">{children}</Text>
    </button>
  );
};

export default FormButton;
