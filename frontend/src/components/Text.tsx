import clsx from "clsx";

interface TextProps {
  type:
    | "h1"
    | "h2"
    | "h3"
    | "subhead-1"
    | "subhead-2"
    | "body"
    | "button"
    | "caption"
    | "overline";
  children: React.ReactNode;
  className?: string;
}

export const Text = ({ type, children, className }: TextProps) => {
  const textMapper = {
    h1: "text-[96px] font-light tracking-[-0.015em]",
    h2: "text-[60px] font-light tracking-[-0.005em]",
    h3: "text-[48px] font-light tracking-normal",
    "subhead-1": "text-[34px] font-light tracking-[0.0025em]",
    "subhead-2": "text-[24px] font-light tracking-wide",
    body: "text-[16px] font-normal",
    button: "text-[14px] font-medium tracking-[0.0125em]",
    caption: "text-[12px] font-normal tracking-[0.004em]",
    overline: "text-[12px] font-medium tracking-[0.015em]",
  };

  switch (type) {
    case "h1":
      return <h1 className={clsx(textMapper[type], className)}>{children}</h1>;
    case "h2":
      return <h2 className={clsx(textMapper[type], className)}>{children}</h2>;
    case "h3":
      return <h3 className={clsx(textMapper[type], className)}>{children}</h3>;
    default:
      return <p className={clsx(textMapper[type], className)}>{children}</p>;
  }
};
