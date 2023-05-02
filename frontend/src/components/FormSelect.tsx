import { Ref, forwardRef, useState } from "react";
import clsx from "clsx";
import { ErrorMessage, Label } from ".";
import { useForm } from "~/utils";

interface SelectProps {
  id: string;
  label: { required?: boolean; text: string };
  options: { label: string; value: string }[];
  validate?: ReturnType<typeof useForm>["validate"];
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}
// controlled component
const FormSelect = forwardRef(
  (
    {
      id,
      label,
      validate,
      disabled,
      placeholder,
      defaultValue,
      className,
      onChange,
      options,
    }: SelectProps,
    ref: Ref<HTMLSelectElement>
  ) => {
    const [error, setError] = useState("");
    const [selected, setSelected] = useState<string>(defaultValue ?? "");

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) onChange(e);
      if (validate) {
        const message = validate(id, e.currentTarget.value);
        setError(message);
      }
      setSelected(e.currentTarget.value);
    };

    const handleOnBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
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
        <div className="relative mt-1">
          <select
            ref={ref}
            className={clsx(
              "disabled:text-disabled disabled:ring-disabled block w-full rounded-md border-0 py-2 text-sm ring-1 transition-all duration-100 focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed",
              error
                ? "focus:ring-errorSecondary ring-errorSecondary pr-10"
                : "focus:ring-secondary text-dark ring-gray-400",
              placeholder && !selected && "text-disabled",
              className
            )}
            disabled={disabled}
            onBlur={(e) => handleOnBlur(e)}
            onChange={(e) => handleOnChange(e)}
            value={selected}
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

export default FormSelect;
