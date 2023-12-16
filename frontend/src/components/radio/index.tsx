import { ChangeEvent } from "react";
import clsx from "clsx";
import { Label, Text } from "..";

interface RadioProps {
  id?: string;
  label?: { text: string; required?: boolean };
  className?: string;
  value: string;
  onChange?: (val: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  selectedValue?: string;
  subText?: string;
}

export const Radio = ({
  id,
  label,
  className,
  value,
  onChange,
  disabled,
  selectedValue,
  subText,
}: RadioProps) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
  };
  const checked = value === selectedValue;
  return (
    <div className={clsx(className, "flex flex-col")}>
      <div className="flex items-center">
        <input
          disabled={disabled}
          checked={checked}
          id={id}
          type="radio"
          value={value}
          onChange={handleOnChange}
          className={clsx(
            "w-4 h-4 border-gray-400 focus:ring-primary-2 focus:ring-2 bg-white transition-all duration-100",
            disabled && "cursor-not-allowed bg-disabled",
            checked && "text-primary"
          )}
        />

        {label && (
          <Label
            name={id ?? ""}
            required={label?.required}
            className={clsx("ml-2")}
          >
            {label.text}
          </Label>
        )}
      </div>
      {subText && (
        <Text type="caption" className="ml-6 text-gray-400">
          {subText}
        </Text>
      )}
    </div>
  );
};
