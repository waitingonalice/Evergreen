import { FormLabel, FormError } from "~/components";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string | null;
  onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({ type = "text", ...props }: InputProps) => {
  return (
    <div className="py-4">
      <span className="flex">
        <FormLabel name={props.id}>{props.label}</FormLabel>
        {props.required ? (
          <span className="ml-2 text-lg text-red-500">*</span>
        ) : null}
      </span>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type={type}
          name={props.id}
          className={clsx(
            "bg-layerThree border-borderColor text-important sm:text-md block w-full rounded-md pr-10 placeholder-gray-600 focus:outline-none",
            props.error
              ? "focus:border-red-500 focus:ring-red-500"
              : "focus:border-blue-600 focus:ring-blue-600"
          )}
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
          value={props.value}
          required={props.required}
          //TODO: Add validation onBlur
          // onBlur={}
          onChange={(e) => {
            props.onChangeHandler && props.onChangeHandler(e);
          }}
          {...props}
        />
      </div>
      {props.error ? <FormError id={props.id}>{props.error}</FormError> : null}
    </div>
  );
};

export default FormInput;
