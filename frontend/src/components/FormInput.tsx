import { useState, forwardRef, Ref } from "react";
import { z } from "zod";
import clsx from "clsx";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { Label, ErrorMessage } from "~/components";
import { isNumber } from "~/constants";

interface InputProps {
  id: string;
  label: { required?: boolean; text: string };
  rules: ReturnType<typeof z.object>;
  type?: HTMLInputElement["type"];
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const validate = (
  rules: InputProps["rules"],
  id: string,
  value: string,
  setError: (arg: string) => void
) => {
  const checkValue = isNumber.test(value) ? +value : value;
  const subsetSchema = rules.pick({ [id]: true });
  const result = subsetSchema.safeParse({
    [id]: checkValue === "" ? undefined : checkValue,
  });

  if (result && !result.success) {
    const {
      error: { issues: data },
    } = result;
    setError(data[0].message);
  } else {
    setError("");
  }
};
// Uncontrolled form input component
const FormInput = forwardRef(
  (
    {
      id,
      type = "text",
      rules,
      label,
      placeholder,
      defaultValue,
      className,
      onChange,
    }: InputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const [error, setError] = useState<string>("");

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
            ref={ref}
            type={type}
            name={id}
            className={clsx(
              "bg-important block w-full rounded-md border-0 py-2 text-sm placeholder-gray-300 ring-1  transition-all duration-200 focus:ring-2 focus:ring-offset-1",
              error
                ? "focus:ring-errorSecondary ring-errorSecondary text-errorMain pr-10"
                : "focus:ring-secondary text-dark ring-gray-400",
              className
            )}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onBlur={(e) => {
              validate(rules, id, e.currentTarget.value, setError);
            }}
            onChange={(e) => {
              if (error) validate(rules, id, e.currentTarget.value, setError);
              if (onChange) onChange(e);
            }}
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
