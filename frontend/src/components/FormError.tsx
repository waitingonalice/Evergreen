import { Text } from "~/components";

interface ErrorProps {
  error?: string;
  children?: string;
  id: string;
}

const FormError = ({ id, children, error }: ErrorProps) => {
  if (error) {
    return (
      <span className="mt-1 flex items-center" id={`${id}-error`}>
        <Text type="caption" className="text-errorMain">
          {children}
        </Text>
      </span>
    );
  }
  return null;
};

export default FormError;
