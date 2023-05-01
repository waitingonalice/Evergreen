import clsx from "clsx";
import { Text } from "~/components";

interface ButtonProps {
  className?: string;
  type: "submit" | "button" | "reset";
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
  variant = "primary",
  className,
}: ButtonProps) => {
  // Primary to be used on white background
  // Secondary to be used on green background

  const baseStyle =
    "whitespace-nowrap transition-all duration-100 disabled:cursor-not-allowed disabled:opacity-30";

  const baseStyleButton =
    "px-4 py-2 first-letter:focus:outline-none shadow-sm ring-1 focus:ring-2 focus:ring-offset-1 rounded-md hover:ring-2";

  const variantMapper = {
    primary: clsx(
      "bg-primary hover:enabled:bg-secondary text-important focus:ring-tertiary hover:ring-tertiary",
      baseStyleButton
    ),
    secondary: clsx(
      "bg-important text-primary hover:enabled:bg-standard focus:ring-tertiary hover:ring-tertiary",
      baseStyleButton
    ),
    error: clsx(
      "bg-errorMain text-important hover:enabled:bg-errorSecondary focus:ring-errorTertiary hover:ring-errorTertiary",
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
      type={type}
      className={clsx(baseStyle, variantMapper[variant], className)}
      disabled={disabled}
      value={value}
      onClick={onClickHandlder && onClickHandlder}
    >
      <Text type="button">{children}</Text>
    </button>
  );
};

export default FormButton;
