import React from "react";
import clsx from "clsx";

interface TextProps {
  type:
    | "h1"
    | "h2"
    | "h3"
    | "subhead-1"
    | "subhead-2"
    | "body-bold"
    | "body"
    | "button"
    | "caption"
    | "overline";
  children: React.ReactNode;
  className?: string;
}

export const Text = ({ type, children, className }: TextProps) => {
  const textClassMapper = {
    h1: "text-[96px] font-bold tracking-[-0.015em]",
    h2: "text-[60px] font-bold tracking-[-0.005em]",
    h3: "text-[48px] font-bold tracking-normal",
    "subhead-1": "text-[34px] font-medium tracking-[0.0025em]",
    "subhead-2": "text-[24px] font-light tracking-wide",
    "body-bold": "text-[16px] font-semibold",
    body: "text-[16px] font-normal",
    button: "text-[14px] font-medium tracking-[0.0125em]",
    caption: "text-[12px] font-normal tracking-[0.004em]",
    overline: "text-[12px] font-medium tracking-[0.015em]",
  };

  const textTypeMapper = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    "subhead-1": "h4",
    "subhead-2": "h5",
    "body-bold": "h5",
    body: "p",
    button: "p",
    caption: "p",
    overline: "p",
  };

  return React.createElement(
    textTypeMapper[type],
    {
      className: clsx(textClassMapper[type], className),
    },
    children
  );
};
