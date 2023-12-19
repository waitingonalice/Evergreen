import clsx from "clsx";
import { Checkbox, CheckboxProps } from "~/components/checkbox";
import { TableProps } from "..";

interface TBodyProps extends TableProps {
  className?: string;
}

export const Body = ({ children, className }: TBodyProps) => (
  <tbody className={clsx(className, "divide-y divide-gray-300")}>
    {children}
  </tbody>
);

export const Row = ({ children, className }: TBodyProps) => (
  <tr className={clsx(className)}>{children}</tr>
);

export const Cell = ({ children, className }: TBodyProps) => (
  <td className={clsx(className, "py-2 pr-4 lg:pr-0")}>{children}</td>
);

interface CheckboxCellProps extends CheckboxProps {
  className?: string;
  checkboxClassName?: string;
}
export const CheckboxCell = (props: CheckboxCellProps) => {
  const { className, checkboxClassName } = props;
  return (
    <Cell className={className}>
      <Checkbox {...props} className={checkboxClassName} />
    </Cell>
  );
};
