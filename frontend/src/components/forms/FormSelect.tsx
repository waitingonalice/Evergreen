import { Ref, forwardRef, useState } from "react";
import clsx from "clsx";
import { useForm } from "~/utils";
import { ErrorMessage, Label } from "..";

export interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  id: string;
  label?: { required?: boolean; text: string };
  options: Option[];
  validate?: ReturnType<typeof useForm>["validate"];
  disabled?: boolean;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectClassName?: string;
  className?: string;
  value?: string | string[];
  size?: "small" | "default";
  multiple?: boolean;
}

export const FormSelect = forwardRef(
  (
    {
      id,
      label,
      validate,
      disabled,
      placeholder,
      className,
      selectClassName,
      onChange,
      options,
      value,
      size = "default",
      multiple,
    }: SelectProps,
    ref: Ref<HTMLSelectElement>
  ) => {
    const [error, setError] = useState("");

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) onChange(e);
      if (validate) {
        const message = validate(id, e.currentTarget.value);
        setError(message);
      }
    };

    const handleOnBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      if (validate) {
        const message = validate(id, e.currentTarget.value);
        setError(message);
      }
    };

    return (
      <div className={className}>
        {label && (
          <Label name={id} required={label.required} className="mb-1">
            {label.text}
          </Label>
        )}
        <div className="relative">
          <select
            multiple={multiple}
            id={id}
            ref={ref}
            className={clsx(
              size === "small" ? "py-1" : "py-2",
              "disabled:text-disabled disabled:ring-disabled block w-full rounded-md border-0 text-sm tracking-wide ring-1 transition-all duration-100 focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed",
              error
                ? "focus:ring-errorMain ring-errorMain pr-10"
                : "focus:ring-primary-2 text-dark ring-gray-400",
              placeholder && !value && "text-disabled",
              selectClassName
            )}
            disabled={disabled}
            onBlur={(e) => handleOnBlur(e)}
            onChange={(e) => handleOnChange(e)}
            defaultValue={value}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <ErrorMessage id={id} error={error}>
            {error}
          </ErrorMessage>
        </div>
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";
