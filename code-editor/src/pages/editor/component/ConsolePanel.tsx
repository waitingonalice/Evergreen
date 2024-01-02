/* eslint-disable react/no-array-index-key */
import {
  ChevronDownIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { Text } from "@waitingonalice/design-system/components/text";
import { forwardRef, useState } from "react";
import clsx from "clsx";
import { Switch } from "~/components";
import { Dropdown } from "~/components/dropdown";
import { Result, Status } from "../hooks/useEditor";

interface PreviewProps {
  children: React.ReactNode;
  className?: string;
}
const Preview = forwardRef(
  ({ children, className }: PreviewProps, ref: React.Ref<HTMLPreElement>) => (
    <pre ref={ref} className={clsx("text-sm", className)}>
      <code>{children}</code>
    </pre>
  )
);

Preview.displayName = "Preview";

interface ReferenceTypeWrapperProps {
  children: React.ReactNode;
  onClickExpand: (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => void;
  expand?: boolean;
}
const ReferenceTypeWrapper = ({
  children,
  onClickExpand,
  expand,
}: ReferenceTypeWrapperProps) => (
  <div
    role="button"
    tabIndex={0}
    onClick={onClickExpand}
    onKeyDown={onClickExpand}
    className={clsx(
      "flex gap-x-2 outline-none",
      !expand ? "flex-row items-center" : `flex-col`
    )}
  >
    {children}
  </div>
);

interface CodePreviewerProps {
  arg: unknown;
  depth: number;
}

const CodePreviewer = ({ arg, depth }: CodePreviewerProps) => {
  const [toggle, setToggle] = useState(false);
  const Icon = toggle ? ChevronDownIcon : ChevronRightIcon;
  const renderIcon = <Icon className="h-5 w-5 outline-none" />;
  let appendDepth = depth;

  const handleExpand = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    setToggle((prev) => !prev);
  };

  if (Array.isArray(arg) || arg instanceof Set) {
    appendDepth += 1;
    const isSet = arg instanceof Set;
    const toArray = isSet ? Array.from(arg) : arg;
    return (
      <ReferenceTypeWrapper expand={toggle} onClickExpand={handleExpand}>
        <div className="flex">
          {renderIcon}
          <Preview className="text-teal-500">{`${arg.constructor.name}(${toArray.length})`}</Preview>
        </div>

        {toArray.map((item, i) => (
          <span key={i} className={clsx(toggle ? "flex" : "hidden")}>
            {toggle && <Preview className="ml-5 font-semibold">{i}: </Preview>}
            <CodePreviewer arg={item} depth={appendDepth} />
          </span>
        ))}
      </ReferenceTypeWrapper>
    );
  }

  if (typeof arg === "object" && arg !== null) {
    appendDepth += 1;
    const isMap = arg instanceof Map;
    const toObject = isMap ? Object.fromEntries(arg) : arg;
    return (
      <ReferenceTypeWrapper expand={toggle} onClickExpand={handleExpand}>
        <div className="flex">
          {renderIcon}
          <Preview className="text-teal-500">{arg.constructor.name}</Preview>
        </div>

        {Object.entries(toObject).map(([key, value]) => (
          <span key={key} className={clsx(toggle ? "flex" : "hidden")}>
            {toggle && (
              <Preview className="ml-5 font-semibold">{`${key}: `}</Preview>
            )}
            <CodePreviewer arg={value} depth={appendDepth} />
          </span>
        ))}
      </ReferenceTypeWrapper>
    );
  }

  if (
    typeof arg === "number" ||
    typeof arg === "bigint" ||
    typeof arg === "boolean"
  ) {
    return <Preview className={clsx("text-purple-500")}>{String(arg)}</Preview>;
  }

  if (typeof arg === "symbol" || typeof arg === "undefined" || arg === null) {
    return (
      <Preview className={clsx("text-secondary-2 opacity-50")}>
        {String(arg)}
      </Preview>
    );
  }

  return <Preview>{String(arg)}</Preview>;
};

export type ConsoleType = "clear" | "preserve";

interface ConsolePanelProps {
  result: Result[];
  status: Status;
  onSelectOption: (val: ConsoleType) => void;
  preserveLogs: boolean;
}

const statusColorMap: Record<Status, string> = {
  error: "text-error-main",
  success: "text-secondary-2",
};

export const consoleOptions: Record<ConsoleType, string> = {
  clear: "Clear console",
  preserve: "Preserve logs",
};

export const ConsolePanel = ({
  result,
  status,
  onSelectOption,
  preserveLogs,
}: ConsolePanelProps) => {
  const handleSelectOption = (val: ConsoleType) => {
    onSelectOption(val);
  };
  const handleToggleSwitch = () => {
    handleSelectOption("preserve");
  };

  const options = Object.entries(consoleOptions).map(([key, value]) => ({
    label: value,
    value: key,
    ...(key === "preserve" && {
      renderLabel: (label: string) => (
        <div className="flex justify-between w-full items-center">
          <Text type="body-bold">{label}</Text>
          <Switch
            size="sm"
            toggled={preserveLogs}
            onToggle={handleToggleSwitch}
          />
        </div>
      ),
    }),
  }));
  return (
    <div
      className={clsx(
        "flex overflow-y-auto h-full flex-col border border-secondary-4"
      )}
    >
      <div className="relative p-2 gap-x-2 flex justify-end items-center border-b border-secondar-4">
        <Dropdown
          button={
            <EllipsisHorizontalIcon
              className="outline-none text-secondary-4 w-5 h-auto transition duration-300 hover:text-secondary-1"
              role="button"
            />
          }
          options={options}
          menuClassName="top-4 right-0"
          onSelect={handleSelectOption}
        />
      </div>
      {result.map(({ args }, index, arr) => (
        <div
          key={index}
          className={clsx(
            "flex p-2 gap-x-2",
            arr.length > 1 && "border-b border-secondary-4",
            statusColorMap[status]
          )}
        >
          {args.map((arg, i) => (
            <CodePreviewer depth={0} key={i} arg={arg} />
          ))}
        </div>
      ))}
    </div>
  );
};
