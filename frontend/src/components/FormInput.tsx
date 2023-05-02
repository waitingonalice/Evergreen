import { forwardRef, Ref, useState } from "react";
import clsx from "clsx";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { Label, ErrorMessage } from "~/components";
import { useForm } from "~/utils";

interface InputProps {
  id: string;
  label: { required?: boolean; text: string };
  validate?: ReturnType<typeof useForm>["validate"];
  type?: HTMLInputElement["type"];
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Uncontrolled form input component
const FormInput = forwardRef(
  (
    {
      id,
      type = "text",
      validate,
      label,
      placeholder,
      defaultValue,
      className,
      onChange,
      disabled,
    }: InputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const [error, setError] = useState("");

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
      <div>
        <span className="flex">
          <Label name={id}>{label.text}</Label>
          {label.required ? (
            <span className="ml-1 text-lg text-red-500">*</span>
          ) : null}
        </span>
        <div className="relative mt-1 rounded-md shadow-sm">
          <input
            disabled={disabled}
            ref={ref}
            type={type}
            name={id}
            className={clsx(
              "block w-full rounded-md border-0 py-2 text-sm placeholder-gray-300 ring-1 transition-all duration-100 focus:ring-2 focus:ring-offset-1",
              error
                ? "focus:ring-errorSecondary ring-errorSecondary text-errorMain pr-10"
                : "focus:ring-secondary text-dark ring-gray-400",
              className
            )}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onBlur={(e) => handleOnBlur(e)}
            onChange={(e) => handleOnChange(e)}
          />
          {error && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon
                className="text-errorSecondary h-5 w-5"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        <ErrorMessage id={id} error={error}>
          {error}
        </ErrorMessage>
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
