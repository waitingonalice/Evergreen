import React from "react";
import clsx from "clsx";

interface TextProps {
  type:
    | "h1"
    | "h2"
    | "h3"
    | "subhead-1"
    | "subhead-1-bold"
    | "subhead-2"
    | "subhead-2-bold"
    | "body-bold"
    | "body"
    | "button"
    | "caption"
    | "caption-bold"
    | "overline";
  children: React.ReactNode;
  className?: string;
}

export const Text = ({ type, children, className }: TextProps) => {
  const textClassMapper = {
    h1: "text-[96px] font-bold tracking-[-0.015em]",
    h2: "text-[60px] font-bold tracking-[-0.005em]",
    h3: "text-[48px] font-bold tracking-normal",
    "subhead-1": "text-[30px] font-medium tracking-[0.0025em]",
    "subhead-1-bold": "text-[30px] font-bold tracking-[0.0025em]",
    "subhead-2": "text-[18px] font-light tracking-normal",
    "subhead-2-bold": "text-[18px] font-medium tracking-normal",
    "body-bold": "text-[14px] font-semibold",
    body: "text-[14px] font-normal",
    button: "text-[14px] font-medium tracking-[0.0125em]",
    caption: "text-[12px] font-medium tracking-[0.004em]",
    "caption-bold": "text-[12px] font-semibold tracking-[0.004em]",
    overline: "text-[12px] font-medium tracking-[0.015em]",
  };

  const textTypeMapper = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    "subhead-1": "h4",
    "subhead-1-bold": "h4",
    "subhead-2": "h5",
    "subhead-2-bold": "h5",
    "body-bold": "h5",
    body: "p",
    button: "p",
    caption: "p",
    "caption-bold": "p",
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
