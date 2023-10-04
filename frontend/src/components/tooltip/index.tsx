import { Transition } from "@headlessui/react";
import React, { useLayoutEffect, useRef } from "react";
import clsx from "clsx";
import { Text } from "../text";

/* eslint-disable arrow-body-style */
export interface TooltipProps {
  title?: string;
  description?: string;
  targetElement?: React.RefObject<HTMLElement>["current"] | null;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
  show?: boolean;
}

export const Tooltip = ({
  title,
  show,
  description,
  targetElement,
  position = "top",
  className,
}: TooltipProps) => {
  const tooltipRef = useRef(null);
  const positionMapper = {
    top: "top-0 transform -translate-y-full -translate-x-1/2",
    bottom: "bottom-0 transform translate-y-full -translate-x-1/2",
    left: "left-0 top-1/2 transform -translate-x-full -translate-y-1/2",
    right: "right-0 top-1/2 transform translate-x-full -translate-y-1/2",
  };

  useLayoutEffect(() => {
    targetElement?.style.setProperty("position", "relative");
  });

  return (
    <Transition
      ref={tooltipRef}
      show={show}
      enter="transition-opacity duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className={clsx(
        "absolute z-50 min-w-fit w-[240px]",
        positionMapper[position],
        className
      )}
    >
      <div
        role="tooltip"
        className={clsx(
          "bg-gray-200 opacity-100 rounded-lg shadow-md py-2 px-4"
        )}
      >
        {title && (
          <Text type="body-bold" className="mb-2 text-dark">
            {title}
          </Text>
        )}
        <Text type="caption" className="text-dark">
          {description}
        </Text>
      </div>
    </Transition>
  );
};
