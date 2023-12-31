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
interface CodePreviewerProps {
  arg: unknown;
}

const CodePreviewer = ({ arg }: CodePreviewerProps) => {
  const [toggle, setToggle] = useState(false);
  const Icon = toggle ? ChevronDownIcon : ChevronRightIcon;

  const handleExpand = () => {
    setToggle((prev) => !prev);
  };

  if (typeof arg === "object" || arg instanceof Set || arg instanceof Map) {
    return (
      <div
        className={clsx(
          "flex gap-x-1",
          !toggle ? "items-center flex-row" : "flex-col"
        )}
      >
        <div className="flex">
          <Icon
            role="button"
            tabIndex={0}
            className="h-5 w-5 outline-none"
            onClick={handleExpand}
          />

          <Preview className="text-teal-500">
            {Array.isArray(arg) ? `Array (${arg.length})` : "Object"}
          </Preview>
        </div>

        {toggle && (
          <Preview className={clsx(toggle && "w-28")}>
            {JSON.stringify(arg, null, 2)}
          </Preview>
        )}
      </div>
    );
  }

  if (typeof arg === "number" || typeof arg === "bigint") {
    return <Preview className="text-purple-600">{String(arg)}</Preview>;
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
  success: "text-gray-400",
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
            <CodePreviewer key={i} arg={arg} />
          ))}
        </div>
      ))}
    </div>
  );
};
