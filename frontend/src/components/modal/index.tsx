/* eslint-disable react/no-array-index-key */
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import clsx from "clsx";
import { ButtonProps } from "../button";
import { Text } from "../text";
import { Button } from "..";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  title?: React.ReactNode;
  buttons?: ButtonProps[];
}

export function Modal({
  open,
  onClose,
  children,
  size = "md",
  title,
  buttons,
}: ModalProps) {
  const sizeMapper = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    full: "w-full",
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  "transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all",
                  sizeMapper[size]
                )}
              >
                <div className="flex gap-x-6">
                  <Text className="text-dark" type="subhead-2-bold">
                    {title}
                  </Text>
                  <XMarkIcon
                    onClick={onClose}
                    tabIndex={0}
                    role="button"
                    className="outline-none h-6 w-auto text-gray-400 shrink-0"
                  />
                </div>
                <div className="mt-6">{children}</div>
                {buttons && (
                  <div className="mt-6 flex gap-x-4 justify-end items-center">
                    {buttons.map((button, index) => (
                      <Button key={index} {...button}>
                        {button.children}
                      </Button>
                    ))}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}