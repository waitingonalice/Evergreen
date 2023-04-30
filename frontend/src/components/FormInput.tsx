import { useRef, useState } from "react";
import { z } from "zod";
import clsx from "clsx";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { Label, ErrorMessage } from "~/components";
import { hasNumber } from "~/constants";

interface InputProps {
  id: string;
  label: { required?: boolean; text: string };
  rules: ReturnType<typeof z.object>;
  type?: HTMLInputElement["type"];
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}
const validate = (
  rules: InputProps["rules"],
  id: string,
  inputRef: React.RefObject<HTMLInputElement>,
  setError: (arg: string) => void
) => {
  const value =
    inputRef.current && hasNumber.test(inputRef.current?.value)
      ? +inputRef.current.value
      : inputRef.current?.value;
  const subsetSchema = rules.pick({ [id]: true });
  const result = subsetSchema.safeParse({
    [id]: value === "" ? undefined : value,
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

function FormInput({
  id,
  type = "text",
  rules,
  label,
  placeholder,
  defaultValue,
  className,
}: InputProps) {
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
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
          ref={inputRef}
          type={type}
          name={id}
          className={clsx(
            "bg-important sm:text-md ring-primary block w-full rounded-md border-0 py-1.5 pr-10 placeholder-gray-400 ring-1 ring-inset focus:ring-2",
            error
              ? "focus:ring-errorSecondary text-errorMain"
              : "focus:ring-secondary text-dark",
            className
          )}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onBlur={() => {
            validate(rules, id, inputRef, setError);
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

export default FormInput;
