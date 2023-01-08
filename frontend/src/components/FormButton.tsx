import clsx from "clsx";

interface ButtonProps {
  icon?: JSX.Element;
  buttonClassName?: string;
  buttonType?: "submit" | "button" | "reset";
  disabled?: boolean;
  value?: string;
  id: string;
  children: string | JSX.Element;
  onClickHandlder?: () => void;
}

const FormButton = ({ buttonType = "button", ...props }: ButtonProps) => {
  return (
    <>
      <button
        id={props.id}
        type={buttonType}
        className={clsx(
          "btn-primary text-md transition-background inline-flex items-center rounded-lg border border-transparent px-4 py-2 font-semibold text-white shadow-sm focus:ring-2 focus:ring-offset-1 first-letter:focus:outline-none disabled:cursor-not-allowed disabled:opacity-30",
          props.buttonClassName
        )}
        disabled={props.disabled}
        value={props.value}
        onClick={props.onClickHandlder && props.onClickHandlder}
      >
        {props.icon}
        {props.children}
      </button>
    </>
  );
};

export default FormButton;
