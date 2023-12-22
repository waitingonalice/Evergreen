/* eslint-disable react/no-array-index-key */

/* eslint-disable default-param-last */
import clsx from "clsx";

interface PreviewProps {
  className?: string;
  message: string;
}

export const Preview = ({ className, message }: PreviewProps) => (
  <pre className={clsx(className)}>
    <code>{message}</code>
  </pre>
);
