import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { useRef, useState } from "react";
import clsx from "clsx";
import { Text, Tooltip, TooltipProps } from "~/components";

interface InputProps {
  children: string;
  name: string;
  required?: boolean;
  className?: string;
  tooltip?: TooltipProps;
  withTooltip?: boolean;
}

const FormLabel = ({
  children,
  name,
  required,
  className,
  tooltip,
  withTooltip,
}: InputProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  return (
    <span className={clsx("flex gap-x-1", className)}>
      <label htmlFor={name} className="text-dark block">
        <Text type="button">{children}</Text>
      </label>
      {required ? <span className="text-red-500">*</span> : null}

      {withTooltip && (
        <div
          ref={ref}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <InformationCircleIcon className="h-5 w-auto text-primary" />
          <Tooltip show={hover} {...tooltip} targetElement={ref.current} />
        </div>
      )}
    </span>
  );
};

export default FormLabel;
