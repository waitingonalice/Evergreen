import clsx from "clsx";

export interface ButtonProps {
  className?: string;
  variant?:
    | "errorLink"
    | "error"
    | "primary"
    | "primaryLink"
    | "secondary"
    | "secondaryLink";
  disabled?: boolean;
  size?: "default" | "small";
  value?: string;
  id?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

const FormButton = ({
  id,
  value,
  onClick,
  children,
  disabled,
  variant = "primary",
  size = "default",
  className,
  prefixIcon,
  suffixIcon,
}: ButtonProps) => {
  // Primary to be used on white background
  // Secondary to be used on green background

  const baseStyle =
    "whitespace-nowrap transition-all duration-100 disabled:cursor-not-allowed disabled:opacity-30 text-[14px] font-medium tracking-[0.0125em] flex justify-center items-center gap-x-1";

  const baseStyleButton = clsx(
    "first-letter:focus:outline-none shadow-sm rounded-md active:enabled:ring-4 active:enabled:ring-offset-1",
    size === "small" ? "px-2 py-1" : "px-4 py-2"
  );

  const variantMapper = {
    primary: clsx(
      "shadow-primary-2/40 bg-primary hover:enabled:bg-secondary text-important active:enabled:bg-tertiary active:enabled:ring-primary-2",
      baseStyleButton
    ),
    secondary: clsx(
      "shadow-primary-2/40 bg-important text-primary hover:enabled:bg-gray-200 active:enabled:bg-gray-300 active:enabled:ring-primary-2",
      baseStyleButton
    ),
    error: clsx(
      "shadow-errorMain/40 bg-errorMain text-important hover:enabled:bg-errorSecondary active:enabled:bg-errorTertiary active:enabled:ring-errorMain",
      baseStyleButton
    ),
    primaryLink:
      "hover:text-secondary text-primary active:enabled:text-tertiary",
    secondaryLink:
      "hover:text-gray-200 text-important active:enabled:text-gray-300",
    errorLink:
      "text-errorMain hover:text-errorSecondary active:enabled:text-errorTertiary",
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      id={id}
      // eslint-disable-next-line react/button-has-type
      type="button"
      className={clsx(baseStyle, variantMapper[variant], className)}
      disabled={disabled}
      value={value}
      onClick={handleClick}
    >
      {prefixIcon}
      {children}
      {suffixIcon}
    </button>
  );
};

export default FormButton;
