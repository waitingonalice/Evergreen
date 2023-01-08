interface InputProps {
  children: string;
  name: string;
  // required: boolean;
}

const FormLabel = ({ children, name }: InputProps) => {
  return (
    <label htmlFor={name} className="text-important text-md block font-medium">
      {children}
    </label>
  );
};

export default FormLabel;
