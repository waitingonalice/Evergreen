/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable react/no-array-index-key */
import {
  ChevronRightIcon,
  ChevronUpDownIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Switch, Text } from "~/components";
import { Dropdown } from "~/components/dropdown";
import { Result, Status } from "../hooks/useEditor";

export type ConsoleType = "clear" | "preserve";

interface PreviewProps {
  className?: string;
  message: string;
}

export const Preview = ({ className, message }: PreviewProps) => (
  <pre className={clsx(className, "text-sm")}>
    <code>{message}</code>
  </pre>
);

interface ConsolePanelProps {
  result: Result[];
  status: Status;
  onSelectOption: (val: ConsoleType) => void;
  preserveLogs: boolean;
}

const statusColorMap: Record<Status, string> = {
  error: "text-errorMain",
  success: "text-teal-500",
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
  const handleToggleView = (index: number) => {};

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
        "flex overflow-y-auto h-[calc(50vh-55px)] flex-col w-1/2 border border-gray-600"
      )}
    >
      <div className="relative p-2 gap-x-2 flex justify-end items-center border-b border-gray-600">
        <Dropdown
          button={
            <EllipsisHorizontalIcon
              className="outline-none text-subtext w-5 h-auto transition duration-300 hover:text-important"
              role="button"
            />
          }
          options={options}
          menuClassName="top-4 right-0"
          onSelect={handleSelectOption}
        />
      </div>
      {result.map(({ message, toggled }, index, arr) => (
        <div
          key={index}
          className={clsx(
            "flex p-2",
            arr.length > 1 && "border border-gray-600",
            statusColorMap[status]
          )}
        >
          <Text className="mr-1 whitespace-nowrap" type="body-bold">
            {index + 1}:
          </Text>
          <ChevronRightIcon
            className="h-5 w-auto mr-2 outline-none"
            role="button"
            tabIndex={0}
            onClick={() => handleToggleView(index)}
          />
          <Preview message={message} />
        </div>
      ))}
    </div>
  );
};
