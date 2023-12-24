/* eslint-disable react/no-array-index-key */
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Switch, Text } from "~/components";
import { Dropdown } from "~/components/dropdown";
import { Status } from "../hooks/useEditor";

interface PreviewProps {
  className?: string;
  message: string;
}

export const Preview = ({ className, message }: PreviewProps) => (
  <pre className={clsx(className)}>
    <code>{message}</code>
  </pre>
);

interface ConsolePanelProps {
  messages: string[];
  status: Status;
  onTogglePreserveLogs: () => void;
  preserveLogs: boolean;
}

const statusColorMap: Record<Status, string> = {
  error: "text-errorMain",
  success: "text-teal-500",
};

export const consoleOptions = {
  clear: "Clear console",
  preserve: "Preserve logs",
};

export const ConsolePanel = ({
  messages,
  status,
  onTogglePreserveLogs,
  preserveLogs,
}: ConsolePanelProps) => {
  const handleToggle = () => {
    onTogglePreserveLogs();
  };

  const options = Object.entries(consoleOptions).map(([key, value]) => ({
    label: value,
    value: key,
    ...(key === "preserve" && {
      renderLabel: (label: string) => (
        <div className="flex justify-between w-full items-center">
          <Text type="body-bold">{label}</Text>
          <Switch size="sm" toggled={preserveLogs} onToggle={handleToggle} />
        </div>
      ),
    }),
  }));
  return (
    <div
      className={clsx(
        "flex overflow-y-auto h-[60vh] flex-col w-1/2 border border-gray-600"
      )}
      id="console"
    >
      {/* add preview console */}
      <div className="relative p-2 flex justify-end border-b border-gray-600">
        <Dropdown
          button={
            <EllipsisHorizontalIcon
              className="outline-none text-subtext w-5 h-auto transition duration-300 hover:text-important"
              role="button"
            />
          }
          options={options}
          menuClassName="top-4 right-0"
        />
      </div>
      {messages.map((message, index, arr) => (
        <div
          key={index}
          className={clsx(
            "flex items-center p-2",
            arr.length > 1 && "border border-gray-600",
            statusColorMap[status]
          )}
        >
          <span className="mr-2 whitespace-nowrap">{index + 1}: </span>
          <Preview message={message} className="truncate" />
        </div>
      ))}
    </div>
  );
};
