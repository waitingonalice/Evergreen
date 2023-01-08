import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

interface ErrorProps {
  children?: string;
  id: string;
}

const FormError = ({ id, children }: ErrorProps) => {
  return (
    <span
      className="mt-2 flex items-center text-sm text-red-500"
      id={`${id}-error`}
    >
      <ExclamationCircleIcon className="mr-1 h-4 w-4 text-red-500" /> {children}
    </span>
  );
};

export default FormError;
