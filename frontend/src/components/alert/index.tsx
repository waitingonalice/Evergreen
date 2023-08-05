import { XMarkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Text } from "~/components";

export interface AlertProps {
  show: boolean;
  title: React.ReactNode;
  onClose?: (showNotification: boolean) => void;
  className?: string;
  // type?: "error" | "success" | "warning";
}

export const Alert = ({
  show,
  title,
  onClose,
  className,
}: // type,
AlertProps) => {
  const handleOnClose = () => {
    if (onClose) onClose(Boolean(show));
  };

  if (show) {
    return (
      <div
        className={clsx(
          "border-0 rounded-lg bg-errorLight p-3 flex whitespace-nowrap justify-between items-center w-full",
          className
        )}
      >
        <Text
          type="body-bold"
          className="text-errorMain"
          aria-errormessage={title}
        >
          {title}
        </Text>

        {onClose && (
          <XMarkIcon
            role="button"
            tabIndex={0}
            className="w-5 ml-4 text-error-2"
            onClick={handleOnClose}
          />
        )}
      </div>
    );
  }

  return null;
};
