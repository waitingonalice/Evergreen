import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Text } from "~/components";

export interface AlertProps {
  show: boolean;
  title: React.ReactNode;
  onClose?: (showNotification: boolean) => void;
  className?: string;
  type?: "error" | "success" | "warning";
}

const icon = (type: AlertProps["type"]) => {
  const baseClass = "w-5 h-5 mt-0.5 flex-shrink-0";
  switch (type) {
    case "error":
      return (
        <ExclamationCircleIcon className={clsx("text-errorMain", baseClass)} />
      );
    case "success":
      return (
        <CheckCircleIcon className={clsx("text-successSecondary", baseClass)} />
      );
    case "warning":
      return (
        <ExclamationCircleIcon
          className={clsx("text-warningSecondary", baseClass)}
        />
      );
    default:
      return null;
  }
};

export const Alert = ({
  show,
  title,
  onClose,
  className,
  type = "success",
}: AlertProps) => {
  const handleOnClose = () => {
    if (onClose) onClose(Boolean(show));
  };

  const alertBgType = {
    error: "bg-errorLight text-errorMain",
    success: "bg-successMain text-successTertiary",
    warning: "bg-warningMain text-warningTertiary",
  };

  if (show) {
    return (
      <div
        className={clsx(
          "border-0 rounded-lg p-3 flex justify-between items-center w-full",
          className,
          alertBgType[type]
        )}
      >
        <div className="flex gap-x-2">
          {icon(type)}
          <Text type="body-bold" aria-errormessage={title}>
            {title}
          </Text>
        </div>

        {onClose && (
          <XMarkIcon
            role="button"
            tabIndex={0}
            className="w-5 ml-4 text-standard"
            onClick={handleOnClose}
          />
        )}
      </div>
    );
  }

  return null;
};
