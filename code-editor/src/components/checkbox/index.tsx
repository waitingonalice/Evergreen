import { ChangeEvent } from "react";
import clsx from "clsx";
import { Text } from "../text";

export interface CheckboxProps {
  id?: string;
  label?: string;
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Checkbox = ({
  label,
  checked = false,
  onChange,
  indeterminate,
  disabled,
  id,
  className,
}: CheckboxProps) => {
  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onChange?.(e.currentTarget.checked);
  };

  return (
    <div className={clsx("flex items-center gap-x-2", className)}>
      <input
        onChange={(e) => handleChecked(e)}
        id={id}
        disabled={disabled}
        type="checkbox"
        className={clsx(
          "w-4 h-4 border border-standard rounded-sm focus:ring-primary transition-all duration-100 appearance-none disabled:cursor-not-allowed",
          indeterminate &&
            "enabled:indeterminate:bg-primary disabled:indeterminate:bg-primary",
          checked &&
            "enabled:checked:bg-primary disabled:checked:bg-primary checked:ring-transparent",
          disabled && "disabled:opacity-50 bg-disabled"
        )}
        checked={checked}
        // eslint-disable-next-line no-param-reassign
        ref={(el) => el && indeterminate && (el.indeterminate = indeterminate)}
      />
      {label && (
        <label htmlFor={id}>
          <Text type="button" className="text-body whitespace-nowrap">
            {label}
          </Text>
        </label>
      )}
    </div>
  );
};
