/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from "clsx";

const testPreview = `const first = (abc:string) => {
  return abc;
}`;

interface PreviewProps {
  className?: string;
  children?: React.ReactNode;
}
export const Preview = ({ className, children }: PreviewProps) => (
  <pre
    className={clsx("border w-1/2 min-h-[50vh] p-4 overflow-y-auto", className)}
  >
    <code>{testPreview}</code>
  </pre>
);
