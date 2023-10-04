import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/20/solid";
import { Ref, forwardRef, useState } from "react";
import clsx from "clsx";
import { ErrorMessage, Label, Text, TooltipProps } from "~/components";
import { useForm } from "~/utils";

interface InputProps {
  id: string;
  label?: {
    required?: boolean;
    text: string;
    withTooltip?: boolean;
    tooltip?: TooltipProps;
  };
  validate?: ReturnType<typeof useForm>["validate"];
  placeholder?: string;
  value: string;
  className?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  inputClassName?: string;
  prefixIcon?: React.ReactNode;
  size?: "small" | "default";
  subText?: string;
}

// controlled form input component
const FormInput = forwardRef(
  (props: InputProps, ref: Ref<HTMLInputElement>) => {
    const {
      id,
      validate,
      label,
      placeholder,
      value,
      className,
      onChange,
      disabled,
      isPassword,
      inputClassName,
      prefixIcon,
      size = "default",
      subText,
    } = props;
    const [error, setError] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const Icon = isPasswordVisible ? EyeIcon : EyeSlashIcon;

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (validate && error) {
        const message = validate(id, e.currentTarget.value);
        setError(message);
      }
      if (onChange) onChange(e);
    };

    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (validate) {
        const message = validate(id, e.currentTarget.value);
        setError(message);
      }
    };
    return (
      <div className={className}>
        {label && (
          <Label
            name={id}
            required={label.required}
            className="mb-1"
            withTooltip={label.withTooltip}
            tooltip={{ ...label.tooltip }}
          >
            {label.text}
          </Label>
        )}
        <div className="relative rounded-md shadow-sm">
          {prefixIcon && (
            <div className="inset-y-0 left-0 px-3 absolute items-center flex">
              {prefixIcon}
            </div>
          )}
          <input
            disabled={disabled}
            ref={ref}
            type={isPassword && !isPasswordVisible ? "password" : "text"}
            id={id}
            className={clsx(
              inputClassName,
              size === "small" ? "py-1" : "py-2",
              "block w-full rounded-md border-0 text-sm tracking-wide placeholder-gray-300 ring-1 transition-all duration-100 focus:ring-2 focus:ring-offset-1",
              error
                ? "focus:ring-errorMain ring-errorMain text-errorMain"
                : "focus:ring-primary-2 text-dark ring-gray-400",
              (isPassword || error) && "pr-10",
              prefixIcon && "pl-10"
            )}
            placeholder={placeholder}
            value={value}
            onBlur={(e) => handleOnBlur(e)}
            onChange={(e) => handleOnChange(e)}
          />
          {error && !isPassword && (
            <div
              className={clsx(
                "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
              )}
            >
              <ExclamationCircleIcon
                className="text-errorMain h-5 w-5"
                aria-hidden="true"
              />
            </div>
          )}
          {isPassword && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Icon
                className="text-gray-500 h-5 w-5"
                role="button"
                tabIndex={0}
                onClick={() => setIsPasswordVisible((prev) => !prev)}
              />
            </div>
          )}
        </div>
        <ErrorMessage id={id} error={error}>
          {error}
        </ErrorMessage>
        {subText && (
          <Text type="caption" className="text-gray-400 mt-1">
            {subText}
          </Text>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
