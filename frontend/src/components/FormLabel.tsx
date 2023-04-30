import { Text } from "~/components";

interface InputProps {
  children: string;
  name: string;
}

const FormLabel = ({ children, name }: InputProps) => (
  <label htmlFor={name} className="text-important block">
    <Text type="button">{children}</Text>
  </label>
);

export default FormLabel;
