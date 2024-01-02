import { Transition } from "@headlessui/react";
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
  description?: React.ReactNode;
  className?: string;
  type?: "error" | "success" | "warning";
}

const icon = (type: AlertProps["type"]) => {
  const baseClass = "w-5 h-5 mt-0.5 flex-shrink-0";
  switch (type) {
    case "error":
      return (
        <ExclamationCircleIcon className={clsx("text-error-dark", baseClass)} />
      );
    case "success":
      return (
        <CheckCircleIcon className={clsx("text-success-dark", baseClass)} />
      );
    case "warning":
      return (
        <ExclamationCircleIcon
          className={clsx("text-warning-dark", baseClass)}
        />
      );
    default:
      return null;
  }
};

export const Alert = ({
  show,
  title,
  description,
  onClose,
  className,
  type = "success",
}: AlertProps) => {
  const handleOnClose = () => {
    if (onClose) onClose(Boolean(show));
  };

  const alertBgType = {
    error: "bg-error-light text-error-dark",
    success: "bg-success-light text-success-dark",
    warning: "bg-warning-light text-warning-dark",
  };

  return (
    <Transition
      show={show}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={clsx(
          "border-0 rounded-lg p-3 flex justify-between items-center w-full",
          className,
          alertBgType[type]
        )}
      >
        <section>
          <div className="flex gap-x-2">
            {icon(type)}
            <Text type="body-bold">{title}</Text>
          </div>
          <Text className="ml-7" type="body">
            {description}
          </Text>
        </section>

        {onClose && (
          <XMarkIcon
            role="button"
            tabIndex={0}
            className="w-5 ml-4 text-secondary-4"
            onClick={handleOnClose}
          />
        )}
      </div>
    </Transition>
  );
};
