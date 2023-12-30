import {
  Checkbox,
  CheckboxProps,
} from "@waitingonalice/design-system/components/checkbox";
import clsx from "clsx";
import { Text } from "~/components/text";
import { TableProps } from "..";

export interface HeaderProps extends Omit<TableProps, "filters"> {
  className?: string;
}
export const Header = ({ children, className }: HeaderProps) => (
  <thead>
    <tr className={clsx(className)}>{children}</tr>
  </thead>
);

interface TheadProps extends TableProps {
  className?: string;
}
export const Thead = ({ children, className }: TheadProps) => (
  <th
    scope="col"
    className={clsx("whitespace-nowrap py-2 pr-4 lg:pr-0", className)}
  >
    <Text type="body-bold" className="text-left">
      {children}
    </Text>
  </th>
);

interface CheckboxThProps extends CheckboxProps {
  className?: string;
  checkboxClassName?: string;
}
export const CheckboxTh = (args: CheckboxThProps) => {
  const { className, checkboxClassName } = args;
  return (
    <th className={clsx(className, "py-2 pr-4 lg:pr-0")}>
      <Checkbox {...args} className={checkboxClassName} />
    </th>
  );
};
